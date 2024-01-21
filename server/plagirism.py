import sys
import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from jinja2 import Environment, FileSystemLoader
from pymongo import MongoClient
import re

def load_data():
    # Connect to MongoDB
    client = MongoClient('mongodb+srv://collegpt-database:0PuxsquGq3cRdpdB@gpt-cluster.72mmweh.mongodb.net/')
    db = client['test']

    # Specify the collection name
    collection_name = 'projects'

    # Retrieve data from the specified collection
    collection = db[collection_name]
    cursor_data = list(collection.find())

    # Close the MongoDB connection
    client.close()

    # Extract column names from the first document in the collection
    first_document = cursor_data[0] if cursor_data else {}
    column_names = list(first_document.keys())

    # Convert the list of dictionaries to a DataFrame with specified column names
    df = pd.DataFrame(cursor_data, columns=column_names)
    df['description'] = df['description'].replace({'[^a-zA-Z0-9\s]': ''}, regex=True)
    df['temp'] = df['abstract'] + df['description'] + df['projectTitle']
    df['abstract'] = df['abstract'].replace({'[^a-zA-Z0-9\s]': ''}, regex=True)
    return df

def calculate_similarity(new_text, sample_contents):
    # Vectorize the text data
    tfidf_vectorizer = TfidfVectorizer()
    vectors = tfidf_vectorizer.fit_transform(sample_contents)

    # Calculate cosine similarity
    similarities = cosine_similarity(vectors)

    # Vectorize the new text
    new_vector = tfidf_vectorizer.transform([new_text])

    # Calculate cosine similarity of the new text with existing samples
    similarities_with_new_text1 = cosine_similarity(new_vector, vectors)

    # Round the similarity scores to 3 decimal places
    similarities_with_new_text = [round(score, 3) for score in similarities_with_new_text1[0]]

    return similarities_with_new_text

def find_top_similarity_pairs(df, Project_Title, similarities_with_new_text):
    n_samples = len(df)
    top_similarity_pairs = []

    for i in range(n_samples):
        pair = (df['projectTitle'][i], Project_Title)
        similarity_score = similarities_with_new_text[i]
        top_similarity_pairs.append((pair, similarity_score))

    # Sort the list by similarity score in descending order
    top_similarity_pairs.sort(key=lambda x: x[1], reverse=True)

    return top_similarity_pairs[:5]

def calculate_segment_similarity(df, new_text):
    text_segments = ['abstract', 'description', 'projectTitle']
    segment_similarity_scores = {}
    highest_similarity = 0
    highest_similarity_segment = None

    # Vectorize the new text
    tfidf_vectorizer = TfidfVectorizer()
    new_vector = tfidf_vectorizer.fit_transform([new_text])

    for segment in text_segments:
        segment_text = df[segment].values.astype('U')
        vectors = tfidf_vectorizer.transform(segment_text)

        # Calculate cosine similarity
        similarities = cosine_similarity(new_vector, vectors)

        # Store the similarity score for this segment
        segment_similarity_scores[segment] = similarities[0][0]

        # Check if this segment has the highest similarity so far
        if similarities[0][0] > highest_similarity:
            highest_similarity = similarities[0][0]
            highest_similarity_segment = segment

    return segment_similarity_scores, highest_similarity, highest_similarity_segment

def generate_html_report(segment_similarity_scores, highest_similarity_segment, highest_similarity, top_5_pairs, overall_similarity, similarity_score, Project_Title):
    env = Environment(loader=FileSystemLoader('.'))  # Assuming the template is in the current directory
    template = env.get_template('template.html')

    # Render the template with data
    html_content = template.render(
        segment_similarity_scores=segment_similarity_scores,
        highest_similarity_segment=highest_similarity_segment,
        highest_similarity=highest_similarity,
        top_5_pairs=top_5_pairs,
        similarity_score=similarity_score,
        Project_title=Project_Title
    )

    return html_content

def remove_special_characters(text):
    return re.sub(r'[^a-zA-Z0-9\s]', '', text)

def main():
    # Retrieve form data from command-line arguments
    if len(sys.argv) != 4:
        print("Usage: python index.py <project_title> <Abstract> <description>")
        sys.exit(1)

    projectTitle, abstract, description = sys.argv[1], sys.argv[2], sys.argv[3]

    projectTitle = remove_special_characters(projectTitle)
    abstract = remove_special_characters(abstract)
    description = remove_special_characters(description)
    
    # Load data
    df = load_data()

    # Combine Abstract and Description for new text
    new_text = abstract + description + projectTitle

    # Calculate similarity
    similarities_with_new_text = calculate_similarity(new_text, df['temp'].values.astype('U'))

    # Find top similarity pairs
    top_similarity_pairs = find_top_similarity_pairs(df, projectTitle, similarities_with_new_text)

    # Calculate segment similarity
    segment_similarity_scores, highest_similarity, highest_similarity_segment = calculate_segment_similarity(df, new_text)

    # Check for plagiarism in the top 5 pairs
    plagiarism_detected = False
    if top_similarity_pairs and top_similarity_pairs[0][1] > 0.5:
        plagiarism_detected = True
        print("Plagiarism detected in the top 5 pairs!", file=sys.stderr)
    else:
        print("No plagiarism detected.", file=sys.stderr)

    # Generate HTML report
    html = generate_html_report(segment_similarity_scores, highest_similarity_segment, highest_similarity, top_similarity_pairs, similarities_with_new_text[0].max(), round(similarities_with_new_text[0], 3), projectTitle)

    # Send a message to the JS file
    send_message_to_js(plagiarism_detected, html)

def send_message_to_js(plagiarism_detected, html_content):
    # Add your logic to send a message to the JS file (e.g., using a socket, API, etc.)
    print(f"Sending message to JS: Plagiarism Detected: {plagiarism_detected}, HTML Content: {html_content}")

if __name__ == "__main__":
    main()

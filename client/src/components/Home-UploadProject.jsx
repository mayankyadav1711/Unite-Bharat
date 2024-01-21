import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import Modal from 'react-modal';
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mongoose from "mongoose";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import HomeHeader from "./Home-Header";

const HomeUploadProject = () => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [fetchedMentors, setfetchedMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    // Fetch student profiles when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://api-sankalp.vercel.app/students");
        if (response.ok) {
          const studentsData = await response.json();
          setStudents(studentsData);
        } else {
          console.error("Error fetching student profiles:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error.message);
      }
    };

    // Fetch mentor profiles when the component mounts
    const fetchMentors = async () => {
      try {
        const response = await fetch("https://api-sankalp.vercel.app/mentors");
        if (response.ok) {
          const mentorsData = await response.json();
          setfetchedMentors(mentorsData);
        } else {
          console.error("Error fetching mentor profiles:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error.message);
      }
    };

    fetchStudents();
    fetchMentors();
  }, []);
  useEffect(() => {
    // Check if the user type is not "university"
    if (state && state.usertype !== "university") {
      // Redirect to another page or show a message
      navigate("/notallowed"); // Adjust the path as needed
    }
  }, [state, navigate]);
  useEffect(() => {
    // This effect will run whenever modalContent changes
    if (modalContent !== '') {
      setIsModalOpen(true);
    }
  }, [modalContent]);
  
  const [technologyStack, settechnologyStack] = useState([]);
  const [teamMembers, setteamMembers] = useState([]);
  const [mentors, setmentors] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [flowchartImage, setFlowchartImage] = useState(null);
  const [architectureImage, setArchitectureImage] = useState(null);
  const [formData, setFormData] = useState({
    projectTitle: "",
  abstract: "",
  description: "", // Add description field
  domain: "", // Add domain field
  images: [], // Add images field as an array for multiple files
  googleDriveLink: "",
  projectVisibility: "",
  youtubeVideoLink: "",
 
  projectMethod: "",
  projectType: "",
  projectDuration: "",
  tags: "",
  flowchart: "", // Add flowchart field as an array for multiple files
  architecture:"", // Add architecture field as an array for multiple files
  uploadDate: "",
  });
  

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "studymate"); // Replace with your Cloudinary upload preset name

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkyrtfk1u/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "Failed to upload image to Cloudinary.");
      }

      return data.url;
    } catch (error) {
      console.error("Error occurred during image upload:", error);
      return null;
    }
  };
  

  const handleTechnologyChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue && !technologyStack.includes(selectedValue)) {
      settechnologyStack([...technologyStack, selectedValue]);
    }
  };

  const handleTeamChange = (event) => {
    const teamMembersMember = event.target.value;

    if (teamMembersMember && !teamMembers.includes(teamMembersMember)) {
      setteamMembers([...teamMembers, teamMembersMember]);
    }
  };

  const handleMentorChange = (event) => {
    const mentorsValue = event.target.value;

    if (
      mentorsValue &&
      !mentors.includes(mentorsValue)
    ) {
      setmentors([...mentors, mentorsValue]);
    }
  };

  const handleRemoveTechnology = (index) => {
    const updatedTechnologies = [...technologyStack];
    updatedTechnologies.splice(index, 1);
    settechnologyStack(updatedTechnologies);
  };
  
  const handleRemoveTeamMember = (index) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers.splice(index, 1);
    setteamMembers(updatedTeamMembers);
  };
  
  const handleRemoveMentor = (index) => {
    const updatedMentors = [...mentors];
    updatedMentors.splice(index, 1);
    setmentors(updatedMentors);
  };

  const handleProjectMethodChange = (event) => {
    setFormData({
      ...formData,
      projectMethod: event.target.value,
    });
  };
  const handleProjectTypeChange = (event) => {
    setFormData({
      ...formData,
      projectType: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      // Upload images to Cloudinary using handleImageUpload
      const uploadedImages = await Promise.all(
        projectImages.map(async (image) => await handleImageUpload(image))
      );
  
      const teamMembersIds = teamMembers.map((teamMember) =>
        new mongoose.Types.ObjectId(teamMember)
      );
  
      const mentorsIds = mentors.map((mentor) =>
        new mongoose.Types.ObjectId(mentor)
      );
  
      const response = await fetch("https://api-sankalp.vercel.app/uploadproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          ...formData,
          technologyStack,
          teamMembers: teamMembersIds,
          mentors: mentorsIds,
          images: uploadedImages,
          flowchart: await handleImageUpload(flowchartImage),
          architecture: await handleImageUpload(architectureImage),
          postedBy: state?._id,
        }),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        // Check if plagiarism is detected
        let content=''
        if (responseData.plagiarismDetected) {
          content= "Plagiarism detected. Please check your email for the report.";
          toast.warning("Plagiarism detected. Please check your email.");

        } else {
          content= "Project uploaded successfully!";
          toast.success("Project uploaded successfully!");

          navigate("/");
        }
setModalContent(content)
console.log("Modal content" + modalContent)
      } else {
        console.error("Error submitting form:", response.statusText);
  
        // Log additional details for debugging
        console.error("Response status:", response.status);
        console.error("Response data:", responseData);
  
        if (response.status === 422 && responseData.error) {
          // Handle 422 status (Unprocessable Entity) with a specific error message
          const errorMessage = responseData.error + (responseData?.topSimilarityScore ? ` ${responseData?.topSimilarityScore}%` : '');
          toast.error(errorMessage);
          setModalContent(errorMessage);
        } else {
          toast.error("Error uploading project. Please try again later.");
        }
        
      }
    } catch (error) {
      console.error("Network error:", error.message);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false); // Set loading back to false after the submission
    }
  };
  
  
  
  
  

  const handleImagesInputChange = (e) => {
    const files = Array.from(e.target.files);
    setProjectImages(files);
  };

  const handleFlowchartInputChange = (e) => {
    const file = e.target.files[0];
    setFlowchartImage(file);
  };

  const handleArchitectureInputChange = (e) => {
    const file = e.target.files[0];
    setArchitectureImage(file);
  };



  const spacerStyle = {
    height: "2rem",
  };
 
   return (
     <>
     <HomeHeader/>
     <div style={spacerStyle} />

<div class="uploadproject">
<div class="uploadproject-container">
  <div class="uploadproject-title" style={{marginTop:"60px"}}>Upload Project</div>
  <form onSubmit={handleSubmit}>
    <div class="uploadproject-user__details">
      <div class="uploadproject-input__box">
        <span class="uploadproject-details">Project Title *</span>
        <input
                  type="text"
                  placeholder="Enter project title"
                  value={formData.projectTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, projectTitle: e.target.value })
                  }
                  required
                  style={{ width: '80%',
                  padding: '9px',
                  marginLeft: '135px',
                  backgroundColor: '#fff8ed',
                  marginBottom: '10px',
                  boxShadow: '0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0.19)',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.3s, box-shadow 0.3s',}}
                />
      </div>
      <div class="uploadproject-input__box">
        <span class="uploadproject-details">Abstract *</span>
        <textarea
                  placeholder="Enter project abstract"
                  rows="4"
                  value={formData.abstract}
                  onChange={(e) =>
                    setFormData({ ...formData, abstract: e.target.value })
                  }
                  required
                ></textarea>
      </div>
      <div class="uploadproject-input__box">
        <span class="uploadproject-details">Description *</span>
        <textarea
                  placeholder="Enter project description"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                ></textarea>
      </div>
      <div class="uploadproject-input__box">
  <span class="uploadproject-details">Domain *</span>
  <select
                  value={formData.domain}
                  onChange={(e) =>
                    setFormData({ ...formData, domain: e.target.value })
                  }required
                >
  <option value="" disabled selected>Select a Domain</option>
  <option value="ai-ml">AI/ML</option>
    <option value="web-development">Web Development</option>
    <option value="mobile-apps">Mobile Applications</option>
    <option value="data-science">Data Science</option>
    <option value="cybersecurity">Cybersecurity</option>
    <option value="blockchain">Blockchain</option>
    <option value="cloud-computing">Cloud Computing</option>
    <option value="robotics">Robotics</option>
    <option value="game-development">Game Development</option>
    <option value="iot">Internet of Things (IoT)</option>
    <option value="biotechnology">Biotechnology/Biomedical</option>
    <option value="networking">Networking</option>
    <option value="ar-vr">AR/VR</option>
    <option value="gd">Graphis Design</option>
    <option value="data-analytics">Data Analytics</option>
    <option value="non-tech">Non-Tech</option>
    <option value="mba">MBA</option>
    <option value="cd">Compiler Design</option>
    <option value="other">Other</option>
  </select>
</div>

      <div class="uploadproject-input__box">
        <span class="uploadproject-details">Images</span>
        <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagesInputChange}
                />
      </div>
      <div class="uploadproject-input__box">
  <span class="uploadproject-details">Technology Stack</span>
  <select onChange={handleTechnologyChange}>
  <option value="" disabled selected>Select a Technology</option>

    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
    <option value="react">React</option>
    <option value="angular">Angular</option>
    <option value="vue">Vue.js</option>
    <option value="nodejs">Node.js</option>
    <option value="express">Express.js</option>
    <option value="python">Python</option>
    <option value="django">Django</option>
    <option value="flask">Flask</option>
    <option value="java">Java</option>
    <option value="spring">Spring Framework</option>
    <option value="ruby">Ruby</option>
    <option value="rails">Ruby on Rails</option>
    <option value="php">PHP</option>
    <option value="laravel">Laravel</option>
    <option value="mongodb">MongoDB</option>
    <option value="mysql">MySQL</option>
    <option value="postgresql">PostgreSQL</option>
    <option value="aws">Amazon Web Services (AWS)</option>
    <option value="azure">Microsoft Azure</option>
    <option value="docker">Docker</option>
    <option value="kubernetes">Kubernetes</option>
    <option value="git">Git</option>
    <option value="jenkins">Jenkins</option>
    <option value="android">Android</option>
    <option value="ios">iOS</option>
    <option value="unity">Unity</option>
    <option value="tensorflow">TensorFlow</option>
    <option value="pytorch">PyTorch</option>
  </select>
</div>
 <div className="selected-technologies">
  <p><strong>Technologies:</strong></p>
  <ul>
    {technologyStack.map((tech, index) => (
      <li key={index}>
        {tech}
        <button onClick={() => handleRemoveTechnology(index)}><FontAwesomeIcon icon={faTimes} /></button>
      </li>
    ))}
  </ul>
</div>
<div class="imageupload"style={{
        marginLeft:'20px',
        columnGap:'70px'
        }}>
<div className="uploadproject-input__box" style={{ display:"flex", width:"100%" }}>
      <div class="uploadproject-input__box" style={{ width: "65%",textAlign:'center',padding:'20px', marginLeft:"-40px"}}>
        <span class="uploadproject-details">Google Drive Link</span>
        <input
                  type="text"
                  placeholder="Enter Google Drive link"
                  value={formData.googleDriveLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      googleDriveLink: e.target.value,
                    })
                  }
                  style={{ width: '80%',
                  padding: '9px',
                  marginLeft: '135px',
                  backgroundColor: '#fff8ed',
                  marginBottom: '10px',
                  boxShadow: '0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0.19)',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.3s, box-shadow 0.3s',}}
                />
      </div>
      
      <div class="uploadproject-input__box" style={{ width: "65%",textAlign:'center',padding:'20px',marginRight:'-301px'}}>
        <span class="uploadproject-details">YouTube Video Link</span>
        <input
                  type="text"
                  placeholder="Enter Google Drive link"
                  value={formData.youtubeVideoLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      youtubeVideoLink: e.target.value,
                    })
                  }
                  style={{ width: '80%',
                  padding: '9px',
                  marginLeft: '135px',
                  backgroundColor: '#fff8ed',
                  marginBottom: '10px',
                  boxShadow: '0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0.19)',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.3s, box-shadow 0.3s',}}
                />
      </div> </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" , gap:"3rem", marginLeft: "9rem" }}>
      <div class="uploadproject-input__box" style={{width:"27%"}}>
  <span class="uploadproject-details" style={{ marginLeft:"0px"}}>Project Type *</span>
  <div class="projectmethod-radio" style={{gap:"5px !important"}}>
  <input
                    type="radio"
                    id="tech"
                    name="projecttype"
                    value="tech"
                    checked={formData.projectType === "tech"}
                    onChange={handleProjectTypeChange}
                    
                  />
  <label for="tech">Tech</label><br/>
    <input
                    type="radio"
                    id="nontech"
                    name="projecttype"
                    value="nontech"
                    checked={formData.projectType === "nontech"}
                    onChange={handleProjectTypeChange}
                    
                  />
  <label for="nontech">Non Tech</label><br/>
  </div>
</div>

      <div class="uploadproject-input__box" style={{width:"27%"}}>
  <span class="uploadproject-details" style={{marginLeft:"0px"}}>Project Visibility *</span>
  <div class="projectmethod-radio">
  <input
                    type="radio"
                    id="public"
                    name="visibility"
                    value="public"
                    checked={formData.projectVisibility === "public"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectVisibility: e.target.value,
                      })
                    }
                  />  <label for="public">Public</label><br/>
  <input
                    type="radio"
                    id="private"
                    name="visibility"
                    value="private"
                    checked={formData.projectVisibility === "private"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectVisibility: e.target.value,
                      })
                    }
                  />
  <label for="private">Private</label><br/>
  </div>
</div>

<div class="uploadproject-input__box">
  <span class="uploadproject-details" style={{marginLeft:"0px"}}>Project Method *</span>
  <div class="projectmethod-radio">
  <input
                    type="radio"
                    id="implementation"
                    name="projectmethod"
                    value="implementation"
                    checked={formData.projectMethod === "implementation"}
                    onChange={handleProjectMethodChange}
                  />
  <label for="implementation">Implementation</label><br/>
  <input
                    type="radio"
                    id="research"
                    name="projectmethod"
                    value="research"
                    checked={formData.projectMethod === "research"}
                    onChange={handleProjectMethodChange}
                  />
  <label for="research">Research</label><br/>
  </div>
</div>
</div>



      <div class="uploadproject-input__box">
        <span class="uploadproject-details">Team Members *</span>
        <select onChange={handleTeamChange}>
          <option value="" disabled selected>Select Users</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div className="selected-technologies">
  <p><strong>Team Members:</strong></p>
  <ul>
    {teamMembers.map((member, index) => (
      <li key={index}>
        {member}
        <button onClick={() => handleRemoveTeamMember(index)}><FontAwesomeIcon icon={faTimes} /></button>
      </li>
    ))}
  </ul>
</div>
      <div class="uploadproject-input__box">
        <span class="uploadproject-details">Mentors</span>
        <select onChange={handleMentorChange}>
          <option value="" disabled selected>Select Mentors</option>
          {fetchedMentors.map((mentor) => (
            <option key={mentor._id} value={mentor._id}>
              {mentor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="selected-technologies">
  <p><strong>Mentors:</strong></p>
  <ul>
    {mentors.map((mentor, index) => (
      <li key={index}>
        {mentor}
        <button onClick={() => handleRemoveMentor(index)}><FontAwesomeIcon icon={faTimes} /></button>
      </li>
    ))}
  </ul>
</div>
    
     
<div style={{ display: "flex", flexWrap: "wrap" }}>
    <div className="uploadproject-input__box" style={{ width: "40%" }}>
          <span className="uploadproject-details">Flowchart </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFlowchartInputChange}
          />
        </div>
        <div className="uploadproject-input__box" style={{ width: "50%" }}>
          <span className="uploadproject-details">System Architecture </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleArchitectureInputChange}
          />
        </div> </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="uploadproject-input__box" style={{ width: "28%" }}>
          <span className="uploadproject-details">Project Duration *</span>
          <input
            type="number"
            placeholder="Duration (in months)"
            value={formData.projectDuration}
            onChange={(e) =>
              setFormData({
                ...formData,
                projectDuration: e.target.value,
              })
            }required
          />
        </div>
        <div className="uploadproject-input__box" style={{ width: "33%" }}>
          <span className="uploadproject-details">Upload Date *</span>
          <input
            type="date"
            value={formData.uploadDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                uploadDate: e.target.value,
              })
            }required
          />
        </div>
        <div className="uploadproject-input__box" style={{ width: "33%" }}>
          <span className="uploadproject-details">Tags</span>
          <input type="text" className="tagsInput"
            placeholder="Enter tags"
            value={formData.tags}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value,
              })
            }
            style={{ width: '80%',
                  padding: '9px',
                  marginLeft: '35px',
                  backgroundColor: '#fff8ed',
                  marginBottom: '10px',
                  boxShadow: '0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0.19)',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.3s, box-shadow 0.3s',}}
          />
        </div> </div>
    </div>
    <div className="uploadproject-button">
  <button
    type="submit"
    disabled={loading}
    onClick={handleSubmit}
    style={{
      backgroundColor: "#4CAF50",
      border: "none",
      color: "white",
      padding: "15px 32px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
      margin: "4px 2px",
      cursor: "pointer",
      borderRadius: "8px",
    }}
  >
    {loading ? (
      <>
        <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '8px' }} />
        Uploading...
      </>
    ) : (
      "Upload Project"
    )}
  </button>
</div>

{/* Modal */}

  </form>

  <div>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false);
              // Clear modal content after closing
              setModalContent('');
            }}
            contentLabel="Plagiarism Report"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
              },
              content: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '600px',
                width: '100%',
                padding: '20px',
                background: '#fff',
                borderRadius: '8px',
              },
            }}
          >
            <div>
              <h2 style={{fontFamily:"Montserrat", fontSize:"20px", color:"maroon", fontWeight:"600"}}>Plagiarism Report</h2>
              <p style={{fontFamily:"Montserrat", fontSize:"18px", fontWeight:"500"}}>{modalContent}</p>
              <button onClick={() => setIsModalOpen(false)} style={{color:"red", fontWeight:"500"}}>Close</button>
            </div>
          </Modal>
        )}
      </div>
</div>

</div>
  </>
  );
};

export default HomeUploadProject;

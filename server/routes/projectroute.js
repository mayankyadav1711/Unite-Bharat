const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const User = mongoose.model("User");
const Project = mongoose.model("Project");
const { exec } = require('child_process');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { getJson } = require("serpapi");
const {EMAIL,GPASS} = require('../config/keys')
const Twitter = require('twitter');
const cheerio = require('cheerio')
function removeSpecialCharacters(text) {
  return text.replace(/[^a-zA-Z0-9\s]/g, '');
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mykyadav2003@gmail.com",
    pass: GPASS,
  },
});


router.post('/uploadproject', async (req, res) => {
  try {
    const {
      projectTitle,
      abstract,
      description,
      domain,
      images,
      technologyStack,
      googleDriveLink,
      projectVisibility,
      youtubeVideoLink,
      teamMembers,
      mentors,
      projectMethod,
      projectType,
      projectDuration,
      tags,
      flowchart,
      architecture,
      uploadDate,
      postedBy,
    } = req.body;

    console.log(req.body);

    if (
      !projectTitle ||
      !abstract ||
      !description ||
      !domain ||
      !projectVisibility ||
      !projectMethod ||
      !projectDuration ||
      !uploadDate
    ) {
      return res.status(422).json({ error: 'Please add all the required fields' });
    }

    const projectdata = new Project({
      projectTitle,
      abstract,
      description,
      domain,
      images,
      technologyStack,
      googleDriveLink,
      projectVisibility,
      youtubeVideoLink,
      teamMembers,
      mentors,
      projectMethod,
      projectType,
      projectDuration,
      tags,
      flowchart,
      architecture,
      uploadDate,
      postedBy,
    });

    const projectTitle1 = removeSpecialCharacters(projectTitle);
    const abstract1 = removeSpecialCharacters(abstract);
    const description1 = removeSpecialCharacters(description);

    // Call plagiarism checker script
    exec(`python ./plagirism.py "${projectTitle1}" "${abstract1}" "${description1}"`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: 'Server error' });
      }
    
      try {
        if (!stdout) {
          throw new Error('Empty response from plagiarism checker');
        }
    
        const match = stdout.match(/Plagiarism Detected: (\w+), HTML Content:([\s\S]*)/);
    
        if (!match) {
          throw new Error('Invalid response format from plagiarism checker');
        }
    
        const plagiarismDetected = match[1] === 'True';
        const htmlContent = match[2]; // Do not use trim() here
        const $ = cheerio.load(htmlContent);

    // Extract the top project similarity score
    const topSimilarityScore = parseFloat($('td[style="background-color: red;"]').eq(1).text().replace('%', ''));

    // Log or use the top similarity score as needed
    console.log('Top Project Similarity Score:', topSimilarityScore);
        // Send email regardless of plagiarism detection
        sendPlagiarismEmail(plagiarismDetected, htmlContent);
    
        if (plagiarismDetected) {
          // Plagiarism detected, send HTML content in the response
          return res.status(422).json({ error: 'Plagiarism detected! ', topSimilarityScore });
        } else {
          // No plagiarism detected, proceed with saving project data
          try {
            await projectdata.save();
            // Send success response or any other response as needed
            return res.status(200).json({ message: 'Form submitted successfully!' });
          } catch (saveError) {
            console.error('Error saving project data:', saveError);
            return res.status(500).json({ error: 'Error saving project data' });
          }
        }
      } catch (parseError) {
        console.error(`Error parsing plagiarism result: ${parseError.message}`);
        return res.status(500).json({ error: 'Error parsing plagiarism result' });
      }
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

function sendPlagiarismEmail(plagiarismDetected, htmlContent) {
  const mailOptions = {
    from: 'mykyadav2003@gmail.com',
    to: 'mykyadav17112003@gmail.com', // Replace with your desired email address
    subject: plagiarismDetected ? 'Plagiarism Detected' : 'Project Uploaded Successfully',
    html: htmlContent, // Use the HTML content received from the plagiarism checker
  };
  
  transporter.sendMail(mailOptions, (mailError, info) => {
    if (mailError) {
      console.error('Error sending email:', mailError);
      // Handle email sending error as needed
    } else {
      console.log('Email sent:', info.response);
      // Handle successful email sending as needed
    }
  });
}




router.get("/recommendations/:userId", async (req, res) => {
  try {
    console.log("called")
    const userId = req.params.userId;

    // Fetch projects viewed and liked by the user
    const userProjects = await Project.find({
      $or: [{ views: userId }, { likes: userId }],
    });

    // Extract unique domains from user projects
    const userDomains = Array.from(
      new Set(userProjects.flatMap((project) => project.domain))
    );

    // Fetch projects from recommended domains
    const recommendedProjects = await Project.find({
      domain: { $in: userDomains },
    });

    // Sort recommended projects based on a combination of likes and views
    recommendedProjects.sort((a, b) => {
      const aScore = a.likes.length + a.views.length;
      const bScore = b.likes.length + b.views.length;
      return bScore - aScore;
    });

    // You can adjust the limit as needed
    const limitedRecommendedProjects = recommendedProjects.slice(0, 6);

    res.json({ projects: limitedRecommendedProjects });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get("/pdf-forms/:code", async (req, res) => {
  try {
    const code = req.params.code; // Get the 'code' parameter from the URL

    // Find the PdfForm in the database with the given 'code'
    const pdfForm = await PdfForm.findOne({ code });

    if (!pdfForm) {
      // If no PdfForm is found with the given 'code', return an error response
      return res
        .status(404)
        .json({ error: "PDF not found for the given code" });
    }

    // Extract the 'link' property from the pdfForm and send it as the response
    const { sem, sub, unit, link, author, description, extra, timestamp } =
      pdfForm;
    res.json({ sem, sub, unit, link, author, description, extra, timestamp });
  } catch (error) {
    // Handle errors
    console.error("Error fetching PDF link:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/project-domain-distribution', async (req, res) => {
  try {
    // Aggregate the count of projects for each domain
    const domainDistribution = await Project.aggregate([
      { $group: { _id: '$domain', count: { $sum: 1 } } },
    ]);

    // Calculate the total number of projects
    const totalProjects = domainDistribution.reduce((total, item) => total + item.count, 0);

    // Format the data for the pie chart with percentages
    const pieChartData = domainDistribution.map((item) => ({
      x: item._id, // Assuming _id is the domain name
      y: (item.count / totalProjects) * 100,
      text: `${((item.count / totalProjects) * 100).toFixed(1)}%`, // Format percentage to two decimal places
    }));

    res.json(pieChartData);
  } catch (error) {
    console.error('Error fetching project domain distribution:', error);
    res.status(500).json({ error: 'An error occurred while fetching project domain distribution' });
  }
});
router.get('/university-project-domain-distribution/:universityId', async (req, res) => {
  try {
    const universityId = req.params.universityId;

    // Aggregate the count of projects for each domain posted by the university
    const domainDistribution = await Project.aggregate([
      { $match: { postedBy: new mongoose.Types.ObjectId(universityId) } },
      { $group: { _id: '$domain', count: { $sum: 1 } } },
    ]);

    // Calculate the total number of projects
    const totalProjects = domainDistribution.reduce((total, item) => total + item.count, 0);

    // Format the data for the pie chart with percentages
    const pieChartData = domainDistribution.map((item) => ({
      x: item._id, // Assuming _id is the domain name
      y: (item.count / totalProjects) * 100,
      text: `${((item.count / totalProjects) * 100).toFixed(1)}%`, // Format percentage to two decimal places
    }));

    res.json(pieChartData);
  } catch (error) {
    console.error('Error fetching university project domain distribution:', error);
    res.status(500).json({ error: 'An error occurred while fetching university project domain distribution' });
  }
});


router.get('/project-method-type', async (req, res) => {
  try {
    const projectImplementationTypes = await Project.aggregate([
      {
        $group: {
          _id: '$projectMethod',
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate the total number of projects
    const totalProjects = projectImplementationTypes.reduce((total, item) => total + item.count, 0);

    // Format the data for the pie chart with percentages
    const formattedData = projectImplementationTypes.map((item) => ({
      x: item._id,
      y: (item.count / totalProjects) * 100,
      text: `${((item.count / totalProjects) * 100).toFixed(1)}%`, // Format percentage to two decimal places
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching project implementation type:', error);
    res.status(500).json({ error: 'An error occurred while fetching project implementation type' });
  }
});
router.get('/university-project-method-type/:universityId', async (req, res) => {
  try {
    const universityId = req.params.universityId;

    // Use the universityId to filter projects by university
    const projectImplementationTypes = await Project.aggregate([
      {
        $match: { postedBy: new mongoose.Types.ObjectId(universityId) },
      },
      {
        $group: {
          _id: '$projectMethod',
          count: { $sum: 1 },
        },
      },
    ]);
    
    // Calculate the total number of projects for the university
    const totalProjects = projectImplementationTypes.reduce((total, item) => total + item.count, 0);
    // Format the data for the pie chart with percentages
    const formattedData = projectImplementationTypes.map((item) => ({
      x: item._id,
      y: (item.count / totalProjects) * 100,
      text: `${((item.count / totalProjects) * 100).toFixed(1)}%`, // Format percentage to two decimal places
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching university project implementation type:', error);
    res.status(500).json({ error: 'An error occurred while fetching university project implementation type' });
  }
});


router.get('/project-tech-vs-non-tech-breakdown', async (req, res) => {
  try {
    const techNonTechProjects = await Project.aggregate([
      {
        $group: {
          _id: '$projectType', // Assuming 'isTech' is a boolean field indicating tech or non-tech
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedData = techNonTechProjects.map((item) => ({
      x: item._id ? 'tech' : 'nontech',
      y: item.count,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching tech vs non-tech project breakdown:', error);
    res.status(500).json({ error: 'An error occurred while fetching tech vs non-tech project breakdown' });
  }
});
router.get('/university/project-tech-vs-non-tech-breakdown/:universityId', async (req, res) => {
  try {
    const universityId = req.params.universityId;

    // Use the universityId to filter projects by university
    const techNonTechProjects = await Project.aggregate([
      {
        $match: { postedBy: new mongoose.Types.ObjectId(universityId) },
      },
      {
        $group: {
          _id: '$projectType', // Assuming 'isTech' is a boolean field indicating tech or non-tech
          count: { $sum: 1 },
        },
      },
    ]);

    // Format the data for the chart
    const formattedData = techNonTechProjects.map((item) => ({
      x: item._id ? 'tech' : 'nontech',
      y: item.count,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching tech vs non-tech project breakdown for university:', error);
    res.status(500).json({ error: 'An error occurred while fetching tech vs non-tech project breakdown for university' });
  }
});
// Assuming 'Project' is your Mongoose model
router.get('/top-domains-with-most-likes', async (req, res) => {
  try {
    const topDomainsWithMostLikes = await Project.aggregate([
      {
        $group: {
          _id: '$domain', // Assuming 'domain' is the field representing the project's domain
          likes: { $sum: '$likes.length' }, // Assuming 'likes' is the field representing the project's likes
        },
      },
      { $sort: { likes: -1 } },
      { $limit: 3 },
    ]);

    res.json(topDomainsWithMostLikes);
  } catch (error) {
    console.error('Error fetching top domains with most likes for admin:', error);
    res.status(500).json({ error: 'An error occurred while fetching top domains with most likes for admin' });
  }
});

// Assuming 'Project' is your Mongoose model
router.get('/university-top-domains-with-most-likes/:universityId', async (req, res) => {
  try {
    const universityId = req.params.universityId;

    const topDomainsWithMostLikes = await Project.aggregate([
      {
        $match: { postedBy: new  mongoose.Types.ObjectId(universityId) }, // Assuming 'universityId' is the field representing the university's ID
      },
      {
        $group: {
          _id: '$domain', // Assuming 'domain' is the field representing the project's domain
          likes: { $sum: '$likes.length' }, // Assuming 'likes' is the field representing the project's likes
        },
      },
      { $sort: { likes: -1 } },
      { $limit: 3 },
    ]);

    res.json(topDomainsWithMostLikes);
  } catch (error) {
    console.error('Error fetching top domains with most likes for university:', error);
    res.status(500).json({ error: 'An error occurred while fetching top domains with most likes for university' });
  }
});


// Assuming 'Project' is your Mongoose model
// Assuming 'Project' is your Mongoose model
router.get('/top-universities-with-most-projects', async (req, res) => {
  try {
    const topUniversities = await Project.aggregate([
      {
        $match: {
          postedBy: { $exists: true, $ne: null },
        },
      },
      {
        $lookup: {
          from: 'users', // Replace 'users' with the actual name of the User model collection
          localField: 'postedBy',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      ({$addFields: {
        userDetailsNullCheck: { $ifNull: ['$userDetails.shortname', 'No University'] },
      }}),
      {
        $group: {
          _id: '$userDetailsNullCheck',
          projects: { $sum: 1 },
        },
      },
      { $sort: { projects: -1 } },
      { $limit: 8 },
      {
        $project: {
          university: '$_id',
          projects: 1,
          _id: 0,
        },
      },
    ]);

    console.log('Top Universities:', topUniversities); // Add this line for debugging

    res.json(topUniversities);
  } catch (error) {
    console.error('Error fetching top universities with most projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching top universities with most projects' });
  }
});
router.get('/top-states-with-most-projects', async (req, res) => {
  try {
    const topStates = await Project.aggregate([
      {
        $match: {
          postedBy: { $exists: true, $ne: null },
        },
      },
      {
        $lookup: {
          from: 'users', // Replace 'users' with the actual name of the User model collection
          localField: 'postedBy',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $group: {
          _id: '$userDetails.nameofstate', // Group by the state
          projects: { $sum: 1 },
        },
      },
      { $sort: { projects: -1 } },
      { $limit: 8 },
      {
        $project: {
          state: '$_id', // Rename _id to state
          projects: 1,
          _id: 0,
        },
      },
    ]);

    console.log('Top States:', topStates); // Add this line for debugging

    res.json(topStates);
  } catch (error) {
    console.error('Error fetching top states with most projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching top states with most projects' });
  }
});

router.get('/top-states-by-average-project-views', async (req, res) => {
  try {
    const topStatesByAverageViews = await Project.aggregate([
      {
        $match: {
          views: { $exists: true, $ne: [] }, // Assuming 'views' is an array of user references
        },
      },
      {
        $lookup: {
          from: 'users', // Replace 'users' with the actual name of the User model collection
          localField: 'postedBy',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $unwind: '$views',
      },
      {
        $group: {
          _id: {
            state: '$userDetails.nameofstate', // Group by the state
            project: '$_id', // Group by the project ID
          },
          views: { $sum: 1 }, // Count distinct views
        },
      },
      {
        $group: {
          _id: '$_id.state',
          averageViews: { $avg: '$views' }, // Calculate the average views for each state
        },
      },
      { $sort: { averageViews: -1 } },
      { $limit: 5 },
      {
        $project: {
          state: '$_id', // Rename _id to state
          averageViews: 1,
          _id: 0,
        },
      },
    ]);

    console.log('Top States by Average Project Views:', topStatesByAverageViews); // Add this line for debugging

    res.json(topStatesByAverageViews);
  } catch (error) {
    console.error('Error fetching top states by average project views:', error);
    res.status(500).json({ error: 'An error occurred while fetching top states by average project views' });
  }
});



// Assuming 'Project' is your Mongoose model
router.get('/top-projects-by-likes', async (req, res) => {
  try {
    const topProjects = await Project.aggregate([
      {
        $match: {
          'likes': { $exists: true, $ne: null, $ne: [] }, // Check if 'likes' is an array
        },
      },
      {
        $group: {
          _id: '$domain',
          likes: {
            $sum: {
              $cond: {
                if: { $isArray: '$likes' }, // Check if 'likes' is an array
                then: { $size: '$likes' },
                else: 0,
              },
            },
          },
        },
      },
      { $sort: { likes: -1 } },
      { $limit: 5 }, // Adjust the limit as needed
    ]);

    res.json(topProjects);
  } catch (error) {
    console.error('Error fetching top projects by likes:', error);
    res.status(500).json({ error: 'An error occurred while fetching top projects by likes' });
  }
});



// Assuming 'Project' is your Mongoose model
// Assuming 'Project' is your Mongoose model
router.get('/university-top-projects-by-likes/:universityId', async (req, res) => {
  const universityId = req.params.universityId;

  try {
    const topProjects = await Project.aggregate([
      {
        $match: {
          'postedBy': new mongoose.Types.ObjectId(universityId),
          'likes': { $exists: true, $ne: null, $ne: [] }, // Check if 'likes' is an array
        },
      },
      {
        $group: {
          _id: '$domain',
          likes: { $sum: { $size: '$likes' } },
        },
      },
      { $sort: { likes: -1 } },
      { $limit: 5 }, // Adjust the limit as needed
    ]);

    res.json(topProjects);
  } catch (error) {
    console.error('Error fetching top university projects by likes:', error);
    res.status(500).json({ error: 'An error occurred while fetching top university projects by likes' });
  }
});



router.get('/user-projects/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userProjects = await Project.find({
      'teamMembers': userId,
    }).populate('postedBy', 'name profilePic'); // Assuming postedBy is the user reference field

    res.json(userProjects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching user projects' });
  }
});

router.get('/user-liked-projects/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const likedProjects = await Project.find({ likes: userId })
      .populate('postedBy', 'name uploadDate projectTitle') // Adjust the fields as needed
      .exec();

    res.json(likedProjects);
  } catch (error) {
    console.error('Error fetching liked projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching liked projects' });
  }
});

router.get('/user-details/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetails = await User.findById(userId).select('name university location email profilePic nameofstate');
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
});

router.get('/user-projects/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userProjects = await Project.find({ 'postedBy': userId });
    res.json(userProjects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching user projects' });
  }
});

router.get('/public-projects', async (req, res) => {
  try {
    const publicProjects = await Project.find({ projectVisibility: 'public' })
      .populate({
        path: 'postedBy',
        select: '-password',
        model: User,
      })
      .exec();

    res.json(publicProjects);
  } catch (error) {
    console.error('Error fetching public projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching public projects' });
  }
});
router.get('/public-projectslist', async (req, res) => {
  try {
    const { limit, page, search, domain } = req.query;
    const skip = (page - 1) * limit;

    const query = {};

    // Apply search query
    if (search) {
      query.$or = [
        { projectTitle: { $regex: new RegExp(search, 'i') } },
        { domain: { $regex: new RegExp(search, 'i') } },
        { technologyStack: { $regex: new RegExp(search, 'i') } },
        { projectMethod: { $regex: new RegExp(search, 'i') } },
        { tags: { $regex: new RegExp(search, 'i') } },
        // Add more fields as needed
      ];
    }

    // Apply domain filter
    if (domain) {
      query.domain = { $regex: new RegExp(domain, 'i') };
    }

    const projects = await Project.find(Object.keys(query).length > 0 ? query : {})
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .exec();

    res.json({ projects });
  } catch (error) {
    console.error('Error fetching public projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching public projects' });
  }
});
router.get('/top-liked-projects', async (req, res) => {
  try {
    // Fetch public projects, sort them based on the number of likes (length of the likes array)
    const publicProjects = await Project.find({ projectVisibility: 'public' })
      .sort({ 'likes.length': -1 })
      .limit(4)
      .populate({
        path: 'postedBy',
        select: '-password',
        model: User,
      })
      .exec();

    // Sort the projects in-memory based on views if likes are the same
    const sortedProjects = publicProjects.sort((a, b) => b.views.length - a.views.length);

    res.json(sortedProjects);
  } catch (error) {
    console.error('Error fetching top liked projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching top liked projects' });
  }
});






router.get('/projects/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const projectDetails = await Project.findById(projectId)
      .populate('postedBy', '_id email university usertype profilePic')
      .populate('teamMembers', '_id name email profilePic')
      .populate('mentors', '_id name email profilePic');

    // Limit the tech stack to 4 items
    if (projectDetails && projectDetails.technologyStack) {
      projectDetails.technologyStack = projectDetails.technologyStack.slice(0, 5);
    }

    res.json(projectDetails);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ error: 'An error occurred while fetching project details' });
  }
});



router.post('/like/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await Project.findById(projectId);

    // Check if the user has already liked the project
    const alreadyLiked = project.likes.includes(userId);

    if (alreadyLiked) {
      // User already liked, so unlike
      project.likes.pull(userId);
    } else {
      // User hasn't liked, so like
      project.likes.push(userId);
    }

    await project.save();

    res.json({ success: true, likesCount: project.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.post('/view/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await Project.findById(projectId);

    // Check if the user has already viewed the project
    const alreadyViewed = project.views.includes(userId);

    if (!alreadyViewed) {
      // User hasn't viewed, so add view
      project.views.push(userId);
    }

    await project.save();

    res.json({ success: true, viewsCount: project.views.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.post('/google-search', async (req, res) => {
  try {
    console.log("google called")
    const { projectTitle } = req.body;

    const apiKey = 'AIzaSyDBgQASzck6T2npwrHcfoLUFh-CSnbFp10';
    const cx = '850953fc1ee574de6';

    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${projectTitle}`;
    const response = await axios.get(apiUrl);
    
    const results = response.data.items.slice(0, 3).map((result) => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet,
      image: result.pagemap.cse_image ? result.pagemap.cse_image[0].src : null,
    }));

    console.log(results);

    res.json({ results });
  } catch (error) {
    console.error('Error performing Google search:', error);
    res.status(500).json({ error: 'An error occurred while performing the search' });
  }
});

router.post('/youtube-search', async (req, res) => {
  try {
    console.log("YouTube Search API called");
    const { projectTitle } = req.body;

    const youtubeApiKey = 'AIzaSyCdeQS71SGmaB8U4Fu6nenkCOi6YIZ2jAY'; // Replace with your YouTube API key
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&q=${projectTitle}&part=snippet&type=video`;
    const youtubeResponse = await axios.get(youtubeApiUrl);
    const youtubeResults = youtubeResponse.data.items.slice(0, 3).map((item) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.default.url,
    }));

    console.log("YouTube Search Results:", youtubeResults);

    res.json({ youtubeResults });
  } catch (error) {
    console.error('Error performing YouTube Search:', error);
    res.status(500).json({ error: 'An error occurred while performing the YouTube search' });
  }
});
router.post('/google-scholar-search', async (req, res) => {
  try {
    console.log('Google Scholar Search API called');
    const { projectTitle } = req.body;

    const apiKey = 'eb7c652b20dee39b69b044a5a21db61e3dbddd49f93eddea0e84e991b0ec614d'; // Replace with your SerpAPI API key
    const serpapiParams = {
      engine: 'google_scholar',
      q: projectTitle,
      api_key: apiKey,
    };

    const serpapiResponse = await getGoogleScholarResults(serpapiParams);
    const results = serpapiResponse.organic_results.slice(0, 3).map((result) => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet,
    }));

    console.log('Google Scholar Search Results:', results);

    res.json({ results });
  } catch (error) {
    console.error('Error performing Google Scholar Search:', error);
    res.status(500).json({ error: 'An error occurred while performing the Google Scholar search' });
  }
});

const getGoogleScholarResults = async (serpapiParams) => {
  return new Promise((resolve, reject) => {
    getJson(serpapiParams, (json) => {
      if (json.error) {
        reject(json.error);
      } else {
        resolve(json);
      }
    });
  });
};


const twitterClient = new Twitter({
  consumer_key: 'YKZMgTrRb18PuAA40l5uEaNp1',
  consumer_secret: 'hccdqddJhqaJ7U75YWc7vkDw8hb8m99Dof3kGVjpDriYwBYxgd',
  access_token_key: '1690017708476108801-APVatLl5jZVfNHdZOsbMqlOS8Yk3Sw',
  access_token_secret: 'BzdQdFWb5To7kk3AFQJRdUYC08FJUS6UdL3MH6ER2AO3c',
});

const additionalAuthorizationToken = 'AAAAAAAAAAAAAAAAAAAAAMXGrQEAAAAAU1jvmVARpFBztHefEIJHB9j34AA%3DIF9pNFWZ8GmxdbEgSQuMdjgWFrlXfbrB28uMfuNB3c7l3ZDytu';

// Updated route code
router.post('/twitter-search', async (req, res) => {
  try {
    console.log('Twitter Search API called');
    const { projectTitle } = req.body;

    const twitterParams = {
      q: projectTitle,
      result_type: 'mixed',
      count: 3,
    };

    const tweets = await searchTwitter(twitterParams, additionalAuthorizationToken);
    res.json({ tweets });
  } catch (error) {
    console.error('Error performing Twitter Search:', error);
    res.status(500).json({ error: 'An error occurred while performing the Twitter search' });
  }
});

// Updated searchTwitter function
const searchTwitter = async (params, additionalAuthorizationToken) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${additionalAuthorizationToken}`,
    },
  };

  try {
    const response = await axios.get('https://api.twitter.com/1.1/search/tweets.json', {
      params,
      headers: config.headers,
    });
    return response.data.statuses;
  } catch (error) {
    throw error.response.data.errors;
  }
};



router.get("/university/:universityId", async (req, res) => {
  try {
    const universityId = req.params.universityId;
    const universityDetails = await User.findById(universityId);
    res.json(universityDetails);
  } catch (error) {
    console.error("Error fetching university details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get("/uniprojects/:universityId", async (req, res) => {
  try {
    const universityId = req.params.universityId;

    // Assuming 'postedBy' is the field storing the reference to the university ID
    const projects = await Project.find({ postedBy: universityId });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;

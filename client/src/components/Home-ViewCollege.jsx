import React, { useState, useEffect, useContext, useCallback } from 'react';
import HomeHeader from "./Home-Header";
import { UserContext } from "../App";
import { Link, useNavigate,useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import summarize from "./images/summarize.svg";
import Modal from "react-modal";
import University from "./images/University.svg";
import location from "./images/location.svg";
import  email from "./images/email.svg";

import {
    BsPeople,
    BsPerson,
    BsBuilding,
    BsFileText,
    BsGeoAlt,
    BsBriefcase,
    BsEnvelope,
  } from "react-icons/bs";
import HomeFooter from "./Home-Footer";

const HomeViewCollege = () => {
    const [activeTab2, setActiveTab2] = useState("resources");
    const handleTabChange2 = (tab) => {
      setActiveTab2(tab);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { state } = useContext(UserContext);
    const [userProjects, setUserProjects] = useState([]);
    const [universityDetails, setUniversityDetails] = useState({});
    const { universityId } = useParams(); // Assuming you have a route parameter named universityId
  
    useEffect(() => {
      // Fetch university details
      fetchUniversityDetails();
  
      // Fetch user projects
      fetchUserProjects();
    }, [state, universityId]); // Include universityId in the dependencies array
  
    const fetchUniversityDetails = async () => {
      try {
        const response = await fetch(`https://api-sankalp.vercel.app/university/${universityId}`);
        const data = await response.json();
        setUniversityDetails(data);
      } catch (error) {
        console.error("Error fetching university details:", error);
      }
    };
  
    const fetchUserProjects = async () => {
      try {
        const response = await fetch(`https://api-sankalp.vercel.app/uniprojects/${universityId}`);
        const data = await response.json();
        setUserProjects(data);
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };
    
  
      
   
  
  
   

  
   
 
 ;
  
  
    const spacerStyle = {
        height: "7rem",
     
    };

  return (
   <>
   <HomeHeader/>
   <div style={spacerStyle} />
   <div
  className="md:w-3/4 lg:w-2/3 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3"
  style={{
    width: "1400px",
    marginLeft: '21rem !important',
    importantProperty: 'something !important',
    transition: "box-shadow 0.3s", // Add transition for smooth hover effect
    fontSize: "20px", // Increase font size
    boxShadow: "rgb(4 4 4 / 10%) 0px 4px 6px inset, rgba(0, 0, 0, 0.1) 0px 6px 8px", // Apply default box shadow
    // margin: "0", // Center align using margin
    // marginLeft:"400px !important"
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.boxShadow =
      "0 20px 13px rgb(0 0 0 / 0.03), 0 8px 5px rgb(0 0 0 / 0.08)";
      e.currentTarget.style.cursor =
      "pointer";
      e.currentTarget.style.marginLeft =
      "400px !important";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.boxShadow =
      "rgb(4 4 4 / 10%) 0px 2px 4px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px";
      e.currentTarget.style.marginLeft =
      "400px !important";
  }}
>
  <div className="flex items-center mb-6">
    <div
      className="mr-4"
      style={{
        width: "280px", // Increase image width
      }}
    >
      <img
        src={universityDetails?.profilePic}
        alt="Admin Profile"
        className="w-48 h-48 rounded-full"
      />
    </div>
    <div>
      <p
        className="text-3xl font-semibold"
        style={{ marginBottom: "15px", fontWeight: "bold", fontFamily:"Montserrat" }}
      >
        {universityDetails?.shortname}
      </p>
      <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily:"Montserrat", color:"black", fontWeight:"500"}}>
      <img src={University} width="30px" style={{marginRight:"10px"}}/>
        <span style={{ fontWeight: "bold", color:"black", marginRight:"10px",fontFamily:"Montserrat", fontSize:"20px" }}>University:</span>{" "}
        {universityDetails?.university}
      </div>
      <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily:"Montserrat", color:"black", fontWeight:"500"}}>
      <img src={location} width="30px" style={{marginRight:"10px"}}/>
        <span style={{ fontWeight: "bold", color:"black", marginRight:"10px",fontFamily:"Montserrat", fontSize:"20px" }}>Location:</span>{" "}
        {universityDetails?.nameofstate}
      </div>
      <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily:"Montserrat", color:"black", fontWeight:"500"}}>
      <img src={email} width="30px" style={{marginRight:"10px"}}/>
        <span style={{ fontWeight: "bold", color:"black", marginRight:"10px",fontFamily:"Montserrat", fontSize:"20px" }}>Email:</span> {universityDetails?.emailAddress}
      </div>
    </div>
  </div>
  {/* ... (Remaining code remains unchanged) */}
</div>
     

{/* Summarize Button */}
<Link to="/invitation">
<button
  className="btn"
  id="collabButton"
  style={{
    background: 'linear-gradient(45deg, #FFA07A, #FF6347)',
    marginLeft: '-50px',
    height: '60px',
    marginTop: '50px',
    zIndex: '1 !important',
    position: 'relative !important',
    width:"220px"
  }}
  
>
  {/* Render the loading spinner or the content */}
  <>
    <img src={summarize} alt="Summarize" />{' '}
    <p
      style={{
        marginTop: '-35px',
        fontSize: '25px',
        fontFamily: 'Montserrat',
        fontWeight: '600',
        marginLeft:"30px",
        color:"white",
        
      }}
    >
      Collaborate
    </p>
  </>
</button>
</Link>



<div className="vprofile">
          {/* Add the TabSwitcher directly */}
          <Stack direction="row" spacing={5}>
            <Paper
              onClick={() => handleTabChange2("resources")}
              style={{
                cursor: "pointer",
                backgroundColor:
                  activeTab2 === "resources" ? "blue" : "transparent",
                color: activeTab2 === "resources" ? "#fff" : "#000",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
             Resources
            </Paper>
           
            <Paper
              onClick={() => handleTabChange2("projects")}
              style={{
                cursor: "pointer",
                backgroundColor:
                  activeTab2 === "projects" ? "orangered" : "transparent",
                color: activeTab2 === "projects" ? "#fff" : "#000",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
            Projects
            </Paper>
          </Stack>
          {/* Render Components based on Active Tab */}
          {activeTab2 === "resources" && (
            <>
               <div className="res-header">
  
  {/* Card Start */}
  <div className="resources" style={{marginLeft:"230px"}}>
   
    <div className="card" style={{
        height:"300px",
        display: "flex",
        width: "800px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginLeft: "80px",
        marginTop: "50px",
        transition: "all .4s cubic-bezier(0.175, 0.885, 0, 1)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0, 1)",
        backgroundColor: "#fff",
        position: "relative",
        borderRadius: "1rem",
        overflow: "hidden",
        border: "5px solid #b3938054",
        boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.54)",
    }}>
      <div className="row ">
        <div className="col-md-7 px-3">
          <div className="card-block px-6">
            <h4 className="card-title">
            {universityDetails?.resourceName}
            </h4>
            <div style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", WebkitLineClamp: 6 }}>
  <p className="card-text">
  {universityDetails?.resourceDescription}  </p>
</div>
          
            <br />
           
          </div>
        </div>
        {/* Carousel start */}
        <div className="col-md-5">
        <div id="CarouselTest" className="carousel slide" data-ride="carousel">
  {/* Carousel Indicators */}
  <ol className="carousel-indicators">
    <li data-target="#CarouselTest" data-slide-to={0} className="active" />
    <li data-target="#CarouselTest" data-slide-to={1} />
    <li data-target="#CarouselTest" data-slide-to={2} />
  </ol>

  {/* Carousel Items */}
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img
        className="d-block w-100"
        src={universityDetails?.resourceImage}
        alt="First slide"
      />
    </div>
    
  </div>

  {/* Carousel Controls */}
  <a
    className="carousel-control-prev"
    href="#CarouselTest"
    role="button"
    data-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </a>
  <a
    className="carousel-control-next"
    href="#CarouselTest"
    role="button"
    data-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </a>
</div>

        </div>
        {/* End of carousel */}
      </div>
    </div>
    
    {/* End of card */}
  </div>
  <div className="right-side">
    {/* Elements for the right side go here */}
  </div>

  </div>

              <br />
            </>
          )}

           {activeTab2 === "projects" && (
            <>
               <h3 className="topPicks" style={{  color: 'rgb(190, 51, 0)',
    textAlign: 'center',
    width:"400px",
    fontWeight: 500,
    fontFamily: 'Montserrat',
    fontSize: '40px',
    marginLeft: '500px',
    marginBottom: '2rem',
    marginTop: '-1rem',
    border: '1rem solid rgb(255, 212, 186)',
    borderRadius: '2rem',
    backdropFilter: 'blur(16px)',
    background: 'rgba(203, 190, 183, 0.14)', }}>Projects</h3>
      <hr style={{ border: '1px solid #ccc', margin: '0 auto', width: '50%' }} />
 <section
            className="results-section results--grid"
            style={{ position: "relative", zIndex: "1", width: "1400px" }}
          >


  {userProjects.map((project) => (
<div key={project._id} className="profile">
                    <div className="profile__image">
                      <img
                        src={
                          project?.images?.[0] ||
                          "https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/Screenshot%202023-09-13%20001323.png?alt=media&token=a29363df-f374-4ae3-ae24-d66956dbfdf7"
                        }
                        alt="Doggo"
                      />
                      <i className="fas fa-medal"></i>
                    </div>

                    <div className="profile__info">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "grey",
                        }}
                      >
                        <p style={{ flex: 1 }}>
                          {project?.postedBy.name.split(" ")[0]}
                        </p>
                        <p style={{ marginLeft: "20px" }}>
                          {project?.uploadDate
                            ? new Date(project.uploadDate).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : ""}
                        </p>
                      </div>
                      <h3>{project?.projectTitle}</h3>
                    </div>

                    <div className="metrics">
                      <div>
                        <i className="fa-solid fa-eye"></i>
                        <p>{project?.views ? project.views.length : 0}</p>
                      </div>

                      <div>
                        <i className="fa-solid fa-thumbs-up"></i>
                        <p>{project?.likes ? project.likes.length : 0}</p>
                      </div>
                    </div>

                    <div className="btn-VP">
                      <div className="profile_stats_info temp"></div>
                      <Link
                        to={`/viewproject/${project._id}`}
                        className="btn-VP"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                  ))}
                  </section>
            </>
          )}
        </div>
      
                  <HomeFooter />
  </>
  );
};

export default HomeViewCollege;

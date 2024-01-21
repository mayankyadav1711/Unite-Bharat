import React, { useState, useEffect, useContext } from "react";
import HomeHeader from "./Home-Header";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import LinkedIN from "./images/linkedin.svg";
import github from "./images/github.png";
import University from "./images/University.svg";
import  portfolio from "./images/portfolio.svg";
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

const UserDashboard = () => {

    const { state } = useContext(UserContext);
    const [userProjects, setUserProjects] = useState([]);
    const [likedProjects, setLikedProjects] = useState([]);
  
    useEffect(() => {
      // Fetch user projects and liked projects when the component mounts
      fetchUserProjects();
      fetchLikedProjects();
    }, [state]);
  
    const fetchUserProjects = async () => {
      try {
        const response = await fetch(`https://api-sankalp.vercel.app/user-projects/${state?._id}`);
        const data = await response.json();
        setUserProjects(data);
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };
  
    const fetchLikedProjects = async () => {
      try {
        const response = await fetch(`https://api-sankalp.vercel.app/user-liked-projects/${state?._id}`);
        const data = await response.json();
        setLikedProjects(data);
      } catch (error) {
        console.error('Error fetching liked projects:', error);
      }
    };
  
 

  
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
        width: "200px", // Increase image width
      }}
    >
      <img
        src={state?.profilePic}
        alt="Admin Profile"
        className="w-48 h-48 rounded-full"
      />
    </div>
    <div>
      <p
        className="text-3xl font-semibold"
        style={{ marginBottom: "15px", fontWeight: "bold" }}
      >
        {state?.name}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap:"100px" }}>

  <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily: "Montserrat", color: "black", fontWeight: "500" }}>
    <img src={University} width="30px" style={{marginRight:"10px"}}/>
    <span style={{ fontWeight: "bold", color: "black", marginRight: "10px", fontFamily: "Montserrat", fontSize: "20px" }}>University:</span>{" "}
    {state?.university}
  </div>
  <Link to={state?.linkedin}>
  <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily: "Montserrat", color: "#0288d1", fontWeight: "700", backgroundColor: "aliceblue", padding: "10px", borderRadius: "10px", fontSize: "15px" }}>
    <img src={LinkedIN} style={{ width: "30px", height: "30px", marginRight: "5px" }} />
    LinkedIN
  </div></Link>
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap:"100px" }}>
      <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily:"Montserrat", color:"black", fontWeight:"500"}}>
      <img src={location} width="30px" style={{marginRight:"10px"}}/>
        <span style={{ fontWeight: "bold", color:"black", marginRight:"10px" }}>Location:</span>{" "}
        {state?.nameofstate}
      </div>
      <Link to={state?.github}>   <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily: "Montserrat", color: "#141414", fontWeight: "800", backgroundColor: "#787b7d99", padding: "10px", borderRadius: "10px", fontSize: "15px", width:"125px" }}>
      <img src={github} style={{width:"30px", height:"30px", marginRight:"8px"}}/>
    Github
  </div></Link></div>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap:"100px" }}> 
      <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily:"Montserrat", color:"black", fontWeight:"500"}}>
      <img src={email} width="30px" style={{marginRight:"10px"}}/>
        <span style={{ fontWeight: "bold", color:"black", marginRight:"5px" }}>Email:</span> {state?.email}
      </div>
      <Link to={state?.website}>  <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily: "Montserrat", color: "#bf1b2c", fontWeight: "800", backgroundColor: "#d4b9b999", padding: "10px", borderRadius: "10px", fontSize: "15px", width:"125px" }}>
      <img src={portfolio} style={{width:"30px", height:"30px", marginRight:"8px"}}/>
    Portfolio
  </div></Link></div>
    </div>
  </div>
  {/* ... (Remaining code remains unchanged) */}
</div>

 <h3 className="topPicks" style={{  color: 'rgb(190, 51, 0)',
    textAlign: 'center',
    width:"400px",
    fontWeight: 500,
    fontFamily: 'Montserrat',
    fontSize: '40px',
    marginLeft: '500px',
    marginBottom: '2rem',
    marginTop: '1rem',
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
                  <h3 className="topPicks" style={{  color: 'rgb(190, 51, 0)',
    textAlign: 'center',
    width:"400px",
    fontWeight: 500,
    fontFamily: 'Montserrat',
    fontSize: '40px',
    marginLeft: '500px',
    marginBottom: '2rem',
    marginTop: '1rem',
    border: '1rem solid rgb(255, 212, 186)',
    borderRadius: '2rem',
    backdropFilter: 'blur(16px)',
    background: 'rgba(203, 190, 183, 0.14)', }}>Liked Projects</h3>
      <hr style={{ border: '1px solid #ccc', margin: '0 auto', width: '50%' }} />
 <section
            className="results-section results--grid"
            style={{ position: "relative", zIndex: "1", width: "1400px" }}
          >


  {likedProjects.map((project) => (
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
  );
};

export default UserDashboard;

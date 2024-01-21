import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeTrendProject = () => {
  const [topProjects, setTopProjects] = useState([]);

  useEffect(() => {
    // Fetch top 4 most liked projects
    const fetchTopProjects = async () => {
      try {
        const response = await fetch('https://api-sankalp.vercel.app/top-liked-projects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const projects = await response.json();

        setTopProjects(projects);
      } catch (error) {
        console.error('Error fetching top projects:', error);
      }
    };

    fetchTopProjects();
  }, []);
 

  return (
    <>
      <h1 className="topPicks" style={{ color: 'rgb(190, 51, 0)',
  textAlign: 'center',
  fontWeight: 500,
  fontFamily: 'Montserrat',
  fontSize: '40px',
  marginLeft: '500px',
  marginBottom: '2rem',
  marginTop: '-1rem',
  boxShadow: '1rem solid black',
  border: '1rem solid #ffd4ba',
  borderRadius: '2rem',
  BoxShadow: 'inset 3px 2px rgb(179 158 145)',
  backdropFilter: 'blur(16px)',
   background: '#cbbeb724',}}>Trending</h1>
      <section class="cards">
      {topProjects.map((project, index) => (
<article class="card card--1">
<div
              className="card__ranking"
              style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '30px',
                height: '30px',
                backgroundColor: 'rgba(255, 136, 0, 0.9)', // Orange color
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                border: '2px solid rgba(255, 136, 0, 0.9)', // Orange border
                background: 'linear-gradient(45deg, rgba(255, 136, 0, 0.9), rgba(145, 61, 136, 0.9), rgba(219, 43, 138, 0.9))', // Gradient from orange to violet to pink
                transition: 'transform 0.3s ease-out',
              }}
            >
              {index + 1}
            </div>
  <div class="card__info-hover">
  <div>  
        <i className="fa-solid fa-eye"></i> 
        <p>{project?.views.length} views</p>
      </div>

      <div>
        <i className="fa-solid fa-thumbs-up"></i>  
        <p>{project?.likes.length} likes</p>  
      </div> 
      {/* <div >
        <svg class="card__clock"  viewBox="0 0 24 24"><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
        </svg><p>15 min ago</p>  
      </div> */}
    
  </div>
  <div
  className="card__img"
  style={{
    backgroundImage: `url(${project?.images?.length > 0 ? project?.images[0] : 'https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/Screenshot%202023-09-13%20001323.png?alt=media&token=a29363df-f374-4ae3-ae24-d66956dbfdf7'})`,
    // Add other background properties as needed
  }}
></div>

  <a  class="card_link">
     <div class="card__img--hover"></div>
   </a>
  <div class="card__info">
    <h3 class="card__category"> {project?.projectTitle}</h3>
    <h3 class="card__title">{project?.postedBy.name}</h3>
         {/* <div>{stars}</div> */} 
    
    <div className="btn-TP">
                      <div className="profile_stats_info temp"></div>
                      <Link
                        to={`/viewproject/${project?._id}`}
                        className="btn-TP"
                      >
                        View Project
                      </Link>
                    </div>
                    </div>
</article>
     ))}
  
 
  
  
  </section>
    </>
  );
};

export default HomeTrendProject;
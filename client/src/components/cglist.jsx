import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/dd.jpg";
import HomeHeader from "./Home-Header";

const CgList = () => {
    const [universityUsers, setUniversityUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch university users when the component mounts
    const fetchUniversityUsers = async () => {
      try {
        const response = await fetch("https://api-sankalp.vercel.app/university-users");
        const data = await response.json();
        setUniversityUsers(data);
      } catch (error) {
        console.error("Error fetching university users:", error);
      }
    };

    fetchUniversityUsers();
  }, []);

  const openCollegePage = (userId) => {
    // Redirect to viewcollege.html
    // Use react-router's navigate function instead of window.location.href
    navigate(`/viewcollege/${userId}`);
  };
  const filteredUniversityUsers = universityUsers.filter((user) =>
  user.shortname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.nameofstate.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.university.toLowerCase().includes(searchTerm.toLowerCase()) 

);
  return (
    <>
    <HomeHeader />
    <div style={{marginTop:"100px"}}>
    <input
    type="text"
    placeholder="Search projects"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      padding: "0px 0px 0px 14px",
      fontSize: "16px",
      borderRadius: "1rem",
      border: "1px solid rgb(204, 204, 204)",
      width: "31rem",
      height: "51px",
      margin: "47px -17px 0px 214px",
      marginLeft: "-7rem"
    }}
  />
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}>

    {filteredUniversityUsers.map((user) => (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          margin: "16px",
          width: "350px",
          textAlign: "center",
          position: "relative",
    backgroundColor: "rgb(255, 255, 255)",
    backdropFilter: "blur(12px)",
    color: "var(--foregroundColor)",
    boxShadow: "37px 37px 41px -27px rgb(69 60 54 / 26%)",
    borderRadius: "1.5rem",
    border: "0px 0px 1px 1px solid",
    overflow: "hidden",
    transition: "0.2s ease",
          ":hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <img
          src={user?.profilePic}
          alt="Logo of College 1"
          style={{ width: "200px", borderRadius: "50%", marginBottom: "12px", height:"200px", marginLeft:"50px" }}
        />
        <h3 style={{ marginBottom: "8px", color: "maroon", fontWeight:"600", fontFamily:"Montserrat", fontSize:"20px", height:"50px", textAlign:"center" }}>{user?.shortname}</h3>
        <p style={{ marginBottom: "8px", color: "#777" }}> {user?.nameofstate} </p>
        <Link
          to={`/viewcollege/${user?._id}`}
          style={{
            display: "block",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            textDecoration: "none",
            borderRadius: "4px",
            background: "linear-gradient(45deg, #FF512F, #DD2476)",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
  boxShadow: "2px 3px 4px 3px rgba(129, 116, 77, 0.386)",
  cursor: "pointer",
  transition: "transform 0.2s",
  overflow: "hidden",
  position: "relative",
  zIndex: 0,
            ":hover": {
              backgroundColor: "#45a049",
              transform: "scale(1.02)"
            },
          }}
        >
          View College
        </Link>
      </div>
   ))}
      {/* Repeat the above block for each card */}
    
      
    </div>
    </div>

    </>
  );
};

export default CgList;

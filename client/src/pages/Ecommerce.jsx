import React, { useState, useEffect, useContext } from "react";
import {
  BsPeople,
  BsPerson,
  BsBuilding,
  BsFileText,
  BsGeoAlt,
  BsBriefcase,
  BsEnvelope,
} from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { UserContext } from "../App";
import  portfolio from "../components/images/portfolio.svg";
import location from "../components/images/location.svg";
import  email from "../components/images/email.svg";

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const [totalStats, setTotalStats] = useState({});
  const { state } = useContext(UserContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let statsEndpoint = "https://api-sankalp.vercel.app/total-stats";
        let params = ""; // To store URL parameters

        if (state?.usertype === "university") {
          statsEndpoint = `https://api-sankalp.vercel.app/university-stats?id=${state?._id}&university=${state?.university}`;
        }

        const response = await fetch(statsEndpoint + params);
        const data = await response.json();
        setTotalStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [state?.usertype, state?.university, state?._id]); // Trigger the fetch when usertype changes

  const iconMapping = {
    Students: <BsPeople />,
    Mentors: <BsPerson />,
    University: <BsBuilding />,
    Projects: <BsFileText />,
  };

  return (
    <div className="mt-24 fixed">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div
          className="md:w-1/2 lg: bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3"
          style={{
            width: "800px",
            transition: "box-shadow 0.3s", // Add transition for smooth hover effect
            zIndex:"0"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow =
              "0 20px 13px rgb(0 0 0 / 0.03), 0 8px 5px rgb(0 0 0 / 0.08)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow =
              "rgb(4 4 4 / 10%) 0px 2px 4px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px";
          }}
        >
          <div className="flex items-center mb-6">
            <div
              className="mr-4"
              style={{
                width: "230px",
              }}
            >
              <img
                src={state?.profilePic} // Replace with your profile picture URL
                alt="Admin Profile"
                className="w-36 h-36 rounded-full"
                style={{
                  boxShadow:
                    "rgb(4 4 4 / 10%) 0px 4px 6px inset, rgba(0, 0, 0, 0.1) 0px 6px 8px",
                  transition: "box-shadow 0.3s", // Add transition for smooth hover effect
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 20px 13px rgb(0 0 0 / 0.03), 0 8px 5px rgb(0 0 0 / 0.08)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "rgb(4 4 4 / 10%) 0px 2px 4px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px";
                }}
              />
            </div>
            <div>
              <p
                className="text-2xl font-semibold"
                style={{ marginBottom: "10px" }}
              >
                {state?.name}
              </p>{" "}
              {/* Replace with admin name */}
              <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily: "Montserrat", color: "black", fontWeight: "500" }}>
    <img src={portfolio} width="30px" style={{marginRight:"10px"}}/>
    <span style={{ fontWeight: "bold", color: "black", marginRight: "10px", fontFamily: "Montserrat", fontSize: "20px" }}>    Department: </span>{" "}
    Engineering
  </div>
  <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily: "Montserrat", color: "black", fontWeight: "500" }}>
    <img src={location} width="30px" style={{marginRight:"10px"}}/>
    <span style={{ fontWeight: "bold", color: "black", marginRight: "10px", fontFamily: "Montserrat", fontSize: "20px" }}>    Location: </span>{" "}
    Gandhinagar, Gujarat
  </div>
  <div className="flex items-center text-gray-500 mb-2" style={{ fontFamily: "Montserrat", color: "black", fontWeight: "500" }}>
    <img src={email} width="30px" style={{marginRight:"10px"}}/>
    <span style={{ fontWeight: "bold", color: "black", marginRight: "10px", fontFamily: "Montserrat", fontSize: "20px" }}>    Email: </span>{" "}
    info@ldrp.ac.in
  </div>
            </div>
          </div>
          {/* ... (Remaining code remains unchanged) */}
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-6 items-center">
          {/* Display total number of students, university, mentors, and projects */}
{Object.keys(totalStats).map((key) => (
  <div
    key={key}
    className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-48 p-6 pt-9 rounded-2xl shadow-md" // Added shadow-md for box shadow
  >
    <button
      type="button"
      style={{
        color: currentColor,
        backgroundColor: "white",
        boxShadow: `inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)`, // Added box shadows
      }}
      className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
    >
      {iconMapping[key] || <BsFileText /> /* Use the corresponding icon or fallback to a default */}
    </button>
    <p className="mt-3">
      <span className="text-lg font-semibold">{totalStats[key]}</span>
    </p>
    <p className="text-sm text-gray-400 mt-1 capitalize">
      {key.replace("total", "")}
    </p>
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default Ecommerce;

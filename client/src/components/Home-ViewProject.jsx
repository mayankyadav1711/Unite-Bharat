import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../App";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { FaThumbsUp } from "react-icons/fa";
import summarize from "./images/summarize.svg";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import flowchart from "./images/60111.png";
import arch from "./images/60111.png";
import LinkedIN from "./images/linkedin.svg";
import github from "./images/github.png";
import youtube from "./images/youtube.svg";
import drive from "./images/drive.svg";
import Paper from "@mui/material/Paper";
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
import Header from "./Home-Header";
import HomeFooter from "./Home-Footer";
import p1 from "./images/60111.png";
import logo2 from "./images/jharkhand.png";
import navbarlogo from "./images/Sankalp.svg";

const HomeViewProject = () => {
  const { state } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(0);
  const [Googlequery, setGooglequery] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [scholarResults, setScholarResults] = useState([]);
  const [twitterResults, setTwitterResults] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("flowchart");
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const Grid = styled(MuiGrid)(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
  }));
  const [scrolling, setScrolling] = useState(false);
  const [hideHeaderPart1, setHideHeaderPart1] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolling(scrollTop > 0);

      // Calculate scroll progress as a percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const currentScroll = scrollTop;
      const progress = (currentScroll / maxScroll) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const fetchProjectDetails = async () => {

      try {
        const response = await fetch(`https://api-sankalp.vercel.app/projects/${projectId}`);
        const data = await response.json();
        setProjectDetails(data);
        setGooglequery(data?.projectTitle);
        // Extract likes and views count from the project details
        setLiked(data.likes.includes(state?._id));
        setViews(data.views.length);
        handleSearch(Googlequery); // Pass the project title directly
        handleYouTubeSearch(Googlequery);
        handleScholarSearch(Googlequery);
        // Increment views for the current user if not already viewed
        if (!data.views.includes(state?._id)) {
          incrementView(data.projectTitle);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId, state?._id, Googlequery]);

  const handleSearch = async (searchedQuery) => {
    try {
      if (!searchedQuery) {
        // If searchedQuery is empty, you can handle it here
        console.error("Searched query is empty");
        return;
      }

      setLoading(true);

      const response = await fetch("https://api-sankalp.vercel.app/google-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ projectTitle: searchedQuery }),
      });

      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error in handleSearch:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  const handleYouTubeSearch = async (searchedQuery) => {
    try {
      if (!searchedQuery) {
        // If searchedQuery is empty, you can handle it here
        console.error("Searched query is empty");
        return;
      }

      setLoading(true);

      const response = await fetch("https://api-sankalp.vercel.app/youtube-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ projectTitle: searchedQuery }),
      });

      const data = await response.json();
      setYoutubeResults(data.youtubeResults);
    } catch (error) {
      console.error("Error in handleYouTubeSearch:", error);
      setYoutubeResults([]);
    } finally {
      setLoading(false);
    }
  };
  const handleScholarSearch = async (searchedQuery) => {
    try {
      if (!searchedQuery) {
        // If searchedQuery is empty, you can handle it here
        console.error("Searched query is empty");
        return;
      }

      setLoading(true);

      const response = await fetch("https://api-sankalp.vercel.app/google-scholar-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ projectTitle: searchedQuery }),
      });

      const data = await response.json();
      setScholarResults(data.results);
    } catch (error) {
      console.error("Error in handleYouTubeSearch:", error);
      setScholarResults([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    try {
      // Optimistically update the local state
      setLiked((prevLiked) => !prevLiked);

      const response = await fetch(`https://api-sankalp.vercel.app/like/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: state?._id }),
      });

      if (response.ok) {
        // Update the likes count immediately on a successful server response
        setProjectDetails((prevDetails) => {
          const updatedLikes = prevDetails.likes.includes(state?._id)
            ? prevDetails.likes.filter((id) => id !== state?._id)
            : [...prevDetails.likes, state?._id];

          return { ...prevDetails, likes: updatedLikes };
        });
        console.log("Likes count updated");
      } else {
        console.error("Failed to toggle like");
        // Revert the local state if the server update fails
        setLiked((prevLiked) => !prevLiked);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert the local state on error
      setLiked((prevLiked) => !prevLiked);
    }
  };

  const incrementView = async (searchedQuery) => {
    try {
      handleSearch(searchedQuery);
      handleYouTubeSearch(searchedQuery);
      handleScholarSearch(searchedQuery);
      handleProjectSearch(searchedQuery);
      const response = await fetch(`https://api-sankalp.vercel.app/view/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: state?._id }),
      });

      if (response.ok) {
        setViews((prevViews) => prevViews + 1);
        console.log("View incremented");
        
      } else {
        console.error("Failed to increment view");
      }
    } catch (error) {
      console.error("Error incrementing view:", error);
    }
  };

  const imageStyle = {
    width: "100%", // Adjust this value based on your needs
    height: "400px", // Adjust this value based on your needs
    objectFit: "cover", // This ensures the image covers the entire space
    // borderRadius:"1rem"
  };



  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };


  const modalContentRef = React.createRef();
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [activeTab2, setActiveTab2] = useState("google");
  const handleTabChange2 = (tab) => {
    setActiveTab2(tab);
  };

  const TypingModal = ({ isOpen, onClose, content }) => {
    const [typedContent, setTypedContent] = useState('');
  
    const simulateTyping = useCallback(() => {
      const typingSpeed = 10; // Adjust the typing speed as needed
      const lines = content.split('\n'); // Split content into lines
      let lineIndex = 0;
      let currentIndex = 0;
  
      const typingInterval = setInterval(() => {
        if (currentIndex === lines[lineIndex].length) {
          // Move to the next line when the current line is fully typed
          lineIndex++;
          currentIndex = 0;
  
          if (lineIndex === lines.length) {
            // Stop typing when all lines are typed
            clearInterval(typingInterval);
            return;
          }
        }
  
        setTypedContent(lines.slice(0, lineIndex + 1).join('\n'));
        currentIndex++;
  
      }, typingSpeed);
    }, [content]);
  
    useEffect(() => {
      if (isOpen) {
        simulateTyping();
      }
    }, [isOpen, simulateTyping]);

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Typing Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "800px",
            width: "100%",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            background: "#fff",
            overflow: "none",
            position: "relative",
            height:"350px"
          },
        }}
      >
        <h1 style={{marginLeft:"-750px", marginTop:"0px", marginBottom:"0px", fontFamily:"Montserrat", color:"maroon", fontWeight:"500"}}>Summary</h1>
        <div style={{ maxHeight: "220px", overflowY: "auto" }}>
          {typedContent}
        </div>
        <button onClick={onClose} style={{color:"red", fontWeight:"400"}}>Close</button>
      </Modal>
    );
  };

  
  const content =
    "Your typing animation content goes here...Your typing animation content goes here...Your typing animation content goes here...Your typing animation content goes here...Your typing animation content goes here...Your typing animation content goes here... Your typing animation content goes here... Your typing animation content goes here...";

    const handleOpenModal = () => {
      setIsModalOpen(true);
      setIsLoading(true);
      // Fetch summary using the API when the button is clicked
      fetchSummary(projectDetails?.abstract + ' ' + projectDetails?.description);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    const fetchSummary = async (text) => {
      try {
        const formdata = new FormData();
        formdata.append('key', '675e3dcac0b172c9ec034848f2b9b0b5');
        formdata.append('txt', text);
        formdata.append('sentences', '5'); // Adjust the number of sentences as needed
  
        const requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };
  
        const response = await fetch('https://api.meaningcloud.com/summarization-1.0', requestOptions);
  
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
  
        const responseBody = await response.json();
        const summaryText = responseBody.summary; // Adjust the property based on API response structure
  
        // Update the state with the summary
        setSummary(summaryText);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching summary:', error);
        // Handle error, e.g., show an error message to the user
      }
    };
  const ReadMoreBox = ({ initialText, maxLines }) => {
    const [expanded, setExpanded] = useState(false);

    // Split the text into lines and extract the specified number of lines
    const displayText = initialText
      ?.split("\n")
      .slice(0, expanded ? undefined : maxLines)
      .join("\n");

    const toggleReadMore = () => {
      setExpanded(!expanded);
    };

    return (
      <>    <>
      <header className={`header ${scrolling ? "scrolling" : ""}`}>
        <nav>
          
          <div className={`navbar ${scrolling ? "sticky" : ""}`} style={{zIndex:"101", marginLeft:"-45px"}}>
            <div>
            <ul>
                <li>              <Link to="/">
                  <img
                    src={navbarlogo}
                    alt="logo"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginTop: "-8px",
                      marginBottom: "17px ",
                    }}
                  /></Link>
                </li>
                <div className="navHome">
                  <li>
                    <Link to="/">
                      {" "}
                      <a className="aHome">
                        Home<i className="fas fa-home"></i>
                      </a>{" "}
                    </Link>
                  </li>
            
                  <li>
                    <Link to="/projectlist">
                      {" "}
                      <a className="aHome">
                        Explore Projects<i className="fas fa-home"></i>
                      </a>{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/cglist">
                      {" "}
                      <a className="aHome">
                        Institutions<i className="fas fa-home"></i>
                      </a>{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/crd/dashboard">
                      {" "}
                      <a className="aHome">
                        CRD <i className="fas fa-home"></i>
                      </a>{" "}
                    </Link>
                  </li>
                  <li>
                    {state?.usertype === "admin" || state?.usertype === "university" ? (
                      <Link to="/admin/dashboard">
                        <a className="aHome">
                          Dashboard<i className="fas fa-home"></i>
                        </a>
                      </Link>
                    ) : null}
                  </li>

                  <li>
                    {state?.usertype === "student" && (
                      <Link to="/userdashboard">
                        {" "}
                        <a className="aHome">
                          Dashboard<i className="fas fa-home"></i>
                        </a>{" "}
                      </Link>
                    )}
                  </li>
                  <li>
                    {state?.usertype === "university" && (
                      <Link to="/uploadproject">
                        <a className="aHome">
                          Upload Project<i className="fas fa-home"></i>
                        </a>
                      </Link>
                    )}
                  </li>

                  <li>
                    <Link to="/login">
                      {" "}
                      <a className="aHome" onClick={() => {
                        localStorage.clear();
                        dispatch({ type: "CLEAR" });
                        toast.success("Logout Successfully!!");
                        navigate("/login");
                      }} >
                        Logout<i className="fas fa-home"></i>
                      </a>{" "}
                    </Link>
                  </li>
                </div>

                {/* <button class="header-action-btn" aria-label="Open search" data-search-toggler>
          <ion-icon name="search-outline"></ion-icon>
        </button> */}

                {/* <StyledBadge
  overlap="circular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  variant="dot"
>
  <Avatar alt="Remy Sharp" src={p1} />
</StyledBadge> */}
              </ul>
            </div>
            <div
              className="progress-bar"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </nav>
      </header>
    </>
        <div
          className="box"
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#d8d8d81a",
            marginLeft: "20px !important",
          }}
        >
          <p>{displayText}</p>
          {initialText?.length > maxLines * 10 && (
            <span
              onClick={toggleReadMore}
              className="read-more"
              style={{ cursor: "pointer", color: "blue" }}
            >
              {expanded ? "Read Less" : "Read More"}
            </span>
          )}
        </div>
      </>
    );
  };

  // Import React, useState, useEffect if not already imported

  return (
    <>
      <div className="viewprofile" style={{marginTop:"100px"}}>
        <Grid container>
          <Grid item xs style={{ marginTop: "-200px", marginLeft: "20px",}}>
            <h1
              style={{
                textAlign: "left",
                width: "826px",
              }}
            >
              {projectDetails?.projectTitle}
            </h1>
            <Carousel
      style={{
        width: "900px",
        height: "400px !important",
        marginBottom: "50px",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0, 1)",
        backgroundColor: "#fff",
        position: "relative",
        borderRadius: "1rem",
        overflow: "hidden",
        border: "5px solid #b3938054",
        boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.54)",
      }}
    >
      {/* Display images from projectDetails.images array */}
      {projectDetails?.images &&
        projectDetails?.images?.length > 0 &&
        projectDetails.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              style={imageStyle}
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}

      {/* Display projectDetails.flowchart if available */}
      {projectDetails?.flowchart && (
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={imageStyle}
            src={projectDetails?.flowchart}
            alt="Flowchart"
          />
        </Carousel.Item>
      )}

      {/* Display projectDetails.architecture if available */}
      {projectDetails?.architecture && (
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={imageStyle}
            src={projectDetails?.architecture}
            alt="Architecture"
          />
        </Carousel.Item>
      )}
    </Carousel>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "18px",
                marginTop: "-20px",
                fontWeight: "600",
                marginLeft: "600px",
                marginBottom: "20px",
              }}
            >
              Uploaded Date: {projectDetails?.uploadDate
                            ? new Date(projectDetails.uploadDate).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : ""}
            </p>
            <div className="like-view">
              <button
                style={{
                  height:'50px',
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: liked ? "#3490dc" : "transparent",
                  color: liked ? "#fff" : "#3490dc",
                  fontWeight: "bold",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  border: liked ? "none" : "2px solid #3490dc",
                  marginLeft: "250px",
                  boxShadow: liked
                    ? "inset 10px 20px -8px rgba(0, 0, 0, 0.1)"
                    : "16px 16px 45px -15px rgba(0, 0, 0, 0.54)",
                    marginBottom:"-30px"
                }}
                onClick={toggleLike}
              >
                <FaThumbsUp
                  style={{
                    width: "2.5rem",
                    height: "1.5rem",
                    marginRight: "0.5rem",
                    borderRight: liked ? "2px solid #fff" : "2px solid #3490dc",
                    paddingRight: "10px",
                   
                  }}
                />
                {projectDetails?.likes.length} Likes
              </button>

              {/* Views Button */}
              <button
                className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded views-button"
                disabled
                style={{
                  marginLeft: "200px",
                  marginTop: "-42px",
                  width: "150px",
                  paddingLeft: "10px !important",
                  height: "43px",
                  boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.54)",
                }}
              >
               
               <p style={{fontSize:"18px", marginTop:"px", marginLeft:"0px"}}> 👁 Views: {views} </p>
              </button>
            </div>
            {/* Summarize Button */}
            <button
        className="btn btn-collab"
        id="collabButton"
        style={{
          marginLeft: '-50px',
          height: '60px',
          marginTop: '50px',
          position: 'relative !important',
        }}
        onClick={handleOpenModal}
      >
        {isLoading ? ( // Render the loading spinner or the content
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <>
            <img src={summarize} alt="Summarize" />{' '}
            <p
              style={{
                marginTop: '-35px',
                fontSize: '25px',
                fontFamily: 'Montserrat',
                fontWeight: '500',
              }}
            >
              Summarize
            </p>
          </>
        )}
      </button>

      <TypingModal isOpen={isModalOpen} onClose={handleCloseModal} content={summary } />
            <br />
            <br />
            <br />
            <br />
            {/* Add the TabSwitcher directly */}
            <Stack direction="row" spacing={5}>
              <Paper
                onClick={() => handleTabChange("about")}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === "about" ? "blue" : "transparent",
                  color: activeTab === "about" ? "#fff" : "#000",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                About
              </Paper>
              <Paper
                onClick={() => handleTabChange("images")}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === "images" ? "blue" : "transparent",
                  color: activeTab === "images" ? "#fff" : "#000",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                Images
              </Paper>
              <Paper
                onClick={() => handleTabChange("links")}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === "links" ? "blue" : "transparent",
                  color: activeTab === "links" ? "#fff" : "#000",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                Links
              </Paper>
            </Stack>
            {/* Render Components based on Active Tab */}
            {activeTab === "about" && (
              <>
                <div
                  className="about-info"
                  style={{
                    textAlign: "left",
                    width: "900px",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "left",
                      marginLeft: "0px",
                      fontFamily: "Montserrat",
                      fontSize: "25px",
                      textShadow: "inherit",
                      fontWeight: "bold !important",
                      color: "maroon",
                    }}
                  >
                    Abstract
                  </h2>
                  <hr />
                  <ReadMoreBox
                    initialText={projectDetails?.abstract}
                    maxLines={4}
                  />
                  <br />
                  <h2 style={{ color: "maroon" }}>Description</h2>
                  <hr />
                  <ReadMoreBox
                    initialText={projectDetails?.description}
                    maxLines={4}
                  />
                  <br />

                  <div>
                    <h2 style={{ color: "maroon" }}>Domain</h2>
                    <hr />
                    <div
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "0.375rem",
                        marginBottom: "0.5rem",
                        marginTop: "1rem",
                      }}
                    >
                      <p style={{ textTransform: "capitalize" }}>
                        {projectDetails?.domain}
                      </p>
                    </div>
                    <br />

                    <h2 style={{ color: "maroon" }}>Project Method</h2>
                    <hr />
                    <br />
                    <div
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "0.375rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <p style={{ textTransform: "capitalize" }}>
                        {projectDetails?.projectMethod}
                      </p>
                    </div>
                    <br />

                    <h2 style={{ color: "maroon" }}>Project Type</h2>
                    <hr />
                    <br />
                    <div
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "0.375rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <p style={{ textTransform: "capitalize" }}>
                        {projectDetails?.projectType}
                      </p>
                    </div>
                  </div>

                  <br />

                  <br />
                </div>

                <br />
              </>
            )}

            {activeTab === "images" && (
              <>
                {/* Display the selected content on the right side */}

                <div
                  className="img-card"
                  style={{
                    display: "flex",
                    width: "700px",
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
                  }}
                >
                  {/* Left Side */}
                  <div style={{ flex: 1, padding: "20px" }}>
                    <h4 className="card-title">Flowchart</h4>
                    <p className="card-text">
                      {projectDetails?.projectTitle}.{" "}
                    </p>
                    <br />
                    <Link to={projectDetails?.flowchart}>
                      {" "}
                      <a className="mt-auto btn btn-primary">Read More</a>{" "}
                    </Link>
                  </div>

                  {/* Right Side */}
                  <div style={{ flex: 1, padding: "20px" }}>
                    {/* Carousel start */}
                    <div
                      id="CarouselTest"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      {/* Carousel Items */}
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            className="d-block w-100"
                            src={flowchart}
                            alt="First slide"
                            style={{ height: "200px", borderRadius: "8px" }}
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            className="d-block w-100"
                            src={arch}
                            alt="Second slide"
                            style={{ height: "200px", borderRadius: "8px" }}
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
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#CarouselTest"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                    {/* End of carousel */}
                  </div>
                </div>

                <div
                  className="img-card"
                  style={{
                    display: "flex",
                    width: "700px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginLeft: "80px",
                    marginTop: "50px",
                    backgroundColor: "#fff",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0, 1)",
                    backgroundColor: "#fff",
                    position: "relative",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    border: "5px solid #b3938054",
                    boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.54)",
                    cursor: "pointer",
                  }}
                >
                  {/* Left Side */}
                  <div style={{ flex: 1, padding: "20px" }}>
                    <h4 className="card-title">Architecture</h4>
                    <p className="card-text">
                      {projectDetails?.projectTitle}.{" "}
                    </p>
                    <br />
                    <Link to={projectDetails?.architecture}>
                      {" "}
                      <a className="mt-auto btn btn-primary">Read More</a>{" "}
                    </Link>
                  </div>

                  {/* Right Side */}
                  <div style={{ flex: 1, padding: "20px" }}>
                    {/* Carousel start */}
                    <div
                      id="CarouselTest"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      {/* Carousel Items */}
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            className="d-block w-100"
                            src={flowchart}
                            alt="First slide"
                            style={{ height: "200px", borderRadius: "8px" }}
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            className="d-block w-100"
                            src={arch}
                            alt="Second slide"
                            style={{ height: "200px", borderRadius: "8px" }}
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
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#CarouselTest"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                    {/* End of carousel */}
                  </div>
                </div>
              </>
            )}
            {activeTab === "links" && (
              <>
                <h1
                  style={{
                    float: "left",
                    marginTop: "40px",
                    fontFamily: "Montserrat",
                    
                  }}
                >
                  Links
                </h1>
                <hr />
                <div style={{ marginTop: "100px" }}>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.24)",
                        borderRadius: "10px",
                        marginRight: "20px",
                      }}
                      className="link-hover"
                    >
                      <Link to={projectDetails?.youtubeVideoLink}>
                        <a>
                          <div style={{ padding: "20px", textAlign: "center", width:"400px" }}>
                            <img
                              src={youtube}
                              style={{ width: "80px", height: "80px", marginLeft:"140px" }}
                              alt="YouTube"
                            />
                            <p
                              style={{
                                fontSize: "17px",
                                fontFamily: "Montserrat",
                                fontWeight: "700",
                              }}
                            >
                              Youtube
                            </p>
                            <p
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: "500",
                              }}
                            >
                              {projectDetails?.projectTitle}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div
                      style={{
                        boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.24)",
                        borderRadius: "10px",
                        marginLeft: "20px",
                      }}
                      className="link-hover"
                    >
                      <Link to={projectDetails?.googleDriveLink}>
                        <a>
                          <div style={{ padding: "20px", textAlign: "center", width:"400px" }}>
                            <img
                              src={drive}
                              style={{ width: "80px", height: "80px", marginLeft:"140px" }}
                              alt="Google Drive"
                            />
                            <p
                              style={{
                                fontSize: "17px",
                                fontFamily: "Montserrat",
                                fontWeight: "700",
                              }}
                            >
                              Google Drive
                            </p>
                            <p
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: "500",
                              }}
                            >
                              {projectDetails?.projectTitle}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Grid>

          <Grid item xs style={{ width: "20px" }}></Grid>
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: "-300px" }}
          ></Divider>
          <Grid
            item
            xs
            style={{
              backgroundColor: "#b4b4b41a",
              marginRight: "0px",
              width: "510px !important",
            }}
          >
            <img
              src={projectDetails?.postedBy?.profilePic}
              style={{ marginLeft: "180px", marginTop: "50px", width:"150px" }}
            />
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "20px",
                fontWeight: "600",
                marginLeft: "45px",
              }}
            >
              {projectDetails?.postedBy?.name}
            </p>
            {/* Right Side - Member Cards Section */}
            <div
              className="right-section"
              style={{ marginTop: "100px", marginLeft: "30px" }}
            >
              <h2 style={{ color: "maroon" }}>Mentor</h2>
              <hr />
              <div className="right-section" style={{ marginTop: '20px', marginLeft: '0px' }}>
              {projectDetails?.mentors &&
                projectDetails.mentors.map((member, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            marginBottom: '30px',
            marginRight: "24px",
            border: '3px solid #ccc',
            borderRadius: '8px',
            boxShadow: '8px 8px 25px -5px rgba(0, 0, 0, 0.24)',
            marginTop: '20px',
            backgroundColor: 'white',
          }}
          className="member-card"
        >
          {/* Circular profile image */}
          <img
            src={member?.profilePic}
            alt="Profile"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />

          {/* Details container */}
          <div style={{ flex: '1' }}>
            {/* Mentor name */}
            <strong
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                float: 'left',
              }}
            >
              {member?.name || 'Mentor Name'}
            </strong>
            {/* Add more details as needed */}
          </div>
        </div>
      ))}
    </div>
            </div>
            <h2
              style={{ color: "maroon", marginTop: "40px", marginLeft: "50px" }}
            >
              Team Members
            </h2>
            <hr />
            <div
              className="right-section"
              style={{ marginTop: "20px", marginLeft: "30px" }}
            >
              {projectDetails?.teamMembers &&
                projectDetails.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "24px",
                      padding: "10px", // Padding for the card
                      marginBottom: "30px", // Adjust the spacing between cards
                      border: "3px solid #ccc", // Border color
                      borderRadius: "8px", // Border radius for a rounded look
                      boxShadow: "8px 8px 25px -5px rgba(0, 0, 0, 0.24)", // Box shadow for depth
                      backgroundColor: "white",
                    }}
                    className="member-card"
                  >
                    {/* Circular profile image */}
                    <img
                      src={member?.profilePic}
                      alt="Profile"
                      style={{
                        width: "50px", // Adjust the size of the circular image
                        height: "50px",
                        borderRadius: "50%", // Creates a circular shape
                        marginRight: "10px", // Adjust the spacing between image and details
                      }}
                    />

                    {/* Details container */}
                    <div style={{ flex: "1" }}>
                      {/* Member name */}

                      <Link to={`/viewprofile/${member?._id}`}>
                      <strong
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          float: "left",
                        }}
                      >
                        {member?.name}
                      </strong>
                      </Link>
                      {/* Add more details as needed */}
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <h2 style={{ color: "maroon" }}>Tech Stack</h2>
              <hr />
              <div>
                {projectDetails?.technologyStack &&
                  projectDetails.technologyStack.map((tech, index) => (
                    <div
                      key={index}
                      style={{
                        // display: 'inline-block',
                        padding: "0.5rem 0.5rem",
                        border: "2px solid #ccc",
                        borderRadius: "0.7rem",
                        marginBottom: "0.5rem",
                        margin: "1rem",
                        marginLeft: "2rem",
                        boxShadow: "5px 5px 18px -3px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {/* <img src={html} width="40px" alt={tech.name} /> */}
                      <p
                        style={{
                          marginTop: 5,
                          fontSize: 16,
                          fontFamily: "Montserrat",
                          fontWeight: "500",
                        }}
                      >
                        {tech}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </Grid>
        </Grid>
        <div className="vprofile" style={{marginLeft:'10px'}}>
          {/* Add the TabSwitcher directly */}
          <Stack direction="row" spacing={5}>
            <Paper
              onClick={() => handleTabChange2("google")}
              style={{
                cursor: "pointer",
                backgroundColor:
                  activeTab2 === "google" ? "blue" : "transparent",
                color: activeTab2 === "google" ? "#fff" : "#000",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              Google Search
            </Paper>
            <Paper
              onClick={() => handleTabChange2("youtube")}
              style={{
                cursor: "pointer",
                backgroundColor:
                  activeTab2 === "youtube" ? "#bc1818" : "transparent",
                color: activeTab2 === "youtube" ? "#fff" : "#000",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              Youtube Search
            </Paper>
            <Paper
              onClick={() => handleTabChange2("scholar")}
              style={{
                cursor: "pointer",
                backgroundColor:
                  activeTab2 === "scholar" ? "#005e00" : "transparent",
                color: activeTab2 === "scholar" ? "#fff" : "#000",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              Google Scholar
            </Paper>
           
          </Stack>
          {/* Render Components based on Active Tab */}
          {activeTab2 === "google" && (
            <>
              <div
                style={{
                  maxWidth: "800px",
                  margin: "auto",
                  fontFamily: "Montserrat",
                  padding: "20px",
                  boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.24)",
                  borderRadius: "8px",
                  color: "#333",
                  paddingTop: "0px",
                  marginTop: "-160px",
                  backgroundColor: "aliceblue",    
                  minHeight:"600px"             
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    color: "#4285f4",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "34px",
                    paddingTop:"20px"
                  }}
                >
                  Google Search
                </h1>

                {loading && (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "18px",
                    }}
                  >
                    Loading...
                  </div>
                )}

                {searchResults?.length > 0 ? (
                  <div style={{ marginTop: "20px" }}>
                    <h2
                      style={{
                        color: "#1a0dab",
                        fontSize: "24px",
                        borderBottom: "2px solid #1a0dab",
                        paddingBottom: "10px",
                        marginBottom:"20px"
                      }}
                    >
                      Search Results:
                    </h2>
                    <ul style={{ listStyleType: "none", padding: 10 }}>
                      {searchResults.map((result, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: "20px",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "10px",
                            display: "flex",
                            alignItems: "flex-start",
                            cursor: "pointer",
                          }}
                          onClick={() => window.open(result.link, "_blank")}
                        >
                          <div style={{ flex: 1 }}>
                            <strong
                              style={{ color: "black", fontSize: "18px",marginTop:'40px ' }}
                            >
                              {result.title}
                            </strong>{" "}
                            -{" "}
                            <div
                              style={{ display: "flex", alignItems: "center", }}
                            >
                              <a
                                href={result.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                  fontSize: "16px",
                                  padding: "10px",
                                  border: "1px solid #1a0dab",
                                  borderRadius: "4px",
                                  display: "inline-block",
                                  textAlign: "center",
                                  cursor: "pointer",
                                  backgroundColor: "blue",
                                  fontWeight:"500"
                                }}
                              >
                                Visit Link
                              </a>
                            </div>
                            <p style={{ marginTop: "5px", fontSize: "14px" }}>
                              {result.snippet}
                            </p>
                          </div>
                          {result.image && (
                            <img
                              src={result.image}
                              alt="Result Thumbnail"
                              style={{
                                maxWidth: "150px",
                                height: "auto",
                                marginLeft: "20px",
                                borderRadius: "4px",
                              }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  !loading && (
                    <p
                      style={{
                        marginTop: "20px",
                        textAlign: "center",
                        fontSize: "18px",
                      }}
                    >
                      No search results found.
                    </p>
                  )
                )}
              </div>

              <br />
            </>
          )}

          {activeTab2 === "youtube" && (
            <>
              <div
                style={{
                  maxWidth: "800px",
                  margin: "auto",
                  fontFamily: "Montserrat",
                  padding: "20px",
                  boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.24)",
                  borderRadius: "8px",
                  color: "#333",
                  paddingTop: "0px",
                  marginTop: "-160px",
                  backgroundColor: "#fff0f0",
                  minHeight:"540px" 
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    color: "#bc1818",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "34px",
                    paddingTop:"20px"
                  }}
                >
                  YouTube Search
                </h1>

                {loading && (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      color: "#555",
                      fontSize: "18px",
                    }}
                  >
                    Loading...
                  </div>
                )}

                {youtubeResults?.length > 0 ? (
                  <div style={{ marginTop: "20px" }}>
                    <h2
                      style={{
                        color: "maroon",
                        fontSize: "20px",
                        borderBottom: "2px solid #FF0000",
                        paddingBottom: "10px",
                      }}
                    >
                      Search Results:
                    </h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {youtubeResults.map((result, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: "20px",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "20px",
                          }}
                        >
                          <strong
                            style={{
                              color: "black",
                              fontSize: "18px",
                              marginBottom: "10px",
                              display: "block",
                              float: "left",
                              width: "550px",
                              marginTop:"35px"
                            }}
                          >
                            {result.title}
                          </strong>
                          <a
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "blue",
                              textDecoration: "none",
                              fontSize: "16px",
                              marginBottom: "10px",
                              display: "block",
                              marginLeft: "-200px",
                            }}
                          >
                            {result.link}
                          </a>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={result.thumbnail}
                              alt="Thumbnail"
                              style={{
                                marginLeft: "600px",
                                width: "120px",
                                height: "90px",
                                borderRadius: "4px",
                                marginTop: "-90px",
                              }}
                            />
                            <p style={{ fontSize: "14px", color: "#555" }}>
                              {result.snippet}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  !loading && (
                    <p
                      style={{
                        marginTop: "20px",
                        textAlign: "center",
                        color: "#555",
                        fontSize: "18px",
                      }}
                    >
                      No search results found.
                    </p>
                  )
                )}
              </div>
            </>
          )}
          {activeTab2 === "scholar" && (
            <>
              <div
                style={{
                  maxWidth: "800px",
                  margin: "auto",
                  fontFamily: "Montserrat",
                  padding: "20px",
                  boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.24)",
                  borderRadius: "8px",
                  color: "#333",
                  paddingTop: "0px",
                  marginTop: "-160px",
                  backgroundColor: "#f0fff385",
                  minHeight:"630px" 
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    color: "#005e00",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "24px",
                    fontSize: "34px",
                    paddingTop:"20px"
                  }}
                >
                  Google Scholar Search
                </h1>

                {loading && (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      color: "#555",
                      fontSize: "18px",
                    }}
                  >
                    Loading...
                  </div>
                )}

                {scholarResults?.length > 0 ? (
                  <div style={{ marginTop: "20px" }}>
                    <h2
                      style={{
                        color: "#005e00",
                        fontSize: "20px",
                        borderBottom: "2px solid #005e00",
                        paddingBottom: "10px",
                      }}
                    >
                      Search Results:
                    </h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {scholarResults.map((result, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: "20px",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "20px",
                          }}
                        >
                          <strong
                            style={{
                              color: "black",
                              fontSize: "18px",
                              marginBottom: "10px",
                              display: "block",
                              fontFamily: "Montserrat",
                              paddingTop:"20px"
                            }}
                          >
                            {result.title}
                          </strong>
                          <a
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#4285f4",
                              textDecoration: "none",
                              fontSize: "16px",
                              marginBottom: "10px",
                              display: "block",
                            }}
                          >
                            {result.link}
                          </a>
                          <p
                            style={{
                              marginTop: "5px",
                              fontSize: "14px",
                              color: "#333",
                            }}
                          >
                            {result.snippet}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  !loading && (
                    <p
                      style={{
                        marginTop: "20px",
                        textAlign: "center",
                        color: "#555",
                        fontSize: "18px",
                      }}
                    >
                      No search results found.
                    </p>
                  )
                )}
              </div>
            </>
          )}
           {activeTab2 === "projects" && (
            <>
              <div
                style={{
                  maxWidth: "800px",
                  margin: "auto",
                  fontFamily: "Montserrat",
                  padding: "20px",
                  boxShadow: "16px 16px 45px -15px rgba(0, 0, 0, 0.24)",
                  borderRadius: "8px",
                  color: "#333",
                  paddingTop: "0px",
                  marginTop: "-160px",
                  backgroundColor: "#fff9f0",
                  minHeight:"530px" 
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    color: "orangered",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "34px",
                    paddingTop:"20px"
                  }}
                >
                 Relevant Projects
                </h1>

                {loading && (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      color: "#555",
                      fontSize: "18px",
                    }}
                  >
                    Loading...
                  </div>
                )}

                {youtubeResults?.length > 0 ? (
                  <div style={{ marginTop: "20px" }}>
                    <h2
                      style={{
                        color: "maroon",
                        fontSize: "20px",
                        borderBottom: "2px solid #FF0000",
                        paddingBottom: "10px",
                      }}
                    >
                      Search Results:
                    </h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {youtubeResults.map((result, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: "20px",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "20px",
                          }}
                        >
                          <strong
                            style={{
                              color: "black",
                              fontSize: "18px",
                              marginBottom: "10px",
                              display: "block",
                              float: "left",
                              width: "550px",
                              paddingTop:"20px"
                            }}
                          >
                            {result.title}
                          </strong>
                          <a
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "blue",
                              textDecoration: "none",
                              fontSize: "16px",
                              marginBottom: "10px",
                              display: "block",
                              marginLeft: "-200px",
                            }}
                          >
                            {result.link}
                          </a>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={result.thumbnail}
                              alt="Thumbnail"
                              style={{
                                marginLeft: "600px",
                                width: "120px",
                                height: "90px",
                                borderRadius: "4px",
                                marginTop: "-90px",
                              }}
                            />
                            <p style={{ fontSize: "14px", color: "#555" }}>
                              {result.snippet}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  !loading && (
                    <p
                      style={{
                        marginTop: "20px",
                        textAlign: "center",
                        color: "#555",
                        fontSize: "18px",
                      }}
                    >
                      No search results found.
                    </p>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* <HomeFooter /> */}
    </>
  );
};

export default HomeViewProject;

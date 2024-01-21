import React, { useEffect, useState } from "react";
import { Link, useNavigate,useLocation  } from "react-router-dom";

import tech from "./images/tech-category.svg";
import nontech from "./images/non-tech.svg";
import element from "./images/element.svg";
import HomeHeader from "./Home-Header";
const HomeProjectCategoryList = () => {
  const Rating = 5;

  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < Rating) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    } else {
      stars.push(<i key={i} className="fa-regular fa-star"></i>);
    }
  }
  const [activeIndex, setActiveIndex] = useState(null);
  const [publicProjects, setPublicProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const domainFilter = searchParams.get("domain");
  


  
  
    const fetchPublicProjects = async (filter) => {
        try {
            // Build the filter parameters based on the selected filters
            const filterParams = {
                limit: projectsPerPage,
                page: currentPage,
                search: searchTerm,
                domain: filter || '', // Use an empty string if filter is null
            };
    
            // Construct the URL with filter parameters
            const url = `https://api-sankalp.vercel.app/public-projectslist?${new URLSearchParams(filterParams)}`;
    
            // Fetch the data
            const response = await fetch(url);
            const data = await response.json();
    
            // Update the state with the fetched projects
            setPublicProjects(data.projects);
        } catch (error) {
            console.error("Error fetching public projects:", error);
        }
    };
    
  
  const handleFilter = (filter) => {
    // If the same filter is clicked again, reset the filter
    if (selectedFilter === filter) {
      setCurrentPage(1);
      setSelectedFilter(null);
      fetchPublicProjects(); // Passing null to clear the filter
    } else {
      // If a different filter is selected, set the new filter
      setCurrentPage(1);
      setSelectedFilter(filter);
      fetchPublicProjects(filter);
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  

  

  useEffect(() => {
    // Fetch projects based on domain filter
    fetchPublicProjects(domainFilter);
}, [currentPage, searchTerm, domainFilter]); // Trigger fetch on page change or search term change

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1); // Reset to the first page when searching
    fetchPublicProjects();
  };

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const spacerStyle = {
    height: "5rem",
  };

  
  
  
  

  const navigate = useNavigate();

  return (
    <>
    <HomeHeader/>
    <div style={spacerStyle} />

      <div
        className="main"
        style={{ marginTop: "120px", marginLeft: "10px", width: "100%" }}
      >
        <section
          className="results-header"
          style={{
            marginLeft: "-420px",
            fontFamily: "cursive",
            color: "brown",
            marginTop: "40px",
            marginBottom: "10px",
          }}
        >
        

          <h1 className="ePP">Explore Projects</h1>
        </section>
        <div className="container">
          <div class="sidebar  has-scrollbar" data-mobile-menu>
          <div className="sidebar-category">
  <div className="sidebar-top">
    <h2 className="sidebar-title">Filter</h2>
    <button className="sidebar-close-btn" data-mobile-menu-close-btn>
      <ion-icon name="close-outline"></ion-icon>
    </button>
  </div>

  {/* Tech Filter */}
  <button
    className={`sidebar-accordion-menu ${activeIndex === 0 ? "active" : ""}`}
    data-accordion-btn
    onClick={() => handleAccordionClick(0)}
  >
    <div className="menu-title-flex">
      <img
        src={tech}
        alt="oops"
        width="30"
        height="30"
        className="menu-title-img"
        style={{
          margin: "10px 10px 10px 20px",
        }}
      />
      <p className="menu-title">Tech</p>
    </div>
  </button>
  <ul
    className={`sidebar-submenu-category-list ${
      activeIndex === 0 ? "active" : ""
    }`}
    data-accordion
  >
    <li className="sidebar-submenu-category">
      <button onClick={() => handleFilter("ai-ml")}>
        <p className="product-name">AI/ML</p>
        <data
          value="300"
          className="stock"
          title="Available Stock"
        >
          {/* 300 */}
        </data>
      </button>
    </li>
    <li className="sidebar-submenu-category">
      <button onClick={() => handleFilter("blockchain")}>
        <p className="product-name">Blockchain</p>
        <data
          value="60"
          className="stock"
          title="Available Stock"
        >
          {/* 60 */}
        </data>
      </button>
    </li>
    <li className="sidebar-submenu-category">
      <button onClick={() => handleFilter("cybersecurity")}>
        <p className="product-name">CyberSecurity</p>
        <data
          value="50"
          className="stock"
          title="Available Stock"
        >
          {/* 50 */}
        </data>
      </button>
    </li>
    <li className="sidebar-submenu-category">
      <button onClick={() => handleFilter("ar-vr")}>
        <p className="product-name">AR/VR</p>
        <data
          value="87"
          className="stock"
          title="Available Stock"
        >
          {/* 87 */}
        </data>
      </button>
    </li>
  </ul>

  <br />

  {/* Non-Tech Filter */}
  <button
    className={`sidebar-accordion-menu ${
      activeIndex === 1 ? "active" : ""
    }`}
    data-accordion-btn
    onClick={() => handleAccordionClick(1)}
  >
    <div className="menu-title-flex">
      <img
        src={nontech}
        alt="wait"
        width="30"
        height="30"
        className="menu-title-img"
        style={{
          margin: "10px 10px 10px 20px",
        }}
      />
      <p className="menu-title">Non-Tech</p>
    </div>
  </button>
  <ul
    className={`sidebar-submenu-category-list ${
      activeIndex === 1 ? "active" : ""
    }`}
    data-accordion
  >
    <li className="sidebar-submenu-category">
      <button onClick={() => handleFilter("mba")}>
        <p className="product-name">MBA</p>
        <data
          value="300"
          className="stock"
          title="Available Stock"
        >
          {/* 300 */}
        </data>
      </button>
    </li>
    <li className="sidebar-submenu-category">
      <button onClick={() => handleFilter("gd")}>
        <p className="product-name">Graphic Design</p>
        <data
          value="60"
          className="stock"
          title="Available Stock"
        >
          {/* 60 */}
        </data>
      </button>
    </li>
   
  </ul>

  <br />

  
</div>


            <img
              src={element}
              width="200"
              height="200"
              style={{ float: "left", opacity: "0.7" }}
            />
          </div>
          <section
            className="results-section results--grid"
            style={{ position: "relative", zIndex: "1", width: "1100px" }}
          >
            <>
              {" "}
              <input
                type="text"
                placeholder="Search projects"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to the first page when searching
                }}
                style={{
                  padding: "0px 0px 0px 14px",
                  fontSize: "16px",
                  borderRadius: "1rem",
                  border: "1px solid rgb(204, 204, 204)",
                  width: "31rem",
                  height: "51px",
                  margin: "47px -17px 0px 214px",
                }}
              />
              <button className="btn-search" onClick={handleSearchSubmit}>
                Search
              </button>

              
              {publicProjects.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "18px",
                  }}
                >
                  No results found
                </p>
              ) : (
                publicProjects.map((project) => (
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
                ))
              )}
            </>

            <div className="pagination">
              <button
                className="btn-page"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <p style={{ marginLeft: "-37px" }}> Previous </p>
              </button>
              <span className="pNum">{currentPage}</span>
              <button
                className="btn-page"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={publicProjects.length < projectsPerPage}
              >
                <p style={{ marginLeft: "-23px" }}> Next </p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomeProjectCategoryList;

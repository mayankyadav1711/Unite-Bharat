import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import logo from "./images/79.png";
import { Link, useNavigate } from "react-router-dom";
import unite from "./images/unitenew.svg";
import p1 from "./images/60111.png";
import logo2 from "./images/jharkhand.png";
import navbarlogo from "./images/Sankalp.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
// import Badge from '@mui/material/Badge';
// import Avatar from '@mui/material/Avatar';

const HomeHeader = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();



  const [scrolling, setScrolling] = useState(false);
  const [hideHeaderPart1, setHideHeaderPart1] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolling(scrollTop > 0);

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

  return (
    <>
      <header className={`header ${scrolling ? "scrolling" : ""}`}>
        <nav>
          <div className={`header-part1 ${hideHeaderPart1 ? "hidden" : ""}`}>
            <div className="logo-and-text">
              <img src={logo} alt="logo" style={{ marginLeft:"30px"}}/>
              <h4>
              <img src={unite} style={{width:"500px", marginLeft:"300px"}}/>
              </h4>


              <img
                src={logo2}
                alt="logo"
                style={{ width: "80px", height: "80px", marginLeft: "350px" }}
              />





            </div>
          </div>
          <div className={`navbar ${scrolling ? "sticky" : ""}`}>
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
                      <Link to="/admin/dashboard">
                        {" "}
                        <a className="aHome">
                          Analytics<i className="fas fa-home"></i>
                        </a>{" "}
                      </Link>
                    )}
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
  );
};

export default HomeHeader;

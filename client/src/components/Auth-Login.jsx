import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

import loginimage1 from "./images/login-first.webp";

import loginuser from "./images/60111.png";
import abcd from "./images/welcome.svg";
import Swiper from "swiper";
import "swiper/css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthHeader from "./Auth-Header";
import techn from "./images/techn.png";

const AuthLogin = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchToLogin = () => {
    setFormType("login");
  };

  const switchToSignup = () => {
    setFormType("signup");
  };
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      pagination: ".swiper-pagination",
      paginationClickable: true,
      parallax: true,
      speed: 600,
      loop: true,
      grabCursor: true,

      // Add autoplay configuration
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform validation (you can add more validation rules as needed)
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    // Create a JSON payload to send in the request body
    const payload = {
      email,
      password,
    };
    console.log(payload);
    // Make an API call to your server for user login
    fetch("https://api-sankalp.vercel.app/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        if (data.token && data.user) {
          // Login successful, save the token to localStorage or a state management system for future authenticated requests
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          toast.success("Successfully SignedIn!!", {
            className: "custom-toast",
          });
          navigate("/"); // Redirect to the dashboard page after successful login
        } else {
          toast.error(
            data.error || "Invalid email or password. Please try again.",
            {
              className: "custom-toast",
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
        alert("An error occurred during login. Please try again later.");
      });
  };

  return (
    <>
      <AuthHeader />
      <div class="login-container">
        <div class="login-form">
          <div class="login-form-inner">
            <div className="wrapper" style={{ height: "570px" }}>
              <div className="logo-login">
                <img
                  src={loginuser} // replace "your_image_path.jpg" with the actual path to your image
                  alt="Logo"
                  height="64"
                  width="64"
                />
              </div>

              <h1 className="login-heading">Login</h1>
              {/* <div className="title-text">
    <div className={`title ${formType === 'login' ? 'login' : 'signup'}`}>
      {formType === 'login' ? 'User ' : 'University'}
    </div>
  </div> */}
              <div className="form-container">
                <div className="slide-controls">
                  <input
                    type="radio"
                    name="slide"
                    id="login"
                    checked={formType === "login"}
                    onChange={switchToLogin}
                  />
                  <input
                    type="radio"
                    name="slide"
                    id="signup"
                    checked={formType === "signup"}
                    onChange={switchToSignup}
                  />
                  <label
                    htmlFor="login"
                    className={`slide login ${
                      formType === "login" ? "active" : ""
                    }`}
                  >
                    User
                  </label>
                  <label
                    htmlFor="signup"
                    className={`slide signup ${
                      formType === "signup" ? "active" : ""
                    }`}
                  >
                    University
                  </label>
                  <div className="slider-tab"></div>
                </div>
                <div className="form-inner">
                  {formType === "login" && (
                    <form onSubmit={handleLogin} className="login">
                      <div className="field">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          maxLength="50"
                          className="box"
                        />
                      </div>
                      <div className="field">
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          maxLength="20"
                          className="box"
                        />
                      </div>
                      <div className="pass-link" style={{ marginTop: "20px" }}>
                        <Link to="/forgot">
                          <a>Forgot password?</a>{" "}
                        </Link>
                      </div>
                      <div className="field btn">
                        <div className="btn-layer"></div>
                        <input
                          type="submit"
                          className="login-submit"
                          value="Login"
                          style={{
                            alignItems: "center",
                            textAlign: "center",
                            marginLeft: "0rem",
                            background:
                              "linear-gradient(45deg, #FFA07A, #FF6347)",
                            marginTop: "-7px",
                            paddingTop: "3px",
                            fontFamily: "Montserrat",
                            fontSize: "20px",
                            paddingLeft: "10px",
                          }}
                        />
                      </div>
                      <div className="signup-link">
                        Not a member?{" "}
                        <Link to="/register">
                          <a>Signup now</a>
                        </Link>
                      </div>
                    </form>
                  )}

                  {formType === "signup" && (
                    <form onSubmit={handleLogin} className="signup">
                      <div
                        className="field"
                        style={{
                          width: "364px",
                          marginLeft: "-202px",
                          height: "40px",
                        }}
                      >
                        <select
                          className="dropdown"
                          required
                          defaultValue=""
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            border: "1px solid lightgrey",
                            borderRadius: "5px",
                            padding: "8px",
                          }}
                        >
                          <option value="" disabled>
                            --AISHE Code--
                          </option>
                          <option value="">-- Select a university --</option>

                          <option value="C-322 - LDRP Institute of Technology and Research, Gandhinagar">
                            C-322 - LDRP Institute of Technology and Research,
                            Gandhinagar
                          </option>

                          <option value="U-0749 - MANIPAL UNIVERSITY, JAIPUR">
                            U-0749 - Manipal University, Jaipur
                          </option>

                          <option value="U-0273 - Indian Institute of Technology, Indore">
                            U-0273 - Indian Institute of Technology, Indore
                          </option>
                          <option value="U-0146 - Nirma University, Ahmedabad">
                            U-0146 - Nirma University, Ahmedabad
                          </option>
                          <option value="U-0064 - Indian Institute of Technology, Patna">
                            U-0064 - Indian Institute of Technology, Patna
                          </option>
                          <option value="U-0141 - Kadi Sarva Vishwavidyalaya, Gandihnagar">
                            U-0141 - Kadi Sarva Vishwavidyalaya, Gandihnagar
                          </option>
                          <option value="U-0147 - PANDIT DEENDAYAL ENERGY UNIVERSITY, GANDHI NAGAR">
                            U-0147 - Pandit Deendayal Energy University,
                            Gandhinagar
                          </option>
                          <option value="U-0763 - PARUL UNIVERSITY">
                            U-0763 - Parul University
                          </option>
                          <option value="U-0127 - CEPT University">
                            U-0127 - CEPT University
                          </option>
                          <option value="U-0100 - Indian Institute of Technology, Delhi">
                            U-0100 - Indian Institute of Technology, Delhi
                          </option>
                          <option value="U-1016 - INDIAN INSTITUTE OF MANAGEMENT AHMEDABAD">
                            U-1016 - Indian Institute Of Management Ahmedabad
                          </option>

                          <option value="U-0129 - Dharamsinh Desai University">
                            U-0129 - Dharamsinh Desai University
                          </option>
                          <option value="U-0130 - Dhirubhai Ambani Institute of Information & Communication Technology, Gandhi Nagar">
                            U-0130 - Dhirubhai Ambani Institute of Information &
                            Communication Technology, Gandhinagar
                          </option>
                          <option value="U-1015 - INDIAN INSTITUTE OF MANAGEMENT ROHTAK">
                            U-1015 - Indian Institute Of Management Rohtak{" "}
                          </option>
                          <option value="U-0204 - Central University of Jharkhand, Ranchi">
                            U-0204 - Central University of Jharkhand, Ranchi
                          </option>
                          <option value="U-0109 - Jawaharlal Nehru University">
                            U-0109 - Jawaharlal Nehru University
                          </option>
                          <option value="U-1206 - ADANI UNIVERSITY">
                            U-1206 - Adani UNIVERSITY
                          </option>
                          <option value="U-0306 - Indian Institute of Technology, Mumbai">
                            U-0306 - Indian Institute of Technology, Mumbai
                          </option>
                          <option value="U-0051 - Dibrugarh University, Dibrugarh">
                            U-0051 - Dibrugarh University, Dibrugarh
                          </option>
                          <option value="U-1045 - NATIONAL INSTITUTE OF DESIGN, ASSAM">
                            U-1045 - National Institute Of Design, Assam
                          </option>
                          <option value="U-0050 - Assam University, Silchar">
                            U-0050 - Assam University, Silchar
                          </option>
                          <option value="U-0260 - University of Kerala, Thiruvananthapuram">
                            U-0260 - University of Kerala, Thiruvananthapuram
                          </option>
                          <option value="U-0027 - Osmania University, Hyderabad">
                            U-0027 - Osmania University, Hyderabad
                          </option>
                        </select>
                      </div>

                      <div className="field">
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          maxLength="20"
                          className="box"
                        />
                      </div>

                      <div className="field btn">
                        <div className="btn-layer"></div>
                        <input
                          type="submit"
                          className="login-submit"
                          value="Login"
                          style={{
                            alignItems: "center",
                            textAlign: "center",
                            marginLeft: "0rem",
                            background:
                              "linear-gradient(45deg, #FFA07A, #FF6347)",
                            marginTop: "7px",
                            paddingTop: "3px",
                            fontFamily: "Montserrat",
                            fontSize: "20px",
                            paddingLeft: "10px",
                          }}
                        />
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="onboarding">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide color-1">
                <div class="slide-image">
                  <img
                    src={abcd}
                    loading="lazy"
                    alt=""
                    style={{ width: "300px" }}
                  />
                </div>
                <div class="slide-content">
                  <h2
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "maroon",
                    }}
                  >
                    Welcome to Sankalp!
                  </h2>
                  <p
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Unlock a world of possibilities and turn your ideas into
                    reality.
                  </p>
                </div>
              </div>
              <div class="swiper-slide color-1">
                <div class="slide-image">
                  <img src={loginimage1} loading="lazy" alt="" />
                </div>
                <div class="slide-content">
                  <h2
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "maroon",
                    }}
                  >
                    Collaborate and Innovate Together
                  </h2>
                  <p
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Find exciting collaboration opportunities to contribute your
                    skills and expertise to ongoing projects.
                  </p>
                </div>
              </div>
              <div class="swiper-slide color-1">
                <div class="slide-image">
                  <img src={techn} loading="lazy" alt="" />
                </div>
                <div class="slide-content">
                  <h2
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "maroon",
                    }}
                  >
                    Revolutionizing Technology and Inspiring Creativity
                  </h2>
                  <p
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Explore innovative tech projects that push the boundaries of
                    what's possible in the digital world. Discover impactful
                    non-tech projects that showcase creativity, collaboration,
                    and diverse skills.
                  </p>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLogin;

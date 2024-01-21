import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimage1 from "./images/login-first.webp";
import techn from "./images/techn.png";
import loginuser from "./images/60111.png";
import abcd from "./images/login-third.png";
import Swiper from "swiper";
import "swiper/css";
import logo from "./images/79.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthHeader from "./Auth-Header";

const AuthSignup = () => {
  const [formType, setFormType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("student");
  const [university, setUniversity] = useState(""); // Add college state
  
  const navigate = useNavigate();

 
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      pagination: ".swiper-pagination",
      paginationClickable: true,
      parallax: true,
      speed: 600,
      autoplay: {
        delay: 3000, // Set autoplay delay to 3 seconds
      },
      loop: true,
      grabCursor: true,
    });

    return () => {
      // Cleanup Swiper instance when component unmounts
      swiper.destroy();
    };
  }, []);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUniversityChange = (e) => {
    setUniversity(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("function-called")
    const payload = {
      name,
      email,
      password,
      usertype,
      university,
    };
  
    try {
      const response = await fetch("https://api-sankalp.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      // Handle the response from the server
      console.log(data);
      if (
        data.message ===
        "OTP sent successfully. Please check your email to verify your account."
      ) {
        toast.success(
          "Registration successful! Please check your email for OTP verification."
        );
        navigate(`/otp?email=${encodeURIComponent(email)}`); // Redirect to the OTP verification page after successful registration
      } else {
        toast.error(
          data.error || "Registration failed. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };
  
  

  return (
    <>
     <AuthHeader/>
      <div class="login-container">
        <div class="login-form">
          <div class="login-form-inner">
          

            <div className="wrapper">
            <div className="logo-login">
              <img
                src={loginuser} // replace "your_image_path.jpg" with the actual path to your image
                alt="Logo"
                height="64"
                width="64"
              />
            </div>

            <h1
              className="login-heading"
              style={{
                fontWeight: "bold",
                margin: "auto",
                textAlign: "center",
              }}
            >
              Signup
            </h1>
              <div className="form-container">
                <div className="form-inner">
                  {formType === "login" && (
                    <form  className="login">      
                                    <div className="field" >
                                    <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              required
              style={{backgroundColor:"#fff8ed"}}
            />
                      </div>
                      <div className="field">
                      <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required
              style={{backgroundColor:"#fff8ed"}}
            />
                      </div>
                      <div className="field">
                      <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              
            />
                      </div>
                      <div className="field">
                        <select
                          className="dropdown"
                          required
                          defaultValue=""
                          value={university}
              onChange={handleUniversityChange}
                          style={{
                            border: "1px solid lightgrey",
                            borderRadius: "5px",
                            padding: "1rem",
                            marginLeft: "-4rem",
                            width:"290px"
                          }}
                        >
                         
                          <option
                            value=""
                            selected="selected"
                            placeholder="-- Select a university --"
                            disabled
                          >
                            -- Select a university --
                          </option>

                          

                          
  <option value="C-322 - LDRP Institute of Technology and Research, Gandhinagar">
    C-322 - LDRP Institute of Technology and Research, Gandhinagar
  </option>

  <option value="U-0749 - Manipal University, Jaipur">
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

  <option value="U-0141 - Kadi Sarva Vishwavidyalaya, Gandhinagar">
    U-0141 - Kadi Sarva Vishwavidyalaya, Gandhinagar
  </option>

  <option value="U-0147 - Pandit Deendayal Energy University, Gandhinagar">
    U-0147 - Pandit Deendayal Energy University, Gandhinagar
  </option>

  <option value="U-0763 - Parul University">
    U-0763 - Parul University
  </option>

  <option value="U-0127 - CEPT University">
    U-0127 - CEPT University
  </option>

  <option value="U-0100 - Indian Institute of Technology, Delhi">
    U-0100 - Indian Institute of Technology, Delhi
  </option>

  <option value="U-1016 - Indian Institute Of Management Ahmedabad">
    U-1016 - Indian Institute Of Management Ahmedabad
  </option>

  <option value="U-0763 - Parul University">
    U-0763 - Parul University
  </option>

  <option value="U-0129 - Dharamsinh Desai University">
    U-0129 - Dharamsinh Desai University
  </option>

  <option value="U-0130 - Dhirubhai Ambani Institute of Information & Communication Technology, Gandhi Nagar">
    U-0130 - Dhirubhai Ambani Institute of Information & Communication Technology, Gandhinagar
  </option>

  <option value="U-1015 - Indian Institute Of Management Rohtak">
    U-1015 - Indian Institute Of Management Rohtak
  </option>

  <option value="U-0204 - Central University of Jharkhand, Ranchi">
    U-0204 - Central University of Jharkhand, Ranchi
  </option>

  <option value="U-0109 - Jawaharlal Nehru University">
    U-0109 - Jawaharlal Nehru University
  </option>

  <option value="U-1206 - Adani University">
    U-1206 - Adani University
  </option>

  <option value="U-0306 - Indian Institute of Technology, Mumbai">
    U-0306 - Indian Institute of Technology, Mumbai
  </option>

  <option value="U-0051 - Dibrugarh University, Dibrugarh">
    U-0051 - Dibrugarh University, Dibrugarh
  </option>

  <option value="U-1045 - National Institute Of Design, Assam">
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
                      <div className="signupwrapp">
                      <div className="wrapper">
                      <input
  type="radio"
  name="select"
  id="option-1"
  value="student"
  checked={usertype === "student"}
  onChange={handleUserTypeChange}
/>
<label htmlFor="option-1" className="option option-1">
  <div className="dot"></div>
  <span>Student</span>
</label>

<input
  type="radio"
  name="select"
  id="option-2"
  value="faculty"
  checked={usertype === "faculty"}
  onChange={handleUserTypeChange}
/>
<label htmlFor="option-2" className="option option-2">
  <div className="dot"></div>
  <span>Faculty</span>
</label>
</div>

                      </div>
                      <div className="pass-link">
                        <a href="/forgot">Forgot password?</a>
                      </div>
                      <div className="field btn">
                        <div className="btn-layer"></div>
                        <button
    type="submit"
    className="login-submit"
    onClick={handleSignup}
    style={{
      alignItems: "center",
      textAlign: "center",
      marginLeft: "0rem",
      background:
        "linear-gradient(45deg, #FFA07A, #FF6347)",
      marginTop: "0px",
      paddingTop: "5px",
      paddingBottom:"5px",
      fontFamily: "Montserrat",
      fontSize: "20px",
      paddingLeft: "10px",
      color:"white"
    }}
  >
    OTP
  </button>
                      
                      </div>
                    </form>
                  )}

                  {formType === "signup" && (
                    <form action="#" className="signup"></form>
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
          <img src={abcd} loading="lazy" alt="" style={{width:"300px"}}/>
          </div>
          <div class="slide-content">
          <h2 style={{fontFamily:"Montserrat", fontSize:"20px", fontWeight:"600", color:"maroon"}}>Welcome to Sankalp!</h2>
   <p style={{fontFamily:"Montserrat", fontSize:"18px", fontWeight:"500"}}>Unlock a world of possibilities and turn your ideas into reality.</p>
          </div>
        </div>
        <div class="swiper-slide color-1">
          <div class="slide-image">
            <img src={loginimage1} loading="lazy" alt="" />
          </div>
          <div class="slide-content">
          <h2 style={{fontFamily:"Montserrat", fontSize:"20px", fontWeight:"600", color:"maroon"}}>Collaborate and Innovate Together</h2>
        <p style={{fontFamily:"Montserrat", fontSize:"18px", fontWeight:"500"}}>Find exciting collaboration opportunities to contribute your skills and expertise to ongoing projects.</p>
          </div>
        </div>
        <div class="swiper-slide color-1">
          <div class="slide-image">
            <img src={techn} loading="lazy" alt="" />
          </div>
          <div class="slide-content">
          <h2 style={{fontFamily:"Montserrat", fontSize:"20px", fontWeight:"600", color:"maroon"}}>Revolutionizing Technology and Inspiring Creativity</h2>
        <p style={{fontFamily:"Montserrat", fontSize:"18px", fontWeight:"500"}}>Explore innovative tech projects that push the boundaries of what's possible in the digital world. Discover impactful non-tech projects that showcase creativity, collaboration, and diverse skills.</p>
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

export default AuthSignup;

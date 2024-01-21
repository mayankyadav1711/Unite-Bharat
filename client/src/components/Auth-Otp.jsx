import React, {  useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginimage1 from "./images/login-first.webp";
import techn from "./images/techn.png";
import abcd from "./images/login-third.png";
import loginuser from "./images/60111.png";
import Swiper from "swiper";
import "swiper/css";
import logo from "./images/79.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthHeader from "./Auth-Header"

const AuthOtp = () => {
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("email") || "";

  const [otp, setOtp] = useState("");

  const handleOTPVerification = (e) => {
    e.preventDefault();
    console.log("userEmail:", userEmail);
    console.log("otp:", otp);
    // Make an API call to your server for OTP verification
    fetch("https://api-sankalp.vercel.app/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        if (data.token && data.user) {
          // OTP verification successful, save the token to localStorage or a state management system for future authenticated requests
          localStorage.setItem("token", data.token);
          toast.success("OTP Verified! Please Login.", {
            className: "custom-toast", 
          });
          navigate("/login"); // Redirect to the dashboard page after successful OTP verification
        } else {
          toast.error(data.error || "Invalid OTP. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error occurred during OTP verification:", error);
        alert("An error occurred during OTP verification. Please try again later.");
      });
  };

  return (
    <>
     <AuthHeader/>
      <div class="login-container">
        <div class="login-form">
          <div class="login-form-inner">
           

            <div className="wrapper">
              <div className="form-container">
              <div className="logo-login" >
              <img
                src={loginuser} // replace "your_image_path.jpg" with the actual path to your image
                alt="Logo"
                height="64"
                // style={{marginLeft:'30px',marginTop:'30px'}}
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
              OTP
            </h1>
                <div className="form-inner">

                    <form onSubmit={handleOTPVerification} className="login">
                      <div className="field">
                        <input
                          class="input"
                          type="text"
  name="otp"
  placeholder="Enter OTP"
  pattern="^[0-9\s]{6}$"
  value={otp}
  onChange={(e) => setOtp(e.target.value)}
  required
  minlength="6"
  maxlength="6"
                        />
                      </div>

                      <div className="pass-link" style={{marginTop:'30px'}}>
                        <p>Didn't get OTP?</p>
                        <Link to="/resend">
                          {" "}
                          <a class="btn">Resend OTP</a>{" "}
                        </Link>
                      </div>
                      <div className="field btn">
                        <div className="btn-layer"></div>
                        <input
                          type="submit"
                          className="login-submit"
                          value="Signup"
                          style={{
                            textAlign: 'center',
    marginLeft: '0rem',
    background: 'linear-gradient(45deg, rgb(255, 160, 122), rgb(255, 99, 71))',
    marginTop: '-7px',
    paddingTop: '3px',
    fontFamily: 'Montserrat',
    fontSize: '20px',
    paddingLeft: '10px',
                            alignItems: "center",
                            textAlign: "center",
                            marginLeft: "0rem",
                          }}
                        />{" "}
                      </div>
                    </form>
                  
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

export default AuthOtp;

import React, {  useEffect, useState } from "react";
import {  useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginimage1 from "./images/login-first.webp";
import loginuser from "./images/60111.png";
import abcd from "./images/login-third.png";
import Swiper from "swiper";
import "swiper/css";
import techn from "./images/techn.png";
import logo from "./images/79.png";
import AuthHeader from "./Auth-Header"


const AuthReset = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log('Token:', token);
  
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
  
      fetch('https://api-sankalp.vercel.app/new-password', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success(data.message, {
              className: "custom-toast", 
            });
            navigate('/login')
            // Do something after successful password reset if needed
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
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

    

    return (
        <>
           <AuthHeader/>
            <div class="login-container">
                <div class="login-form">
                    <div class="login-form-inner">
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
                            Reset Password
                        </h1>

                        <div className="wrapper">
                            <div className="form-container">
                                <div className="form-inner">
                                  
                                        <form onSubmit={handleFormSubmit} className="login">
                                            <div className="field">
                                            <p>Enter Password</p>

                                            <input
        type="password"
        name="pass"
        placeholder="Enter password"
        required
        maxLength="50"
        className="box"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>Confirm Password </p>
      <input
        type="password"
        name="cpass"
        placeholder="Confirm password"
        required
        maxLength="20"
        className="box"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
                                            </div>

                                            <div className="field btn">
                                                <div className="btn-layer"></div>
                                                <input
                                                    type="submit"
                                                    className="login-submit"
                                                    value="Reset Password"
                                                    style={{
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

export default AuthReset;

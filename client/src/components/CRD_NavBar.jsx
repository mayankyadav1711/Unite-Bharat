import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Link, useNavigate } from "react-router-dom";
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <>

  </>
);

const CRD_NavBar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-4s md:ml-6 md:mr-6 relative" style={{marginLeft:'900px'}}>

     
       
  <div
    className="flex items-center gap-2 cursor-pointer p-1 rounded-lg ml-auto" // Use ml-auto to push it to the right
    onClick={() => handleClick('')}
  
  >

<button className="flex  text-20 hover:text-black" 
      
      onClick={() => {
                    // localStorage.clear();
                    // dispatch({ type: "CLEAR" });
                    // toast.success("Logout Successfully!!");
                    navigate("/");
                  }}style={{
                    alignItems: 'center',
  textAlign: 'center',
  marginLeft: '0rem',
  background: 'linear-gradient(45deg, rgb(255, 160, 122), rgb(255, 99, 71))',
  marginTop: '-30px',
  paddingTop: '6px',
  fontFamily: 'Montserrat',
  fontSize: '20px',
  fontWeight:'550',
  color:'white',
  paddingLeft: '10px',

  }}>
        Home
      </button>
    {/* <img
      className="rounded-full w-8 h-8"
      src={avatar}
      alt="user-profile"
    /> */}
    <p>
      {/* <span className="text-gray-400 text-14"></span>{' '} */}
     
    </p>
    {/* <MdKeyboardArrowDown className="text-gray-400 text-14" /> */}
  </div>



       
     
        {/* {isClicked.userProfile && (<UserProfile />)} */}
      </div>
  
  );
};

export default CRD_NavBar;
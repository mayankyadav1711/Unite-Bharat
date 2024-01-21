import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Link, useNavigate } from "react-router-dom";
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);

  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <>
       <div>
      <p style={{ color: "black", cursor: 'pointer' }} onClick={handleNotificationClick}>Invitations</p>
      {showNotification && <Notification onClose={handleCloseNotification} />}
    </div>
    <div className="flex justify-between p-2 fixed" style={{marginLeft:'810px'}}>

      
  <div
    className="flex items-center gap-2 r p-1 rounded-lg ml-auto" // Use ml-auto to push it to the right
    
  
  >
  
    {/* <img
      className="rounded-full w-8 h-8"
      src={avatar}
      alt="user-profile"
    /> */}
    <p>
      {/* <span className="text-gray-400 text-14"></span>{' '} */}
      <div classname="navbar-BTN" style={{    display: 'flex',
    marginLeft: '-107px',
    gap: '24px',
    justifyContent: 'space-between', }}>
       {state?.usertype==="admin" && (
      <>
        <Link to="https://analytics.google.com/analytics/web/?authuser=9#/p419413133/reports/intelligenthome" target="_blank">
          <button
            className="flex text-20 hover:text-black"
            style={{
              alignItems: 'center',
              textAlign: 'center',
              marginLeft: '0rem',
              background: 'linear-gradient(45deg, rgb(255, 160, 122), rgb(255, 99, 71))',
              marginTop: '-30px',
              fontWeight: '550',
              color: 'white',
              paddingTop: '6px',
              fontFamily: 'Montserrat',
              fontSize: '20px',
              paddingLeft: '5px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></svg>
            Analytics
          </button>
        </Link>

        <Link to="https://clarity.microsoft.com/projects/view/k44m8552e0/impressions?date=Last%203%20days" target="_blank">
          <button
            className="flex text-20 hover:text-black"
            style={{
              alignItems: 'center',
              textAlign: 'center',
              marginLeft: '0rem',
              background: 'linear-gradient(45deg, rgb(255, 160, 122), rgb(255, 99, 71))',
              marginTop: '-30px',
              fontWeight: '550',
              color: 'white',
              paddingTop: '6px',
              fontFamily: 'Montserrat',
              fontSize: '20px',
              paddingLeft: '10px',
            }}
          >
            Clarity
          </button>
        </Link>
      </>
    )}
      <button className="flex  text-20 hover:text-black" 
      
      onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "CLEAR" });
                    toast.success("Logout Successfully!!");
                    navigate("/login");
                  }}style={{
                    alignItems: 'center',
  textAlign: 'center',
  marginLeft: '0rem',
  background: 'linear-gradient(45deg, rgb(255, 160, 122), rgb(255, 99, 71))',
  marginTop: '-30px',
  paddingTop: '6px',
  fontWeight:'550',
  color:'white',
  fontFamily: 'Montserrat',
  fontSize: '20px',
  paddingLeft: '10px',

  }}>
        Logout
      </button></div>
    </p>
    {/* <MdKeyboardArrowDown className="text-gray-400 text-14" /> */}
  </div>



       
        {isClicked.notification && (<Notification />)}
        {/* {isClicked.userProfile && (<UserProfile />)} */}
      </div>
  </>
  );
};

export default Navbar;

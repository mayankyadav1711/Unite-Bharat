import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const chatData = [
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/University%20LOGO%2Fldrp%20logo_HD.png?alt=media&token=1cf60479-c9b0-427d-b444-7858c21137ee',
    message: "Invitation!",
    desc: "Check out ",
    time: "9:08 AM",
  }
];

const Notification = () => {
  const { currentColor } = useStateContext();
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    // Set the URL you want to navigate to based on the selected notification
    // Example: "/accept" or "/notifications/accept"
    const notificationUrl = "/accept"; // Change this URL as needed
    setSelectedNotification({ ...notification, url: notificationUrl });
  };

  const handleClose = () => {
    setSelectedNotification(null);
  };
  

  return (
    <div className="nav-item absolute right-8 md:right-36 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-80" style={{ right: "56rem", zIndex: "9999", width:"250px" }}>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
          <button
  type="button"
  className="text-white text-xs rounded p-1 px-2 bg-orange-theme"
  onClick={() => {
    handleNotificationClick(chatData[0]); // Assuming you want to simulate a click on the first notification
    handleClose();
  }}
>
  1 New
</button>

        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5" style={{ marginTop: "-200px" }}>
        {chatData?.map((item, index) => (
           <div
           key={index}
           className="flex items-center leading-8 gap-5 border-b-1 border-color p-3 cursor-pointer"
           style={{marginTop:"-4.3rem"}}
         >
           {/* Use Link component if the notification has a URL */}
           {selectedNotification && selectedNotification.url ? (
             <Link to={selectedNotification.url} className="flex items-center gap-5">
               <img
                 className="rounded-full h-10 w-10"
                 src={item.image}
                 alt={item.message}
               />
               <div className="flex flex-col">
                 <p className="font-semibold dark:text-gray-200">{item.message}</p>
                 <p className="text-gray-500 text-sm dark:text-gray-400">
                   {" "}
                   {item.desc}{" "}
                 </p>
               </div>
             </Link>
           ) : (
             // Use regular div if no URL is set
             <div onClick={() => handleNotificationClick(item)} className="flex items-center gap-5">
               <img
                 className="rounded-full h-10 w-10"
                 src={item.image}
                 alt={item.message}
               />
               <div className="flex flex-col">
                 <p className="font-semibold dark:text-gray-200">{item.message}</p>
                 <p className="text-gray-500 text-sm dark:text-gray-400">
                   {" "}
                   {item.desc}{" "}
                 </p>
               </div>
             </div>
           )}
         </div>
       ))}
        {selectedNotification && (
          <div className="popup">
            {/* ... Your existing code for the popup */}
            <button
  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
  onClick={handleClose}
>
  <MdOutlineCancel size={24} />
</button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;

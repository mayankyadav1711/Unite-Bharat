import React, { useState, useEffect, useCallback, useContext } from "react";
import Drawer from '@mui/material/Drawer';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import event from "./images/event.svg"

const buttonStyle = {
  position: 'fixed',
  top: '50%',
  right: 0,
  transform: 'translateY(-50%)',
  zIndex: 9999, // Set a high zIndex value
};
const eventBarStyle = {
  width: '400px',
  position: 'fixed',
  top: 0,
  right: open ? '0' : '-400px', // Move out of the viewport when closed
  height: '100%',
  backgroundColor: '#fff', // Set your desired background color
  zIndex: 9998,
  transition: 'right 0.3s ease', // Add transition for smooth movement
};

const paperStyle = {
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '4px',
};

const cardStyle = {
  boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
  marginTop: '10px',
  boxSizing: 'border-box',
  borderRadius: '2px',
  backgroundClip: 'padding-box',
  minHeight: '400px',
  width: '350px',
  marginLeft: '25px',
};

export default function TemporaryDrawer() {


  const [open, setOpen] = React.useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    fetch("https://api-sankalp.vercel.app/event-forms") // Change the URL to match your API endpoint
      .then((response) => response.json())
      .then((data) => {
        const reversedData = data.reverse();
        setEvents(reversedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });

    /* Totally unnecessary swiping gestures*/
    var gestureZone = document;
    var touchstartX = 0,
      touchstartY = 0;
    gestureZone.addEventListener(
      "touchstart",
      function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      },
      false
    );

    gestureZone.addEventListener(
      "touchend",
      function (event) {
        var touchendX = event.changedTouches[0].screenX;
        var touchendY = event.changedTouches[0].screenY;
        handleGesture(touchendX, touchendY);
      },
      false
    );

    function handleGesture(touchendX, touchendY) {
      var acceptableYTravel =
        touchendY - touchstartY < 15 && touchendY - touchstartY > -15;

      var swiped = "swiped: ";
      if (touchendX < touchstartX && acceptableYTravel) {
        openSidebar();
        console.log(swiped + "left!");
      }
      if (touchendX > touchstartX && acceptableYTravel) {
        closeSidebar();
        console.log(swiped + "right!");
      }
    }
    function openSidebar() {
      $("#event-sidebar").addClass("move-to-left");
      $("#event-sidebar-tab").addClass("move-to-left");
      $(".arrow").addClass("active");
    }
    function closeSidebar() {
      $("#event-sidebar").removeClass("move-to-left");

      $("#event-sidebar-tab").removeClass("move-to-left");
      $(".arrow").removeClass("active");
    }
    /* End of totally unnecessary swiping gestures*/
  }, []);
  useEffect(() => {
    // Filter events based on searchInput
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        event.description.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchInput, events]);
  function formatTimestamp(eventTimestamp) {
    const eventDate = new Date(eventTimestamp);
    const currentDate = new Date();

    const timeDiff = currentDate - eventDate;

    if (timeDiff < 60 * 1000) {
      // Less than 1 minute
      return `${Math.floor(timeDiff / 1000)} seconds ago`;
    } else if (timeDiff < 60 * 60 * 1000) {
      // Less than 1 hour
      return `${Math.floor(timeDiff / (60 * 1000))} minutes ago`;
    } else if (timeDiff < 24 * 60 * 60 * 1000) {
      // Less than 24 hours
      return `${Math.floor(timeDiff / (60 * 60 * 1000))} hours ago`;
    } else if (eventDate.toDateString() === currentDate.toDateString()) {
      return "Today";
    } else if (
      eventDate.toDateString() ===
      new Date(currentDate - 24 * 60 * 60 * 1000).toDateString()
    ) {
      return "Yesterday";
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return eventDate.toLocaleDateString("en-US", options);
    }
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer} style={buttonStyle}>
        <img src={event} style={{width:"50px"}}/>
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <div className="eventbar" style={{ width: "400px", marginTop: "20px", backdropFilter: "blur(12px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          {/* Add the TabSwitcher directly */}
     
     

         
         
          
           <form className="event-searchbar">
                    <input
                      type="text"
                      name="search_box"
                      required
                      placeholder="Search Event"
                      maxLength="100"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      style={{outline:"none"}}
                    />
                    <button type="submit" className="fa fa-search "></button>
                  </form>
                  <h2 className="demo-title">Current Events</h2>
                  {filteredEvents.length === 0 ? (
                    <p className="event-nofound">No events found.</p>
                  ) : (
                    filteredEvents.map((event) => (
                      <>
           <div style={{
             boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
             marginTop: '10px',
             boxSizing: 'border-box',
             borderRadius: '2px',
             backgroundClip: 'padding-box',
             width:'350px',
             marginLeft:"25px",
             height:"auto"
           }}>
             <div style={{
               position: 'relative',
               overflow: 'hidden',
             }}>
               <img style={{
                 borderRadius: '2px 2px 0 0',
                 backgroundClip: 'padding-box',
                 position: 'relative',
                 zIndex: '-1',
                 transition: 'transform 0.3s ease', // Add transition for smooth scaling
                 ":hover": {
                   transform: 'scale(1.1) !important', // Scale the image on hover
                 },
               }} src={event?.profilePic} alt="Card" />
 
              
             </div>
 
             <div style={{
               padding: '16px',
               borderRadius: '0 0 2px 2px',
               backgroundClip: 'padding-box',
               boxSizing: 'border-box',
               backdropFilter:"blur(12px)",
               marginTop:"-50px",
            
             }}>
                <span style={{
                 position: 'absolute',
                 // bottom: '0',
                 marginLeft:"-150px",
                
               }} className="card-title">Updated: {formatTimestamp(event.timestamp)}</span>
               <h2 style={{marginTop:"40px"}}>{event?.name} </h2>
               <p style={{
                 margin: '0',
                 color: 'inherit',
               }}>{event?.description}</p>
             </div>
 
             <div style={{
               borderTop: '1px solid rgba(160, 160, 160, 0.2)',
               padding: '16px',
             }}>
 
            <Link to={event?.link}>  <a style={{
                 color: '#ffab40',
                 marginRight: '16px',
                 transition: 'color 0.3s ease',
                 textTransform: 'uppercase',
               }}  target="_blank" rel="noopener noreferrer">Link</a> </Link> 
             </div>
           </div>
           <br />
          
      
         </>
          
          ))
        )}
          
       
      
     </div>
      </Drawer>
    </div>
  );
}

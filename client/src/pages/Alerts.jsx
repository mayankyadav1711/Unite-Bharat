import React, { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Alerts = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [profilePic, setProfilepic] = useState("");
  const [link, setlink] = useState("");
  const [extra, setExtra] = useState("");


 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      date,
      profilePic,
      link,
      // Assuming you store user ID in local storage
    };

    try {
      const response = await fetch("https://api-sankalp.vercel.app/event-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful contribution
        toast.success("Submitted Sucessfully"); // Redirect to a success page or handle it according to your needs
      } else {
        // Handle error
        toast.error("Error");
        console.error("Event Form failed.");
      }
    } catch (error) {
      toast.error(error);
      console.error("Error submitting contribution:", error);
    }
  };

  return (
    <div style={{ width: '800px', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', backgroundColor: '#fff7ed', height: '600px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Event Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventName" style={{float:"left"}}>Event Name</label>
          <input
            type="text"
            id="eventName"
            placeholder='Enter Event Name'
            onChange={(e) => settitle(e.target.value)}
            value={title}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', boxShadow: "0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0.19)" }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventDescription" style={{float:"left"}}>Event Description</label>
          <textarea
            id="eventDescription"
            placeholder='Enter Event Description'
            onChange={(e) => setdescription(e.target.value)}
            value={description}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', marginLeft:"0px", backgroundColor:"#fff" }}
            required
          ></textarea>
        </div>
        <div style={{display:"flex", gap:"82px"}}>
          <div style={{ marginBottom: '15px', width: "44%" }}>
            <label htmlFor="image" style={{ float: "left" }}>Image Link</label>
            <input
               type="url"
              id="image"
              accept="image/*"
              onChange={(e) => setProfilepic(e.target.value)}
            value={profilePic}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none',marginLeft:"0px", backgroundColor:"#fff",  boxShadow: "0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0.19)" }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px', width:"44%" }}>
            <label htmlFor="link" style={{float:"left"}}>Event Link</label>
            <input
              type="text"
              id="link"
              placeholder='Enter Event Link'
              onChange={(e) => setlink(e.target.value)}
            value={link}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', boxShadow: "0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0.19)" }}
              required
            />
          </div>
        </div>
        <div style={{display:"flex", gap:"82px"}}>
          <div style={{ marginBottom: '15px', width:"44%" }}>
            <label htmlFor="uploadDate" style={{float:"left"}}>Upload Date</label>
            <input
              type="date"
              id="uploadDate"
              onChange={(e) => setdate(e.target.value)}
            value={date}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', marginLeft:"0px", backgroundColor:"#fff" }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px', width:"44%" }}>
            <label htmlFor="extra" style={{float:"left"}}>Extra</label>
            <input
              type="text"
              id="extra"
              placeholder=''
              onChange={(e) => setExtra(e.target.value)}
            value={extra}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', boxShadow: "0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0.19)" }}
              required
            />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ backgroundColor: '#007BFF', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Alerts;

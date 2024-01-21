import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import Modal from 'react-modal';
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mongoose from "mongoose";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import HomeHeader from "./Home-Header";

const HomeAccept = () => {
  const [numOfTeamMembers, setNumOfTeamMembers] = useState(1);
  const navigate = useNavigate();

  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [teamLeader, setTeamLeader] = useState('');
  const [selectedTeamMember, setSelectedTeamMember] = useState('');
  // const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [teamRole, setTeamRole] = useState('');
//   const [teamRole, setTeamRole] = useState('');
const [selectedTeamLead, setSelectedTeamLead] = useState('');

const teamLeads = ['Team Lead 1', 'Team Lead 2'];

const handleTeamLeadChange = (e) => {
  setSelectedTeamLead(e.target.value);
};

  // Function to handle adding a team member to the stack
  const handleAddTeamMember = () => {
    if (selectedTeamMember) {
      setSelectedTeamMembers((prevMembers) => [...prevMembers, selectedTeamMember]);
      setSelectedTeamMember('');
    }
  };

  // Function to handle removing a team member from the stack
  const handleRemoveTeamMember = (index) => {
    const newTeamMembers = [...selectedTeamMembers];
    newTeamMembers.splice(index, 1);
    setSelectedTeamMembers(newTeamMembers);
  };

  const handleNumOfTeamMembersChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumOfTeamMembers(count);
    // Ensure selectedTeamMembers and teamLeader are within the new count
    setSelectedTeamMembers((prevMembers) => prevMembers.slice(0, count));
    setTeamLeader((prevLeader) => (count < prevLeader ? '' : prevLeader));
  };

  const handleTeamMemberChange = (e, index) => {
    const newSelectedMembers = [...selectedTeamMembers];
    newSelectedMembers[index] = e.target.value;
    setSelectedTeamMembers(newSelectedMembers);
  };

  const handleTeamLeaderChange = (e) => {
    setTeamLeader(e.target.value);
  };

  const [selectedResources, setSelectedResources] = useState([]);
  const [currentResource, setCurrentResource] = useState('');

  const handleAddResource = () => {
    if (currentResource) {
      setSelectedResources((prevResources) => [...prevResources, currentResource]);
      setCurrentResource('');
    }
  };

  const handleRemoveResource = (index) => {
    const newResources = [...selectedResources];
    newResources.splice(index, 1);
    setSelectedResources(newResources);
  };

  const spacerStyle = {
    height: "2rem",
  };
 
  const handlesubmit = (e) =>{
    e.preventDefault();
    toast.success("Form submitted Successfully");
    navigate('/');
  }
   return (
     <>
     <HomeHeader/>
     <div style={spacerStyle} />

     
      <div className="invitation-form">
      <h2>Acceptance Form</h2>
      <form style={{ fontFamily:"Montserrat", color:"black"}}>
       {/* Section 1 */}
    
       <div className="form-section">
      <label>Resources Granted</label>
      <select
        style={{ width: '97%', marginLeft: '25px', display: 'flex', backgroundColor: 'white' }}
        value={currentResource}
        onChange={(e) => setCurrentResource(e.target.value)}
      >
        <option value="" disabled>
          --Select Resource--
        </option>
        <option value="Supercomputers">Supercomputers</option>
        <option value="Diffracton">X-ray Diffracton</option>
        <option value="Turbine">Miniature Wind Turbine</option>
        {/* Add more options as needed */}
      </select>
      <button
        type="button"
        onClick={handleAddResource}
        disabled={!currentResource}
        style={{
          background: 'linear-gradient(45deg, #FFA07A, #FF6347)',
        }}
      >
        Add
      </button>
    </div>

    <div className="form-section" style={{ width: '97%', backgroundColor: '#fff8ed', marginLeft: '30px', boxShadow: '0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0', padding: '10px', paddingLeft: '0px !important', paddingBottom: '0px', display: 'flex', gap: '20px' }}>
      <label style={{ paddingBottom: '0px !important', fontWeight: '400' }}>Selected Resources</label>
      {selectedResources.map((resource, index) => (
        <div key={index} className="selected-member">
          <span>{`Resource ${index + 1}: ${resource}`}</span>
          <button type="button" onClick={() => handleRemoveResource(index)} style={{ height: '15px', background: 'transparent', color: 'red' }}>
            X
          </button>
        </div>
      ))}
    </div>

      <div className="form-section">
  <label>Other Departments Involvement (if any)</label>
  <select style={{width:"97%", marginLeft:"25px"}}>
    <option value="" disabled selected>--Select Department--</option>
    <option value="CE/IT">CE/IT</option>
    <option value="Mechanical">Mechanical</option>
    <option value="Civil">Civil</option>
    {/* Add more options as needed */}
  </select>
</div>
        <div className="form-section">
          <label>CV</label>
          <input type="file" accept=".pdf, .doc, .docx" required />
        </div>

        {/* Section 2 */}
        <div className="form-section">
  <label>Mentor Name</label>
  <select style={{width:"97%", marginLeft:"25px"}}>
    <option value="" disabled selected>--Select Name--</option>
    <option value="Name1">Name 1</option>
    <option value="Name2">Name 2</option>
    <option value="Name3">Name 3</option>
    {/* Add more options as needed */}
  </select>
</div>
              <div className="form-section">
  <label>Mentor Designation</label>
  <select style={{width:"97%", marginLeft:"25px"}}>
    <option value="" disabled selected>--Select Designation--</option>
    <option value="Designation1">Designation 1</option>
    <option value="Designation2">Designation 2</option>
    <option value="Designation13">Designation 3</option>
    {/* Add more options as needed */}
  </select>
</div>
             <div className="form-section">
  <label>Mentor Department</label>
  <select style={{width:"97%", marginLeft:"25px"}}>
    <option value="" disabled selected>--Select Department--</option>
    <option value="CE/IT">CE/IT</option>
    <option value="Mechanical">Mechanical</option>
    <option value="Civil">Civil</option>
    {/* Add more options as needed */}
  </select>
</div>


              {/* Section 3 */}
        <div className="form-section">
          <label>No. of Team Members</label>
          <input
            type="number"
            min="1"
            value={numOfTeamMembers}
            onChange={handleNumOfTeamMembersChange}
            required
          />
        </div>

        <div className="form-section">
          <label>Add Team Members</label>
          <select
            style={{ width: '97%', marginLeft: '25px', display:'flex', backgroundColor:'white' }}
            value={selectedTeamMember}
            onChange={(e) => setSelectedTeamMember(e.target.value)}
          >
            <option value="" disabled>--Select Name--</option>
            <option value="Harsh Sonaiya">Harsh Sonaiya</option>
            <option value="Darshit Sojitra">Darshit Sojitra</option>
            <option value="Mayank Yadav">Mayank Yadav</option>
            <option value="Vihar Talaviya">Vihar Talaviya</option>
            <option value="Divya Kaurani">Divya Kaurani</option>
            <option value="Aastha Suthar">Aastha Suthar</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
            {/* Add more options as needed */}
          </select>
          <button
            type="button"
            onClick={handleAddTeamMember}
            disabled={!selectedTeamMember}
            style={{
              background:"linear-gradient(45deg, #FFA07A, #FF6347)"
            }}
          >
            Add
          </button>
        </div>

        <div className="form-section" style={{ width:"97%", backgroundColor:"#fff8ed", marginLeft:"30px", boxShadow:"0 4px 8px 0 rgba(169, 152, 130, 0.2), 0 6px 20px 0 rgba(122, 115, 89, 0", padding:"10px", paddingLeft:"0px !important", paddingBottom:"0px", display:"flex", gap:"20px"}}>
          <label style={{paddingBottom:"0px !important", fontWeight:"400"}}>Selected Team Members</label>
          {selectedTeamMembers.map((member, index) => (
            <div key={index} className="selected-member">
              <span>{`Member ${index + 1}: ${member}`}</span>
              <button type="button" onClick={() => handleRemoveTeamMember(index)} style={{height:"15px", background:"transparent", color:"red"}}>
                X
              </button>
            </div>
          ))}
        </div>

        <div className="form-section">
          <label>Team Leader</label>
          <select
            style={{ width: '97%', marginLeft: '25px' }}
            value={teamLeader}
            onChange={handleTeamLeaderChange}
          >
            {selectedTeamMembers.map((member, index) => (
              <option key={index} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        <div className="form-section">
  <label>PI/CoPI</label>
  <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>
          Team Lead:
          <select value={selectedTeamLead} onChange={handleTeamLeadChange}>
            <option value="">--Select Team Lead--</option>
            {teamLeads.map((lead) => (
              <option key={lead} value={lead}>
                {lead}
              </option>
            ))}
          </select>
        </label>
      </div>



      {selectedTeamLead && (
        <div>
          <label>PI: {selectedTeamLead}</label>
          <br />
          <label>
            Co-PI:{' '}
            {teamLeads
              .filter((lead) => lead !== selectedTeamLead)
              .map((remainingLead) => (
                <span key={remainingLead}>{remainingLead}</span>
              ))}
          </label>
        </div>
      )}
</div>

        {/* Submit Button */}
        <div className="form-section">
        <button type="submit" onClick={handlesubmit}>Submit</button>
    </div>
      </form>
    </div>
  
    
  </>
  );
};

export default HomeAccept;

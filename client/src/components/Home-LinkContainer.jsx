import React from "react";
import LinkedIN from "./images/linkedin.svg";
import github from "./images/github.png";
import youtube from "./images/youtube.svg";
import drive from "./images/drive.svg"

const HomeLinkContainer = () => {
  return (
    <>
        <div className="link-container">
  <h1 className="heading">Links</h1>
  <div className="links">
    <a href="#">
      <div className="invitation-details">
        <img src={LinkedIN} style={{width:"80px", height:"80px"}}/>
        <p className="bold">
          LinkedIN{" "}
        </p>
        <p>E-CHALLAN COLLECTION SYSEM</p>
      </div>
    </a>
  </div>
  <div className="links">
    <a href="#">
      <div className="invitation-details">
        <img src={github} style={{width:"80px", height:"80px"}}/>
        <p className="bold">
          Github{" "}
        </p>
        <p>E-CHALLAN COLLECTION SYSEM</p>
      </div>
    </a>
  </div>
  <div className="links">
    <a href="#">
      <div className="invitation-details">
        <img src={youtube} style={{width:"80px", height:"80px"}}/>
        <p className="bold">
         Youtube{" "}
        </p>
        <p>E-CHALLAN COLLECTION SYSEM</p>
      </div>
    </a>
  </div>
  <div className="links">
    <a href="#">
      <div className="invitation-details">
        <img src={drive} style={{width:"80px", height:"80px"}}/>
        <p className="bold">
     Google Drive{" "}
        </p>
        <p>E-CHALLAN COLLECTION SYSEM</p>
      </div>
    </a>
  </div>
</div>

    </>
  );
};

export default HomeLinkContainer;

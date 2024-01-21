import React from "react";
import { Link, useNavigate,useLocation  } from "react-router-dom";

import aiml from "./images/aiml.png";
import android from "./images/android.png";
import wd from "./images/wd.png";
import gd from "./images/photoshop.png";
import cd from "./images/cd.png";
import biology from "./images/biology.svg";
import da from "./images/da.png";
import cs from "./images/cs.png"
import arvr from "./images/arvr.png"
import blockchain from "./images/blockchain.png"

const HomeProjectCategory = () => {
 

  return (
    <>
      
<div className="svg-icons">
{/* <!-- Add your SVG icons here --> */}

<div className="categories" style={{marginTop:"-500px"}}>
    <h2 className="explore" style={{fontFamily:"Montserrat"}}>Explore Wide Categories Of Projects</h2>
<div className="categories__bg">

</div>
<div className="inner">
    <ul>
    <li>
    <Link to={`/projectcategorylist?domain=mba`} title="MBA Projects">
        <a  title="MBA Projects">
            <img src="https://cdn01.alison-static.net/public/html/site/img/homepage/categories/business.svg" width="40" height="34" title="Business Projects" alt="Business Icon" />
            <h4>MBA</h4>
            <span className="course-amount arrow-icon"> Explore 
                <i className="fas fa-arrow-right"></i>
        </span>
    </a>
    </Link>
</li>
    <li>
    <Link to={`/projectcategorylist?domain=ai-ml`} title="AI/ML Projects">
        <a  title="AI/ML Projects">
            <img src={aiml} width="34" height="36" title="AI/ML Projects" alt="AI/ML Icon" />
            <h4>AI/ML</h4>
            <span className="course-amount arrow-icon"> Explore 
                    <i className="fas fa-arrow-right"></i>
        </span>
    </a>
    </Link>
</li>
<li>
<Link to={`/projectcategorylist?domain=blockchain`} title="Blockchain Projects">
    <a  title="Blockchain Projects">
        <img className="" src={blockchain} width="40" height="40" title="Blockchain" alt="Blockchain Icon" />
        <h4>Blockchain</h4>
        <span className="course-amount arrow-icon"> Explore 
            <i className="fas fa-arrow-right"></i>
    </span>
    </a>
    </Link>
    </li>
    <li>
    <Link to={`/projectcategorylist?domain=web-development`} title="Web Development Projects">
        <a  title="CyberSecurity Projects">
            <img src={wd} width="94" height="71" title=" Web Development Projects" alt="Web Development Icon" /> 
            <h4>Web Development</h4>
            <span className="course-amount arrow-icon"> Explore 
                <i className="fas fa-arrow-right"></i>
        </span>
        </a>
        </Link>
    </li>
        <li>
        <Link to={`/projectcategorylist?domain=mobile-apps`} title="App Development Projects">
            <a  title="App Development Projects">
                <img src={android} width="40" height="40" title="App Development Projects" alt="App Development Icon" />
                <h4>App Development</h4>
                <span className="course-amount arrow-icon"> Explore 
                    <i className="fas fa-arrow-right"></i>
            </span>
        </a>
        </Link>
    </li>
        <li>
        <Link to={`/projectcategorylist?domain=cybersecurity`} title="CyberSecurity Projects">
            <a  title="Mech Projects">
                <img src={cs} width="64" height="66" title="CyberSecurity Projects" alt="mech Icon" />
                <h4>Cybersecurity</h4>
                <span className="course-amount arrow-icon"> Explore
                        <i className="fas fa-arrow-right"></i>
            </span>
        </a>
        </Link>
    </li>
<li>
<Link to={`/projectcategorylist?domain=ar-vr`} title="AR/VR Projects">
    <a href="https://alison.com/courses/management" title="AR/VR Projects">
        <img src={arvr} width="36" height="36" title="AR/VR Projects" alt="AR/VR Icon" />
        <h4>AR/VR</h4>
        <span className="course-amount arrow-icon"> Explore 
            <i className="fas fa-arrow-right"></i>
    </span>
</a>
</Link>
</li>
<li>
<Link to={`/projectcategorylist?domain=gd`} title="MBA Projects">
<a  title="Personal Development Projects">
    <img src={gd} width="126" height="66" title="Graphic Design Projects" alt="Management Icon"/>
    <h4>Graphic Design</h4>
    <span className="course-amount arrow-icon"> Explore 
        <i className="fas fa-arrow-right"></i>
</span>
</a>
</Link>
</li>
<li>
<Link to={`/projectcategorylist?domain=cd`} title="Compiler Design">
<a  title="Sales &amp; Compiler Design">
        <img src={cd} width="72" height="68" title="Compiler &amp; Design Projects" alt="Compiler &amp; Design Icon" />
        <h4>Compiler Design</h4>
        <span className="course-amount arrow-icon"> Explore 
            <i className="fas fa-arrow-right"></i>
    </span>
</a>
</Link>
</li>
<li>
<Link to={`/projectcategorylist?domain=biotechnology`} title="Biotechnology Projects">
<a  title="Engineering &amp; Biotechnology Projects">
    <img src={biology} width="60" height="64" title="Biotechnology &amp; Biomedical Projects" alt="Engineering &amp; Construction Icon" />
    <h4 className="bio">Biotechnology/<br />Biomedical</h4>
    <span className="course-amount arrow-icon"> Explore 
        <i className="fas fa-arrow-right"></i>
</span>
</a>
</Link>
</li>
<li>
<Link to={`/projectcategorylist?domain=data-analytics`} title="MBA Projects">
<a  title="Teaching &amp; Academics Projects">
<img src={da} width="84" height="68" title="Teaching &amp; Academics Projects" alt="Teaching &amp; Academics Icon" />
<h4>Data Analytics</h4>
<span className="course-amount arrow-icon"> Explore 
    <i className="fas fa-arrow-right"></i>
</span>
</a>
</Link>
</li>
<li>
<Link to={`/projectcategorylist?domain=non-tech`} title="Non-Tech Projects">
    <a  title="Non-Tech Projects">
        <img className="" src="https://cdn01.alison-static.net/public/html/site/img/homepage/categories/english.svg" width="34" height="29" title="" alt="English Icon" />
        <h4>Non-Tech</h4>
        <span className="course-amount arrow-icon"> Explore 
            <i className="fas fa-arrow-right"></i>
    </span>
    </a>
    </Link>
    </li>
    </ul>
    </div>
</div>
       
</div> 
    </>
  );
};

export default HomeProjectCategory;



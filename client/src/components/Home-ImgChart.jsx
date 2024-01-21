import React, { useState, useEffect } from "react";
// import { Doughnut } from 'react-chartjs-2/dist/react-chartjs-2.esm';
// import "./imgchart.css"; // Import the CSS file where the styles are defined
import flowchart from "./images/flowchart.png";
import arch from "./images/architecture.png"

const HomeImgChart = () => {
  const [selectedOption, setSelectedOption] = useState("flowchart");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };


  return (
    <div className="imgchart">
      <div className="imgchart-left-panel">
        <div
          className={`imgchart-option ${
            selectedOption === "flowchart" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("flowchart")}
        >
          Flowchart
        </div>
        <div
          className={`imgchart-option ${
            selectedOption === "systemArchitecture" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("systemArchitecture")}
        >
          System Architecture
        </div>
       
      </div>

      <div className="imgchart-right-panel">
        {/* Display the selected content on the right side */}
        {selectedOption === "flowchart" && (
  <div className="card">
    <div className="row">
      <div className="col-md-7 px-3">
        <div className="card-block px-6">
          <h4 className="card-title">Flowchart</h4>
          <p className="card-text">
            Supercomputers are general-purpose computers that function at the highest operational rate or peak performance for computers.   </p>
          <br />
          <a href="#" className="mt-auto btn btn-primary">
            Read More
          </a>
        </div>
      </div>
      {/* Carousel start */}
      <div className="col-md-5">
        <div id="CarouselTest" className="carousel slide" data-ride="carousel">
          {/* Carousel Indicators */}
          <ol className="carousel-indicators">
            <li data-target="#CarouselTest" data-slide-to={0} className="active" />
            <li data-target="#CarouselTest" data-slide-to={1} />
            <li data-target="#CarouselTest" data-slide-to={2} />
          </ol>

          {/* Carousel Items */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={flowchart}
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={arch}
                alt="Second slide"
              />
            </div>
          
          </div>

          {/* Carousel Controls */}
          <a
            className="carousel-control-prev"
            href="#CarouselTest"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#CarouselTest"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      {/* End of carousel */}
    </div>
  </div>
)}

        {selectedOption === "systemArchitecture" && (
            <div className="card">
    <div className="row">
      <div className="col-md-7 px-3">
        <div className="card-block px-6">
          <h4 className="card-title">Architecture</h4>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adip incididunt ut  labore et   dolor.  Ut enim ad minim veniam et al 
             </p>
          <br />
          <a href="#" className="mt-auto btn btn-primary">
            Read More
          </a>
        </div>
      </div>
      {/* Carousel start */}
      <div className="col-md-5">
        <div id="CarouselTest" className="carousel slide" data-ride="carousel">
          {/* Carousel Indicators */}
          <ol className="carousel-indicators">
            <li data-target="#CarouselTest" data-slide-to={0} className="active" />
            <li data-target="#CarouselTest" data-slide-to={1} />
            <li data-target="#CarouselTest" data-slide-to={2} />
          </ol>

          {/* Carousel Items */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={flowchart}
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={arch}
                alt="Second slide"
              />
            </div>
           
          </div>

          {/* Carousel Controls */}
          <a
            className="carousel-control-prev"
            href="#CarouselTest"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#CarouselTest"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      {/* End of carousel */}
    </div>
  </div>
        )}
       
      </div>
    </div>
  );
};

export default HomeImgChart;

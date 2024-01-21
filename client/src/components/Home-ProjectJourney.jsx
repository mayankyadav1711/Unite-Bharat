import React from "react";
import idea from "./images/idea.svg"
import discuss from "./images/discuss.svg"
import team from "./images/team.svg"
import a1 from "./images/1.svg";
import a2 from "./images/2.svg";
const HomeProjectJourney = () => {
 
  return (
    <>
      
      <section className="svg-container" style={{ position: "relative", marginTop:"20px"}}>
       <div className="header-design">
         <div className="listar-map-button">
           <div className="listar-map-button-text" style={{ display: 'inline-block', opacity: 1, cursor:"pointer",zIndex:"10000000000" }}>
             <span className="icon-map2">Project Journey</span>
           </div>
         </div>
         <div className="footer-wave"></div>
       </div>
       <div className="pset">
         <div className="container">
           <div className="row listar-feature-items">
             <div
               className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
               data-aos="fade-zoom-in"
               data-aos-group="features"
               data-line-height="25.2px"
             >
               <div className="listar-feature-item listar-feature-has-link">
                 <a href="#" target="_blank"></a>
                 <div className="listar-feature-item-inner">
                   <div className="listar-feature-right-border"></div>
                   <div className="listar-feature-block-content-wrapper">
                     <div className="listar-feature-icon-wrapper">
                       <div className="listar-feature-icon-inner">
                         <div>
                           <img
                             alt="Businesses"
                             className="listar-image-icon"
                             src={idea}
                           />
                         </div>
                       </div>
                     </div>
                     <div className="listar-feature-content-wrapper" style={{ paddingTop: 0 }}>
                       <div className="listar-feature-item-title listar-feature-counter-added">
                         <span>
                           <span>01</span> Ideation
                         </span>
                       </div>
                       <div className="listar-feature-item-excerpt">
                      Creativity knows no bounds. It's the birthplace of visionary project ideas, where innovation and imagination converge to solve challenges and inspire meaningful change.
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
             </div>
     
     
             <div
               className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
               data-aos="fade-zoom-in"
               data-aos-group="features"
               data-line-height="25.2px"
             >
               <div className="listar-feature-item listar-feature-has-link">
                 <a href="#" target="_blank"></a>
                 <div className="listar-feature-item-inner">
                   <div className="listar-feature-right-border"></div>
                   <div className="listar-feature-block-content-wrapper">
                     <div className="listar-feature-icon-wrapper">
                       <div className="listar-feature-icon-inner">
                         <div>
                           <img
                             alt="Customers"
                             className="listar-image-icon"
                             src={discuss}
                           />
                         </div>
                       </div>
                     </div>
                     <div className="listar-feature-content-wrapper" style={{ paddingTop: 0 }}>
                       <div className="listar-feature-item-title listar-feature-counter-added">
                         <span>
                           <span>02</span> Planning and Discussion
                         </span>
                       </div>
                       <div className="listar-feature-item-excerpt">
                       Collaborate, strategize, and refine project blueprints, ensuring a clear path forward. It's where ideas evolve into actionable plans, setting the stage for project success.
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
             </div>
     
     
     
             <div
               className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
               data-aos="fade-zoom-in"
               data-aos-group="features"
               data-line-height="25.2px"
             >
               <div className="listar-feature-item listar-feature-has-link">
                 <a href="#" target="_blank"></a>
                 <div className="listar-feature-item-inner">
                   <div className="listar-feature-right-border"></div>
                   <div className="listar-feature-block-content-wrapper">
                     <div className="listar-feature-icon-wrapper">
                       <div className="listar-feature-icon-inner">
                         <div>
                           <img
                             alt="Feedback"
                             className="listar-image-icon"
                             src={team}
                           />
                         </div>
                       </div>
                     </div>
                     <div className="listar-feature-content-wrapper" style={{ paddingTop: 0 }}>
                       <div className="listar-feature-item-title listar-feature-counter-added">
                         <span>
                           <span>03</span> Implementation and Development
                         </span>
                       </div>
                       <div className="listar-feature-item-excerpt">
                       Implementation and Development is where your project comes to life. With dedication and precision, you turn plans into reality, creating a transformative solution that reflects your vision and expertise.
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
             </div>
             
           </div>
         </div>
       </div>
     </section>
      <div style={{display:"flex"}}>
      <img
    src={a2}
    style={{
      float: "left",
      width: "758px",
      marginTop: "-800px",
      opacity: "0.3",
      marginBottom: "-10px",
    }}
  />
  <img
    src={a1}
    style={{
      float: "right",
      width: "758px",
      marginTop: "-800px",
      opacity: "0.3",
      marginBottom: "-10px",
    }}
  />
      </div>
    </>
  );
};

export default HomeProjectJourney;







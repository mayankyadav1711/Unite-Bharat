import React from "react";


const HomeProject = () => {
  const Rating = 4;

  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < Rating) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    } else {
      stars.push(<i key={i} className="fa-regular fa-star"></i>);
    }
  }

  return (
    <>
      <h1>Trending Projects</h1>
      <section className="results-section results--grid">
        {/* <!-- Repeat the following profile section for each item --> */}

        <div className="profile">
          <div className="profile__image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/Screenshot%202023-09-13%20001323.png?alt=media&token=a29363df-f374-4ae3-ae24-d66956dbfdf7"
              alt="Doggo"
            />
            <i className="fas fa-medal"></i>
          </div>

          <div className="profile__info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "grey",
              }}
            >
              <p style={{ flex: 1 }}>LDRP-ITR</p>
              <p style={{ marginLeft: "20px" }}>January, 23 2023</p>
            </div>
            <h3>E-Challan Collection System</h3>
            <p className="profile__info__extra">
              E-challan pay by an effective way is a web-portal which will help
              the government in improving the e- challan collection.
            </p>
          </div>

          <div className="metrics">
            <div>
              <i className="fa-solid fa-eye"></i>
              <p>1,237 views</p>
            </div>

            <div>
              <i className="fa-solid fa-thumbs-up"></i>
              <p>451 likes</p>
            </div>
          </div>

          <div className="profile__cta">
            <div className="profile__stats__info temp">{stars}</div>
            <a className="button" href="#">
              View Project
            </a>
          </div>
        </div>

        <div className="profile">
          <div className="profile__image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/smart%20fridge.jpg?alt=media&token=460bad59-5d3a-4feb-aa7e-36b7c97be332"
              alt="Doggo"
            />
            <i className="fas fa-medal"></i>
          </div>

          <div className="profile__info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "grey",
              }}
            >
              <p style={{ flex: 1 }}>LDRP-ITR</p>
              <p style={{ marginLeft: "20px" }}>January, 23 2023</p>
            </div>
            <h3>Smart Fridge</h3>
            <p className="profile__info__extra">
              A Smart Fridge that uses Computer Vision to log in food, keeps
              user updated by SMS, and provide recommendations..
            </p>
          </div>

          <div className="metrics">
            <div>
              <i className="fa-solid fa-eye"></i>
              <p>1,237 views</p>
            </div>

            <div>
              <i className="fa-solid fa-thumbs-up"></i>
              <p>451 likes</p>
            </div>
          </div>

          <div className="profile__cta">
            <div className="profile__stats__info temp">{stars}</div>
            <a className="button" href="#">
              View Project
            </a>
          </div>
        </div>
        <div className="profile">
          <div className="profile__image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/dumbell.jpg?alt=media&token=0433e472-fb26-4f17-bd5f-ac9bd4224b51"
              alt="Doggo"
            />
            <i className="fas fa-medal"></i>
          </div>

          <div className="profile__info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "grey",
              }}
            >
              <p style={{ flex: 1 }}>LDRP-ITR</p>
              <p style={{ marginLeft: "20px" }}>January, 23 2023</p>
            </div>
            <h3>Integrated Dumbbell</h3>
            <p className="profile__info__extra">
              The dumbbell that's not dumb! Rep counting has never been easier!
            </p>
          </div>

          <div className="metrics">
            <div>
              <i className="fa-solid fa-eye"></i>
              <p>1,237 views</p>
            </div>

            <div>
              <i className="fa-solid fa-thumbs-up"></i>
              <p>451 likes</p>
            </div>
          </div>

          <div className="profile__cta">
            <div className="profile__stats__info temp">{stars}</div>
            <a className="button" href="#">
              View Project
            </a>
          </div>
        </div>
        <div className="profile">
          <div className="profile__image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/automobile.jpg?alt=media&token=d73e8271-bbbc-4531-80e3-68db2f6f4e9a"
              alt="Doggo"
            />
            <i className="fas fa-medal"></i>
          </div>

          <div className="profile__info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "grey",
              }}
            >
              <p style={{ flex: 1 }}>LDRP-ITR</p>
              <p style={{ marginLeft: "20px" }}>January, 23 2023</p>
            </div>
            <h3>Autonomous Airplane Pushback Vehicle</h3>
            <p className="profile__info__extra">
              This vehicle is a semi-autonomous airplane pushback vehicle. This
              only a watcher is required for airplane taxis.
            </p>
          </div>

          <div className="metrics">
            <div>
              <i className="fa-solid fa-eye"></i>
              <p>1,237 views</p>
            </div>

            <div>
              <i className="fa-solid fa-thumbs-up"></i>
              <p>451 likes</p>
            </div>
          </div>

          <div className="profile__cta">
            <div className="profile__stats__info temp">{stars}</div>
            <a className="button" href="#">
              View Project
            </a>
          </div>
        </div>
        <div className="profile">
          <div className="profile__image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/water%20alarm.jpg?alt=media&token=f4c9be7f-71e4-4c5f-93f0-3c6580a75897"
              alt="Doggo"
            />
            <i className="fas fa-medal"></i>
          </div>

          <div className="profile__info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "grey",
              }}
            >
              <p style={{ flex: 1 }}>LDRP-ITR</p>
              <p style={{ marginLeft: "20px" }}>January, 23 2023</p>
            </div>
            <h3>Water Alarm Project</h3>
            <p className="profile__info__extra">
              The water level alarm circuit is a simple mechanism to detect and
              indicate the level of water in the overhead tank and also in the
              other containers
            </p>
          </div>

          <div className="metrics">
            <div>
              <i className="fa-solid fa-eye"></i>
              <p>1,237 views</p>
            </div>

            <div>
              <i className="fa-solid fa-thumbs-up"></i>
              <p>451 likes</p>
            </div>
          </div>

          <div className="profile__cta">
            <div className="profile__stats__info temp">{stars}</div>
            <a className="button" href="#">
              View Project
            </a>
          </div>
        </div>
        <div className="profile">
          <div className="profile__image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/superpay.jpg?alt=media&token=071f037c-5690-4400-a624-846e09123ffc"
              alt="Doggo"
            />
            <i className="fas fa-medal"></i>
          </div>

          <div className="profile__info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "grey",
              }}
            >
              <p style={{ flex: 1 }}>LDRP-ITR</p>
              <p style={{ marginLeft: "20px" }}>January, 23 2023</p>
            </div>
            <h3>SuperPay</h3>
            <p className="profile__info__extra">
              SuperPay is an end-to-end platform for real-time digital finance
              making online payments with Cryptocurrencies mainstream enabling
              trust-less recurring cryptocurrency payments
            </p>
          </div>

          <div className="metrics">
            <div>
              <i className="fa-solid fa-eye"></i>
              <p>1,237 views</p>
            </div>

            <div>
              <i className="fa-solid fa-thumbs-up"></i>
              <p>451 likes</p>
            </div>
          </div>

          <div className="profile__cta">
            <div className="profile__stats__info temp">{stars}</div>
            <a className="button" href="#">
              View Project
            </a>
          </div>
        </div>
        <div className="profile">
          <div className="profile__image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/superpay.jpg?alt=media&token=071f037c-5690-4400-a624-846e09123ffc"
              alt="Doggo"
            />
            <i className="fas fa-medal"></i>
          </div>

          <div className="profile__info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "grey",
              }}
            >
              <p style={{ flex: 1 }}>LDRP-ITR</p>
              <p style={{ marginLeft: "20px" }}>January, 23 2023</p>
            </div>
            <h3>SuperPay</h3>
            <p className="profile__info__extra">
              SuperPay is an end-to-end platform for real-time digital finance
              making online payments with Cryptocurrencies mainstream enabling
              trust-less recurring cryptocurrency payments
            </p>
          </div>

          <div className="metrics">
            <div>
              <i className="fa-solid fa-eye"></i>
              <p>1,237 views</p>
            </div>

            <div>
              <i className="fa-solid fa-thumbs-up"></i>
              <p>451 likes</p>
            </div>
          </div>

          <div className="profile__cta">
            <div className="profile__stats__info temp">{stars}</div>
            <a className="button" href="#">
              View Project
            </a>
          </div>
        </div>
        
        <div className="pagination">
        <button style={{
  marginLeft: "-3rem",
  height: "5rem",
  width: "5rem",
  borderRadius: "50%", // Make it circular
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none", // Remove default button border
  backgroundColor: "orange", // Set the background color

  // Add styles for the arrow
  color: "#fff", // Set arrow color
  fontSize: "4rem", // Adjust the size of the arrow
  cursor: "pointer", // Add a pointer cursor on hover
}}>
  {/* Circular Arrow SVG */}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 16 16 12 12 8" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
</button>

      
        </div>

        {/* <!-- Repeat the profile section end --> */}
      </section>
    </>
  );
};

export default HomeProject;

import React from "react";

const HomeLocked = () => {
  const lockedPageStyle = {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const messageStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  return (
    <div style={lockedPageStyle}>
      <div style={messageStyle}>
        This page is locked
      </div>
      <div>
        You are not allowed to access the page.
      </div>
    </div>
  );
};

export default HomeLocked;

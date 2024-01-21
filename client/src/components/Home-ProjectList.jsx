import React from "react";

import HomeHeader from "./Home-Header";
import HomeExploreProject from "./Home-ExploreProjects";

const HomeProjectList = () => {
  const spacerStyle = {
    height: "5rem",
  };

  return (
    <>
      <HomeHeader />

      <div style={spacerStyle} />

      <HomeExploreProject />
    </>
  );
};

export default HomeProjectList;

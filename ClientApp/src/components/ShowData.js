import React from "react";
import "./ShowData.css";
import SidebarIllness from "./Sidebar/SidebarIllness";
import HeaderIllness from "./header/HeaderIllness";
import SeoulChart from "./SeoulChart";

function ShowData() {
  return (
    <div className="showData">
      <SidebarIllness  />
      <HeaderIllness/>
      <div className="show-container">
         <SeoulChart /> 
        
      </div>
    </div>
  );
}

export default ShowData;

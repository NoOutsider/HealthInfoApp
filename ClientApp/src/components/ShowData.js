import React from "react";
import "./ShowData.css";
import SidebarIllness from "./Sidebar/SidebarIllness";
import HeaderMenu from "./header/HeaderMenu";
import SeoulChart from "./SeoulChart";

function ShowData() {
  return (
    <div className="showData">
      <SidebarIllness  />
      <HeaderMenu/>
      <div className="show-container">
         <SeoulChart /> 
        
      </div>
    </div>
  );
}

export default ShowData;

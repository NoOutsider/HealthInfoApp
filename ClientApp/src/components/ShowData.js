import React from "react";
import "./ShowData.css";
import SidebarIllness from "./Sidebar/SidebarIllness";
import SeoulChart from "./SeoulChart";

function ShowData() {
  return (
    <div className="showData">
          <SidebarIllness></SidebarIllness>
       <SeoulChart />      
    </div>
  );
}

export default ShowData;

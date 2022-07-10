import React from "react";
import "./ShowData.css";
import SidebarIllness from "./Sidebar/SidebarIllness";
import SeoulChart from "./SeoulChart";
import ShowChart from "./ShowChart";

function ShowData() {
  return (
    <div className="showData">
      <SidebarIllness></SidebarIllness>
      {/* <SeoulChart />       */}
      <ShowChart />
    </div>
  );
}

export default ShowData;

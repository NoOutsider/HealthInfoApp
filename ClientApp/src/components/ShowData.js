import React from "react";
import "./ShowData.css";
import SidebarIllness from "./Sidebar/SidebarIllness";
import SeoulChart from "./SeoulChart";
import ShowChart from "./ShowChart";
import SidebarTemplate from "./Sidebar/SidebarTemplate";

function ShowData() {
  return (
    <div className="showData">
      <SidebarTemplate />
      <ShowChart />
    </div>
  );
}

export default ShowData;

import React from "react";
import "./ShowData.css";
import SidebarIllness from "./Sidebar/SidebarIllness";
import SeoulChart from "./SeoulChart";
import MaleOutPatientDataTable from "./MaleOutPatientDataTable";
function ShowData() {
  return (
    <div className="showData">
          <SidebarIllness></SidebarIllness>
       <SeoulChart />      
    </div>
  );
}

export default ShowData;

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
        {/* <SeoulChart /> */}
        <img
          className="show-img"
          src="https://forward.nhn.com/2020/seoul/hands-on-labs/toastui.chart-dashboard/_images/step08.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default ShowData;

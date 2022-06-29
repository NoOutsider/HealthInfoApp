import React from "react";
import "./SidebarHospital.css";


function SidebarHospital() {
  return (
    <div className="container">
      <div className="sidebar">
        <button id="getMyPositionBtn">
          내 위치 가져오기
        </button>
      </div>
    </div>
  );
}

export default SidebarHospital;

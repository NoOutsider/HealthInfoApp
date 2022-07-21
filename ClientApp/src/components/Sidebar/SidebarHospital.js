import React from "react";
import "./SidebarHospital.css";
import HospitalSubjectData from "../HospitalSubjectData";

function SidebarHospital({ setFlag, showHP, showPM, onSelect }) {
  return (
    <div className="container">

      <div id="locationCheck">
        <input id="check1" type="checkbox" onChange={setFlag} /> 현재 위치 주변만 보기
        <label for="check1"></label>
      </div>
      <div id="btn">
        <button className="w-btn-outline w-btn-blue-outline" type="button" onClick={showHP}>병원</button>
      </div>
      <div id="btn">
        <button className="w-btn-outline w-btn-pink-outline" type="button" onClick={showPM}>약국</button>
      </div>
      <HospitalSubjectData />

    </div>
  );
}

export default SidebarHospital;

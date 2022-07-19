import React from 'react';
import "./SidebarHospital.css";
import { Container } from "@mui/system";
import HospitalSubjectData from "../HospitalSubjectData";


function SidebarHospital({ setFlag, showHP, showPM }) {
  return (
    <div className="container">

      <div id="locationCheck">
        <input type="checkbox" onChange={setFlag} /> 현재 위치 주변만 보기
      </div>
      <div id="btn">
        <button class="w-btn-outline w-btn-blue-outline" type="button" onClick={showHP}>병원</button>
      </div>
      <div id="btn">
        <button class="w-btn-outline w-btn-pink-outline" type="button" onClick={showPM}>약국</button>
      </div>
      <HospitalSubjectData />

    </div>
  );
}

export default SidebarHospital;

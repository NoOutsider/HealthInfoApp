import React from 'react';
import "./SidebarHospital.css";
import { Container } from "@mui/system";
import HospitalSubjectData from "../HospitalSubjectData";


function SidebarHospital({ setFlag, showHP, showPM }) {
  return (
    <div className="container">
      <Container>
        <div id="locationCheck">
          <input type="checkbox" onChange={setFlag} /> 현재 위치 주변만 보기
        </div>
        <div id="btn">
          <button onClick={showHP}>병원</button>
        </div>
        <div id="btn">
          <button onClick={showPM}>약국</button>
        </div>
        <HospitalSubjectData />
      </Container>
    </div>
  );
}

export default SidebarHospital;

import React from 'react';
import "./SidebarHospital.css";
import { Container } from "@mui/system";


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
        <fieldset className="SearchHP">
          <legend>병원 정보 검색</legend>
          <fieldset id="SearchHPChild">
            <legend>진료과목</legend>
            <select>
              <option key="family" value="family">
                가정의학과
              </option>
              <option key="tuberculosis" value="tuberculosis">
                결핵과
              </option>
              <option key="oral" value="oral">
                구강내과
              </option>
              <option key="internal" value="internal">
                내과
              </option>
              <option key="anesthesia" value="anesthesia">
                마취통증의학과
              </option>
              <option key="radiation" value="radiation">
                방사선종양학과
              </option>
            </select>
          </fieldset>
          <fieldset id="SearchHPChild">
            <legend>전문병원지정분야</legend>
            <input type="checkbox" /> 관절
            <input type="checkbox" /> 수지접합
            <input type="checkbox" /> 관절 + 수지접합 <br />
            <input type="checkbox" /> 뇌혈관
            <input type="checkbox" /> 대장항문
            <input type="checkbox" /> 산부인과 <br />
            <input type="checkbox" /> 소아청소년과
            <input type="checkbox" /> 심장질환
            <input type="checkbox" /> 안과 <br />
            <input type="checkbox" /> 알코올
            <input type="checkbox" /> 외과
            <input type="checkbox" /> 유방 <br />
            <input type="checkbox" /> 이비인후과
            <input type="checkbox" /> 주산기(모자)
            <input type="checkbox" /> 척추 <br />
            <input type="checkbox" /> 한방중풍질환
            <input type="checkbox" /> 한방척추질환
            <input type="checkbox" /> 화상
          </fieldset>
          <fieldset id="SearchHPChild">
            <legend>의료장비</legend>
            <input type="checkbox" /> CT
            <input type="checkbox" /> MRI
            <input type="checkbox" /> 골밀도검사기 <br />
            <input type="checkbox" /> 양전자단층촬영기(PET) <br />
            <input type="checkbox" /> 유방촬영장치 <br />
            <input type="checkbox" /> 종양치료기(Cyber Knife) <br />
            <input type="checkbox" /> 종양치료기(Gamma Knife) <br />
            <input type="checkbox" /> 종양치료기(양성자치료기) <br />
            <input type="checkbox" /> 체외충격파쇄석기 <br />
            <input type="checkbox" /> 초음파영상진단기
            <input type="checkbox" /> 콘빔CT <br />
            <input type="checkbox" /> 혈액투석을위한인공신장기
          </fieldset>
          <fieldset id="SearchHPChild">
            <legend>특수진료</legend>
            <select>
              <option key="homeNursing" value="homeNursing">
                가정간호실시병원
              </option>
              <option key="open" value="open">
                개방병원
              </option>
              <option key="corneal" value="corneal">
                각막이식술
              </option>
              <option key="liver" value="liver">
                간이식술
              </option>
              <option key="boneMarrow" value="boneMarrow">
                골수이식술
              </option>
              <option key="scleral" value="scleral">
                공막이식술
              </option>
            </select>
          </fieldset>
        </fieldset>
      </Container>
    </div>
  );
}

export default SidebarHospital;

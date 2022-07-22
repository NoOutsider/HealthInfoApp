import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";

const Home = () => {
  return (
    <div>
      <div className="contents">
        <div className="moon">
          <GLTFModel
            width="120"
            height="120"
            background="rgba(3,32,50)"
            position={{ x: 0, y: 0, z: 0 }}
            src="images/luna/scene.gltf"
          >
            {/* 조명 */}
            {/* <AmbientLight color={0xffffff} />
          <DirectionLight color={0xffffff} position={{ x: 100, y: 200, z: 100 }} />
          <DirectionLight color={0xff00ff} position={{ x: -100, y: 200, z: -100 }} /> */}
          </GLTFModel>
        </div>
        <div className="contentTxt">
          <h2>HEALTH CARE INFORMATION</h2>
        </div>
      </div>
      <div className="margin" />
      <div>
        <Link to="/showData" id="showData">
          <h2>질병통계</h2>
        </Link>
        <ul>
          <li>
            <img src="images/ageIcon.png" width="50%" alt="" />
            <br />
            연령대별
          </li>
          <li>
            <img src="images/sexIcon.png" width="50%" alt="" />
            <br />
            성별
          </li>
          <li>
            <img src="images/diseaseIcon.png" width="50%" alt="" />
            <br />
            기저질환별
          </li>
        </ul>
        <ul>
          <li>
            <img src="images/medisubIcon.png" width="50%" alt="" />
            <br />
            진료과목별
          </li>
          <li>
            <img src="images/periodIcon.png" width="50%" alt="" />
            <br />
            기간별
          </li>
          <li>
            <img src="images/areaIcon.png" width="50%" alt="" />
            <br />
            지역별
          </li>
        </ul>
      </div>
      <h2>위치찾기</h2>
      <div className="locationImg">
        <img
          id="hosImg"
          src="images/hospitalImage.jpg"
          width="400px"
          height="300px"
          alt=""
        />
        <img
          id="pharImg"
          src="images/pharmacyImage.jpg"
          width="400px"
          height="300px"
          alt=""
        />
      </div>
      <div className="locationButtons">
        <Link to="/mapView" id="mapView">
          <button id="hosButton">
            <img src="images/mapIcon.png" width="25px" alt="" />
            병원
          </button>
          <button id="pharButton">
            <img src="images/mapIcon.png" width="25px" alt="" />
            약국
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

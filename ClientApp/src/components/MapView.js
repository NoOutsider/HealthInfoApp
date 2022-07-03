/*global kakao*/
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./MapView.css";
import MapSidebar from "./Sidebar/MapSidebar";
//import HospitalTableData from "./HospitalTableData";

function MapView() {
  var map;
  var markers = [];

  const [positionsHP, setPositions1] = useState([
    {
      content: "<div>카카오</div>",
      latlng: new kakao.maps.LatLng(33.450705, 126.570677),
    },
    {
      content:
        '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>',
      latlng: new kakao.maps.LatLng(33.450936, 126.569477),
    },
  ]);

  const [positionsPM, setPositions2] = useState([
    {
      content: "<div>텃밭</div>",
      latlng: new kakao.maps.LatLng(33.450879, 126.56994),
    },
    {
      content: "<div>근린공원</div>",
      latlng: new kakao.maps.LatLng(33.451393, 126.570738),
    },
  ]);

  ////////////////////////////////////////////////
  // state변수 (약국positions, 병원postions) 가 변경될 때마다 실행 될 함수를 지정해 줄 useEffect가 필요함.
  // 아래 useEffect는 시작 때 무조건 실행되는 거라 별개임!!!!
  ////////////////////////////////////////////////

  // 화면 초기화될 때 무조건 실행되는 useEffect
  useEffect(() => {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3, // 지도의 확대 레벨
      };

    map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도 위에 표시
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  // 배열에 추가된 마커들을 지도에서 삭제하는 함수
  const delPin = () => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  const addPin = (positions) => {
    for (var i = 0; i < positions.length; i++) {
      // 마커 생성
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
      });

      // 마커에 표시할 인포윈도우 생성
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
        removable: true,
      });
      // 마커에 mouseover 이벤트와 mouseout 이벤트 등록
      // 이벤트 리스너로는 클로저를 만들어 등록
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록
      kakao.maps.event.addListener(
        marker,
        "click",
        makeOverListener(map, marker, infowindow)
      );

      markers.push(marker);
    }
  };

  // 인포윈도우를 표시하는 클로저를 만드는 함수
  const makeOverListener = (map, marker, infowindow) => {
    return function () {
      infowindow.open(map, marker);
    };
  };

  const showHP = () => {
    // console.log("병원보여줌");
    delPin();
    addPin(positionsHP);
  };

  const showPM = () => {
    // console.log("약국보여줌");
    delPin();
    addPin(positionsPM);
  };

  return (
    <Container>
      <div id="btn">
        <button onClick={showHP}>병원</button>
      </div>
      <div id="btn">
        <button onClick={showPM}>약국</button>
      </div>
      <div className="mapView" id="mapwrap">
        {/* <MapSidebar width={300} /> */}
        <div
          className="map"
          id="map"
          style={{ width: "auto", height: "850px" }}
        ></div>
        {/*<HospitalTableData margin-left="300" />*/}
      </div>
    </Container>
  );
}

export default MapView;

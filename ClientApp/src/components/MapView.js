/*global kakao*/
import { Container } from "@mui/system";
import React, { useEffect, useState, useReducer } from "react";
import "./MapView.css";
import MapSidebar from "./Sidebar/MapSidebar";
//import HospitalTableData from "./HospitalTableData";

const ACTION_TYPE = {
  ALL_LIST: 1,
};
Object.freeze(ACTION_TYPE);

const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ALL_LIST:
      return { dataList: action.dataList, loading: action.loading };
    default:
      return state;
  }
};

function MapView() {
  var map;
  var markers = [];

  const [stateHP, dispatchHP] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
    },
    DataHP
  );

  async function DataHP() {
    const response = await fetch("HospitalData/AllList");
    dispatchHP({
      type: ACTION_TYPE.ALL_LIST,
      dataList: await response.json(),
      loading: true,
    });
  }

  var positionsHP = !stateHP.loading
    ? []
    : stateHP.dataList.map((data) => {
        return {
          content: "<div>" + data.col02 + "</div>",
          latlng: new kakao.maps.LatLng(data.col15, data.col14),
        };
      });

  const [statePM, dispatchPM] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
    },
    DataPM
  );

  async function DataPM() {
    const response = await fetch("PharmacyData/AllList");
    dispatchPM({
      type: ACTION_TYPE.ALL_LIST,
      dataList: await response.json(),
      loading: true,
    });
  }

  var positionsPM = !statePM.loading
    ? []
    : statePM.dataList.map((data) => {
        return {
          content: "<div>" + data.이름 + "</div>",
          latlng: new kakao.maps.LatLng(data.y좌표, data.x좌표),
        };
      });

  // const [positionsHP, setPositionsHP] = useState([
  //   {
  //     content: "<div>카카오</div>",
  //     latlng: new kakao.maps.LatLng(33.450705, 126.570677),
  //   },
  //   {
  //     content:
  //       '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>',
  //     latlng: new kakao.maps.LatLng(33.450936, 126.569477),
  //   },
  // ]);

  // const [positionsPM, setPositions2] = useState([
  //   {
  //     content: "<div>텃밭</div>",
  //     latlng: new kakao.maps.LatLng(33.450879, 126.56994),
  //   },
  //   {
  //     content: "<div>근린공원</div>",
  //     latlng: new kakao.maps.LatLng(33.451393, 126.570738),
  //   },
  // ]);

  // 화면 초기화될 때 무조건 실행되는 useEffect
  useEffect(() => {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 12, // 지도의 확대 레벨
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

    /****************************************현재 위치************************************************/
    // HTML5의 geolocation으로 사용 가능 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻기
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
          message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용

        // 마커와 인포윈도우를 표시
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을 때 마커 표시 위치와 인포윈도우 내용 설정
      var locPosition = new kakao.maps.LatLng(37.5666805, 126.9784147),
        message = "현재 위치를 알 수 없어 기본 위치로 이동";

      displayMarker(locPosition, message);
    }

    // 지도에 현재 위치 마커와 인포윈도우를 표시하는 함수
    function displayMarker(locPosition, message) {
      // 마커 생성
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우 생성
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커 위에 표시
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경
      map.setCenter(locPosition);
    }
  });

  // 배열에 추가된 마커들을 지도에서 삭제하는 함수
  const delPin = () => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  // 좌표 정보 있는 데이터 지도에 마커 표시하는 함수
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
    // console.log("병원.length = " + positionsHP.length);
    // console.log("병원[0].latlng = ", positionsHP[0].latlng);
    // console.log("병원[0].content = ", positionsHP[0].content);
  };

  const showPM = () => {
    // console.log("약국보여줌");
    delPin();
    addPin(positionsPM);
    //positions
    // () =>
    // setPositionsPM(
    //   !state.loading
    //     ? []
    //     : state.dataList.map((data) => {
    //         return {
    //           content: "<div>" + data.이름 + "</div>",
    //           latlng: new kakao.maps.LatLng(data.x좌표, data.y좌표),
    //         };
    //       })
    // )

    // console.log("약국.length = " + positionsPM.length);
    // console.log("약국[0].latlng = ", positionsPM[0].latlng);
    // console.log("약국[0].content = ", positionsPM[0].content);
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

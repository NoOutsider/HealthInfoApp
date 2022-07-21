/*global kakao*/
import React, { useEffect, useState, useReducer } from "react";
import "./MapView.css";
import SidebarHospital from "./Sidebar/SidebarHospital";
//import HospitalTableData from "./HospitalTableData";

const ACTION_TYPE = {
  ALL_LIST: 1,
  xyPos: 2,
};
Object.freeze(ACTION_TYPE);

const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ALL_LIST:
      return { dataList: action.dataList, loading: action.loading };
    case ACTION_TYPE.xyPos:
      return {
        ...state,
        dataList: action.dataList,
        loading: action.loading,
      };
    default:
      return state;
  }
};

function MapView() {
  var map;
  var markers = [];
  var locPosition;

  const [state, dispatch] = useReducer(dataReducer, {
    dataList: [],
    loading: false,
  });

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
        latlng: new kakao.maps.LatLng(data.y좌표, data.x좌표),
        content:
          "<div>" +
          data.요양기관명 +
          "<br> 전화번호: " +
          data.전화번호 +
          "<br> URL: <a href=" +
          data.병원URL +
          'style="color: blue" target="_blank">' +
          data.병원URL +
          "</a></div>",
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

  const [isCurrent, setIsCurrent] = useState(0);
  // isCurrent(현재 위치 체크 여부 확인 변수)의 상태가 변할 때 사용하는 useEffect
  useEffect(() => {
    if (isCurrent === 1) {
      createMap();
      geoLocation();
    }
  }, [isCurrent]);

  // 화면 초기화될 때 무조건 실행되는 useEffect
  useEffect(() => {
    console.log("111111111111111111111 useEffect");
    createMap();

    addPin(positionsHP);
    if (isCurrent === 1) delPin();
  });

  useEffect(() => {
    console.log("1111111111111111111 useEffect");
    createMap();
  }, []);

  const createMap = () => {
    console.log("2222222222222222222222 createMap");

    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(37.5666805, 126.9784147),
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
  };

  // 좌표 정보 있는 데이터 지도에 마커 표시하는 함수
  const addPin = (positions) => {
    console.log("33333333333333333333333333 addPin");

    createMap();

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

  // 배열에 추가된 마커들을 지도에서 삭제하는 함수
  const delPin = () => {
    console.log("delPin");
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  // 인포윈도우를 표시하는 클로저를 만드는 함수
  const makeOverListener = (map, marker, infowindow) => {
    return function () {
      infowindow.open(map, marker);
    };
  };

  // 현재 위치를 가져오는 함수
  const geoLocation = () => {
    // HTML5의 geolocation으로 사용 가능 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻기
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
        var message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용

        // 마커와 인포윈도우를 표시
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을 때 마커 표시 위치와 인포윈도우 내용 설정
      locPosition = new kakao.maps.LatLng(37.5666805, 126.9784147);
      var message = "현재 위치를 알 수 없어 기본 위치로 이동";

      displayMarker(locPosition, message);
    }

    // 지도에 현재 위치 마커와 인포윈도우를 표시하는 함수
    function displayMarker(locPosition, message) {
      // 마커 이미지의 이미지 주소입니다
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      // 마커 생성
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage, // 마커 이미지
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
  };

  // 현재 위치 체크 여부를 확인하는 함수
  const setFlag = () => {
    const newValue = isCurrent === 0 ? 1 : 0;
    setIsCurrent(newValue);
  };

  // 지도에 병원 보여주는 함수
  const showHP = () => {
    var currentHPs = [];

    delPin();

    // 1. 만약에 isCurrent == 1이면 positionsHP에서 현재 위치에 1km 이내 반경만 골라서 보여줌
    if (isCurrent) {
      // 1-1. positionsHP의 요소 하나하나를 돌기 위해 for문 작성
      for (var i = 0; i < positionsHP.length; i++) {
        // 1-2. 현재위치와 요소 하나하나를 비교해서 거리가 1km 이내를 확인

        // eslint-disable-next-line no-unused-expressions
        var distance = Math.sqrt(
          (locPosition.La - positionsHP[i].latlng.La) ** 2 +
          (locPosition.Ma - positionsHP[i].latlng.Ma) ** 2
        );

        // 1-3. 만약 거리가 1km 이내면 새 배열에 넣음, 아니면 continue
        if (distance <= 0.1) currentHPs.push(positionsHP[i]);
        else continue;

        //console.log("currentHPs+++++++++++++++++++++++++++++", currentHPs);
        addPin(currentHPs);
      }
    }
    // 2. 만약에 isCurrent == 0이면 positionsHP를 보여줌
    else addPin(positionsHP);
  };

  // 지도에 약국 보여주는 함수
  const showPM = () => {
    var currentPMs = [];

    delPin();

    if (isCurrent) {
      for (var i = 0; i < positionsPM.length; i++) {
        // eslint-disable-next-line no-unused-expressions
        var distance = Math.sqrt(
          (locPosition.La - positionsPM[i].latlng.La) ** 2 +
          (locPosition.Ma - positionsPM[i].latlng.Ma) ** 2
        );

        if (distance <= 0.1) currentPMs.push(positionsPM[i]);
        else continue;

        addPin(currentPMs);
      }
    } else addPin(positionsPM);
  };

  // 병원 진료과목 검색을 위한 코드
  const onSelect = (e) => {
    delPin();

    fetch("HospitalSearchListData/xyPosition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        진료과목코드명: e.target.value,
        특수병원검색코드명: "",
        장비코드명: "",
        특수진료검색코드명: "",
      }),
    })
      .then((response) => {
        //console.log(e.target.value);
        return response.json();
      })
      .then((dataList) => {
        dispatch({
          type: ACTION_TYPE.xyPos,
          dataList: dataList,
          loading: true,
        });
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", state.dataList);
      });

    var positions = !state.loading
      ? []
      : state.dataList.map((data) => {
        //console.log(data);
        return {
          latlng: new kakao.maps.LatLng(data.yPosition, data.xPosition),
        };
      });

    console.log(">>>>>>>>>>>>>>>>>>>>", state.dataList);
    addPin(positions);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SidebarHospital setFlag={setFlag} showHP={showHP} showPM={showPM} onSelect={onSelect} />
      <div className="mapView" id="mapwrap">
        <div
          className="map"
          id="map"
          style={{ width: "1550px", height: "850px" }}
        ></div>
      </div>
    </div>
  );
}

export default MapView;

/*global kakao*/
import React, { useEffect, useReducer } from 'react'
import "./MapView.css"
import Sidebar from "./Sidebar/SidebarHospital";
import HospitalTableData from "./HospitalTableData";

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
}


function MapView() {

    const [state, dispatch] = useReducer(dataReducer, {
        dataList: [],
        loading: false
    }, initData);

    async function initData() {
        const response = await fetch('HospitalData/AllList');
        dispatch({
            type: ACTION_TYPE.ALL_LIST,
            dataList: await response.json(),
            loading: true
        });
    }

    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
    var positions = !state.loading ? [] : state.dataList.map(data => {
        return {
            latlng: new kakao.maps.LatLng(data.col15, data.col14),
            content: '<div>' + data.col02 +
                '<br> 전화번호: ' + data.col10 +
                '<br> URL: <a href="data.col11" style="color: blue" target="_blank">' + data.col11 + '</a></div>'
        };
    });

    useEffect(() => {

        var mapContainer = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3 // 지도의 확대 레벨
            };
        var map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


        for (var i = 0; i < positions.length; i++) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커의 위치
                clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            });

            // 마커에 표시할 인포윈도우를 생성합니다 
            var infowindow = new kakao.maps.InfoWindow({
                content: positions[i].content, // 인포윈도우에 표시할 내용
                removable: true
            });
            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
            //kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }
        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function () {
                infowindow.open(map, marker);
            };
        }

        function getLocation() {
            // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
            if (navigator.geolocation) {

                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function (position) {

                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도

                    var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                        message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

                    // 마커와 인포윈도우를 표시합니다
                    displayMarker(locPosition, message);

                });

            } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

                var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                    message = 'geolocation을 사용할수 없어요..'

                displayMarker(locPosition, message);
            }

            // 지도에 마커와 인포윈도우를 표시하는 함수입니다
            function displayMarker(locPosition, message) {

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: locPosition
                });

                var iwContent = message, // 인포윈도우에 표시할 내용
                    iwRemoveable = true;

                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: iwContent,
                    removable: iwRemoveable
                });

                // 인포윈도우를 마커위에 표시합니다 
                infowindow.open(map, marker);

                // 지도 중심좌표를 접속위치로 변경합니다
                map.setCenter(locPosition);
            }
        };
        getLocation();



    })



    return (
        <div className="mapView">
            <Sidebar width={300} />
            <div className="map" id="map" style={{ width: "auto", height: "400px" }}></div>
            <HospitalTableData margin-left="300" />
        </div>
    );
}

export default MapView;


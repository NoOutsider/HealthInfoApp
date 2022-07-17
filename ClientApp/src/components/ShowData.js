import React, { useReducer, useCallback } from "react";
import "./ShowData.css";
import ShowChart from "./ShowChart";
import SidebarTemplate from "./Sidebar/SidebarTemplate";

const ACTION_TYPE = {
  sidebarRendering: 1,
  selectCondition: 2,
  chartType: 3,
};
Object.freeze(ACTION_TYPE);

const sidebarRender = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.sidebarRendering:
      return {
        ...state,
        dataList: action.dataList,
        loading: action.loading,
      };
    case ACTION_TYPE.selectCondition:
      return {
        ...state,
        illnessName: action.illnessName,
        menuName: action.menuName,
        startDate: action.startDate,
        endDate: action.endDate,
        item: action.item,
        gender: action.gender,
        age: action.age,
        ioPatient: action.ioPatient,
        nursingHome: action.nursingHome,
        location: action.location,
      };
    case ACTION_TYPE.chartType:
      return {
        ...state,
        chartLabels: action.chartLabels,
        chartData: action.chartData,
      };
    default:
      return state;
  }
};

function ShowData() {
  const [state, dispatch] = useReducer(
    sidebarRender,
    {
      dataList: [],
      loading: false,
      chartLoading: false,
      chartLabels: [],
      chartData: [],
      illnessName: "",
      menuName: "",
      startDate: "",
      endDate: "",
      item: "",
      gender: "",
      age: "",
      ioPatient: "",
      nursingHome: "",
      location: "",
    },
    initData
  );
  async function initData() {
    const response = await fetch("AllillnessData/SetSidebar");
    dispatch({
      type: ACTION_TYPE.sidebarRendering,
      dataList: await response.json(),
      loading: true,
    });
    await loadChartData();
  }

  async function loadChartData() {
    fetch("AllillnessData/loadChartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ACTION_TYPE.chartType,
          chartLabels: data.chartLabels,
          chartData: data.chartData,
          chartLoading: true,
        });
      });
  }

  const onSelect = useCallback((e) => {
    fetch("AllillnessData/resetChartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        illnessName: e.target.value,
        menuName: "STATE",
        startDate: "2017-01-01",
        endDate: "2021-10-01",
        item: "환자수",
        gender: "",
        age: "",
        ioPatient: "",
        nursingHome: "",
        location: "서울",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ACTION_TYPE.chartType,
          chartLabels: data.chartLabels,
          chartData: data.chartData,
          chartLoading: true,
        });
      });
  });

  return (
    <div className="showData">
      <SidebarTemplate state={state} onSelect={onSelect} />
      <ShowChart state={state} />
    </div>
  );
}

export default ShowData;

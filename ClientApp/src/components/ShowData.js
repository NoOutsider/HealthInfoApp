import React, { useReducer, useCallback } from "react";
import "./ShowData.css";
import ShowChart from "./ShowChart";
import SidebarTemplate from "./Sidebar/SidebarTemplate";

const ACTION_TYPE = {
  sidebarRendering: 1,
  selectCondition: 2,
  CHANGE_VALUE: 3,
  chartType: 4,
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
    case ACTION_TYPE.CHANGE_VALUE: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
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
      // select: {
      //   illnessName: "",
      //   menuName: "",
      //   startDate: "",
      //   endDate: "",
      //   item: "",
      //   gender: "",
      //   age: "",
      //   ioPatient: "",
      //   nursingHome: "",
      //   location: "",
      // },
      illnessName: "흡연",
      menuName: "TB_ALLILLNESS_NURSINGHOME_LOCATION",
      startDate: "2017-07-01",
      endDate: "2021-10-01",
      item: "환자수",
      gender: "여",
      age: "5세구간별",
      ioPatient: "외래",
      nursingHome: "상급종합병원",
      location: "서울",
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
    const newState = {
      ...state,
      [e.target.name]: e.target.value,
    };

    console.log("state", state);
    console.log("newState", newState);
    console.log(JSON.stringify(newState));

    dispatch({
      type: ACTION_TYPE.CHANGE_VALUE,
      action: e.target,
    });

    fetch("AllillnessData/resetChartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newState),
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

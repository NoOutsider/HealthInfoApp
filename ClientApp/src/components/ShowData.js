import React, { useReducer, useCallback } from "react";
import "./ShowData.css";
import ShowChart from "./ShowChart";
import SidebarTemplate from "./Sidebar/SidebarTemplate";

const ACTION_TYPE = {
  INIT_DATA: 0,
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
    console.log("s111 tate=", state);

    dispatch({
      type: ACTION_TYPE.CHANGE_VALUE,
      action: e.target,
    });

    const newState = {
      illnessName: document.getElementById("illnessName").value,
      menuName: document.getElementById("menuName").value,
      item: document.getElementById("item").value,
      gender: document.getElementById("gender").value,
      age_5: document.getElementById("age_5").value,
      age_10: document.getElementById("age_10").value,
      ioPatient: document.getElementById("ioPatient").value,
      nursingHome: document.getElementById("nursingHome").value,
      location: document.getElementById("location").value,
    };

    console.log("newState=", newState);
    console.log("state=", state);

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

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
    dispatch({
      type: ACTION_TYPE.selectCondition,
      illnessName: e.target.value,
    });
    postData("AllillnessData/Get");
    console.log(state);
  });

  async function postData(url) {
    // 옵션 기본 값은 *로 강조
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    return response.json();
  }

  return (
    <div className="showData">
      <SidebarTemplate
        ACTION_TYPE={ACTION_TYPE}
        sidebarRender={sidebarRender}
        onSelect={onSelect}
        state={state}
        dispatch={dispatch}
        initData={initData}
      />
      <ShowChart state={state} />
    </div>
  );
}

export default ShowData;

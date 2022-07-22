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
  console.log("333 tableDatas", action);
  switch (action.type) {
    case ACTION_TYPE.sidebarRendering:
      return {
        ...state,
        dataList: action.dataList,
        sidebarRenderingLoading: action.sidebarRenderingLoading,
      };
    case ACTION_TYPE.CHANGE_VALUE: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case ACTION_TYPE.chartType:
      console.log("22222 tableDatas =", action.tableDatas);
      return {
        ...state,
        chartLabels: action.chartLabels,
        chartData: action.chartData,
        chartLoading: true
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
    },
    initData
  );

  const renderTable = (chartLabels, chartData) => {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
        </thead>
        <tbody>
          <tr key='1'>
            <th>단위기간</th>
            {chartLabels.map(data => <td>{data}</td>)}
          </tr>
          <tr key='2'>
            <th>상세조건</th>
            {chartData.map(data => <td>{data}</td>)}
          </tr>
        </tbody>
      </table>
    );
  };

  async function initData() {
    const response = await fetch("AllillnessData/SetSidebar");

    dispatch({
      type: ACTION_TYPE.sidebarRendering,
      dataList: await response.json(),
      sidebarRenderingLoading: true,
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

  const getNameValue = (name) => {
    var size = document.getElementsByName(name).length;
    for (var i = 0; i < size; i++) {
      if (document.getElementsByName(name)[i].checked === true) {
        return document.getElementsByName(name)[i].value;
      }
    }
  };

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
      gender: getNameValue("gender"),
      age_5: document.getElementById("age_5").value,
      age_10: document.getElementById("age_10").value,
      ioPatient: getNameValue("ioPatient"),
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
          dataList: data.dataList,
          chartLoading: true,

        });
      });
  });

  let contents = !state.chartLoading
    ? <p><em>Loading...</em></p>
    : renderTable(state.chartLabels, state.chartData);


  return (
    <div className="showData">
      <div className="sidebar">
        <SidebarTemplate state={state} onSelect={onSelect} />
      </div>

      <div className="show-container">
        <ShowChart state={state} />
        <h1 id="tabelLabel">Data</h1>
        {contents}
      </div>

    </div>

  );
}

export default ShowData;
import React, { useReducer, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const ACTION_TYPE = {
  ALL_LIST: 1,
  CHART_DATA_LOADED : 2
};
Object.freeze(ACTION_TYPE);

const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ALL_LIST:
      return {
        ...state,
        dataList: action.dataList,
        loading: action.loading,
      };
    case ACTION_TYPE.CHART_DATA_LOADED:
    console.log(action)
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    line: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '보험자부담금 총계',
    },
  },
};

const NursingHomeLocationDataTable= () => {
  const [state, dispatch] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
      chartLoading: false,
      chartLabels: [],
      chartData: []
    },
    initData
  );



  const data = {
    labels: !state.chartLoading ? [] : state.chartLabels,
    datasets: [
      {
        label: '보험자부담금',
        data: !state.chartLoading ? [] : state.chartData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
    };
    //const data = {
    //    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //    datasets: [
    //        {
    //            label: "First dataset",
    //            data: [33, 53, 85, 41, 44, 65],
    //            fill: true,
    //            backgroundColor: "rgba(75,192,192,0.2)",
    //            borderColor: "rgba(75,192,192,1)"
    //        },
    //        {
    //            label: "Second dataset",
    //            data: [33, 25, 35, 51, 54, 76],
    //            fill: false,
    //            borderColor: "#742774"
    //        }
    //    ]
    //};


    const renderNursingHomeLocationDataTable = (dataList) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>진료년월</th>
            <th style={{ width: "200px" }}>state</th>
            <th>계</th>
            <th>서울</th>
            <th>부산</th>
            <th>인천</th>
            <th>대구</th>
            <th>광주</th>
            <th>대전</th>
            <th>울산</th>
            <th>경기</th>
            <th>강원</th>
            <th>충북</th>
            <th>충남</th>
            <th>전북</th>
            <th>전남</th>
            <th>경북</th>
            <th>경남</th>
            <th>제주</th>
            <th>세종</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => (
            /*<tr key={data.진료년월}>*/
            <tr>
              <td>{data.진료년월}</td>
              <td>{data.state}</td>
              <td>{data.계}</td>
              <td>{data.서울}</td>
              <td>{data.부산}</td>
              <td>{data.인천}</td>
              <td>{data.대구}</td>
              <td>{data.광주}</td>
              <td>{data.대전}</td>
              <td>{data.울산}</td>
              <td>{data.경기}</td>
              <td>{data.강원}</td>
              <td>{data.충북}</td>
              <td>{data.충남}</td>
              <td>{data.전북}</td>
              <td>{data.전남}</td>
              <td>{data.경북}</td>
              <td>{data.경남}</td>
              <td>{data.제주}</td>
              <td>{data.세종}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  async function initData() {
    await loadChartData();

      const response = await fetch("NursingHomeLocationData/AllList");
    dispatch({
      type: ACTION_TYPE.ALL_LIST,
      dataList: await response.json(),
      loading: true,
    });
  }

  async function loadChartData() {
      fetch('NursingHomeLocationData/loadChartData')
    .then(response => response.json())
    .then(data => {
      dispatch({
          type: ACTION_TYPE.CHART_DATA_LOADED,
        chartLabels: data.chartLabels,
        chartData: data.chartData,
        chart_loading: true
      });
    })
  }

  let contents = !state.loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
          renderNursingHomeLocationDataTable(state.dataList)
  );

  return (
    <div>
      <div><Line options={options} data={data} /></div>
      <input
        placeholder="질병명"      
      />
      <div>
        <h1 id="tabelLabel">Data</h1>
        {contents}
      </div>
    </div>
  );
};

export default NursingHomeLocationDataTable;

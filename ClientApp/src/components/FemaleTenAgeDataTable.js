import React, { useReducer, useState } from "react";
//import {
//  Chart as ChartJS,
//  CategoryScale,
//  LinearScale,
//  BarElement,
//  Title,
//  Tooltip,
//  Legend,
//} from 'chart.js';
//import { Bar } from 'react-chartjs-2';

const ACTION_TYPE = {
  ALL_LIST: 1,
  //CHART_DATA_LOADED : 2
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
    //case ACTION_TYPE.CHART_DATA_LOADED:
    //console.log(action)
    //return {
    //  ...state,
    //  chartLabels: action.chartLabels,
    //  chartData: action.chartData,
    //  chartLoading: true
    //};
    default:
      return state;
  }
};

//ChartJS.register(
//  CategoryScale,
//  LinearScale,
//  BarElement,
//  Title,
//  Tooltip,
//  Legend
//);

//export const options = {
//  indexAxis: 'y',
//  elements: {
//    bar: {
//      borderWidth: 2,
//    },
//  },
//  responsive: true,
//  plugins: {
//    title: {
//      display: true,
//      text: '서울 2017년 1월 자료',
//    },
//  },
//};

const FemaleTenAgeDataTable= () => {
  const [state, dispatch] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
      //chartLoading: false,
      //chartLabels: [],
      //chartData: []
    },
    initData
  );
  const [illnessName, setIllnessName] = useState("");
  const handleIllnessName = (e) => {
    setIllnessName(e.target.value);
    console.log(illnessName);
  };

  // const handleClick=()=>{

  // }

  //const data = {
  //  labels: !state.chartLoading ? [] : state.chartLabels,
  //  datasets: [
  //    {
  //      label: 'Dataset 2',
  //      data: !state.chartLoading ? [] : state.chartData,
  //      borderColor: 'rgb(53, 162, 235)',
  //      backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //    },
  //  ],
  //};

    const renderFemaleTenAgeDataTable = (dataList) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>진료년월</th>
            <th style={{ width: "200px" }}>state</th>
            <th style={{ width: "50px" }}>소계</th>
            <th style={{ width: "50px" }}>10대 미만</th>
            <th style={{ width: "50px" }}>10대</th>
            <th style={{ width: "50px" }}>20대</th>
            <th style={{ width: "50px" }}>30대</th>
            <th style={{ width: "50px" }}>40대</th>
            <th style={{ width: "50px" }}>50대</th>
            <th style={{ width: "50px" }}>60대</th>
            <th style={{ width: "50px" }}>70대</th>
            <th style={{ width: "50px" }}>80대 이상</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => (
            /*<tr key={data.진료년월}>*/
            <tr>
              <td>{data.진료년월}</td>
              <td>{data.state}</td>
              <td>{data.소계}</td>
              <td>{data.나이10대미만}</td>
              <td>{data.나이10대}</td>
              <td>{data.나이20대}</td>
              <td>{data.나이30대}</td>
              <td>{data.나이40대}</td>
              <td>{data.나이50대}</td>
              <td>{data.나이60대}</td>
              <td>{data.나이70대}</td>
              <td>{data.나이80대이상}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  async function initData() {
    /*await loadChartData();*/

      const response = await fetch("FemaleOutpatient/AllList3");
    dispatch({
      type: ACTION_TYPE.ALL_LIST,
      dataList: await response.json(),
      loading: true,
    });
  }

  /*async function loadChartData() {*/
  //fetch('data/loadChartDataXXX')
  //  .then(response => response.json())
  //  .then(data => {
  //    dispatch({
  //      type: ACTION_TYPE.,
  //      chartLabels: data.chartLabels,
  //      chartData: data.chartData,
  //      chart_loading: true
  //    });
  //  })
  /*}*/

  let contents = !state.loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
          renderFemaleTenAgeDataTable(state.dataList)
  );

  return (
    <div>
      <div>{/*<Bar options={options} data={data} />*/}</div>
      <input
        placeholder="질병명"
        value={illnessName}
        onChange={handleIllnessName}
      />
      {/* <button onClick={handleClick}>확인</button> */}
      <div>
        <h1 id="tabelLabel">Data</h1>
        {contents}
      </div>
    </div>
  );
};

export default FemaleTenAgeDataTable;

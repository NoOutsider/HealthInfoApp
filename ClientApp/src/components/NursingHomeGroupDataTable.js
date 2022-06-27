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

const NursingHomeGroupDataTable= () => {
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

    const renderNursingHomeGroupDataTable = (dataList) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>진료년월</th>
            <th style={{ width: "200px" }}>state</th>
            <th>계</th>
            <th>상급종합병원</th>
            <th>종합병원</th>
            <th>병원급</th>
            <th>의원급</th>
            <th>보건기관등</th>
            
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => (
            /*<tr key={data.진료년월}>*/
            <tr>
              <td>{data.진료년월}</td>
              <td>{data.state}</td>
              <td>{data.계}</td>
              <td>{data.상급종합병원}</td>
              <td>{data.종합병원}</td>
              <td>{data.병원급}</td>
              <td>{data.의원급}</td>
              <td>{data.보건기관등}</td>              
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  async function initData() {
    /*await loadChartData();*/

      const response = await fetch("NursingHomeGroup/AllList1");
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
          renderNursingHomeGroupDataTable(state.dataList)
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

export default NursingHomeGroupDataTable;

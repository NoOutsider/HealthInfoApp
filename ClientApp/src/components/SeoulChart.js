import React, { useReducer } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const ACTION_TYPE = {
  ALL_LIST: 1,
  CHART_DATA_LOADED: 2,
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
      console.log(action);
      return {
        ...state,
        chartLabels: action.chartLabels,
        chartData: action.chartData,
        chartLoading: true,
      };
    default:
      return state;
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "서울 2017년 1월 자료",
    },
  },
};

const ADHDTableData = () => {
  const [state, dispatch] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
      chartLoading: false,
      chartLabels: [],
      chartData: [],
    },
    initData
  );

  const data = {
    labels: !state.chartLoading ? [] : state.chartLabels,
    datasets: [
      {
        label: "Dataset 2",
        data: !state.chartLoading ? [] : state.chartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const renderForecastsTable = (dataList) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>날짜</th>
            <th style={{ width: "200px" }}>종류</th>
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
            <tr key={data.col01}>
              <td>{data.col02}</td>
              <td>{data.col03}</td>
              <td>{data.col04}</td>
              <td>{data.col05}</td>
              <td>{data.col06}</td>
              <td>{data.col07}</td>
              <td>{data.col08}</td>
              <td>{data.col09}</td>
              <td>{data.col10}</td>
              <td>{data.col11}</td>
              <td>{data.col12}</td>
              <td>{data.col13}</td>
              <td>{data.col14}</td>
              <td>{data.col15}</td>
              <td>{data.col16}</td>
              <td>{data.col17}</td>
              <td>{data.col18}</td>
              <td>{data.col19}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  async function initData() {
    await loadChartData();

    //const response = await fetch('data/AllList');
    //  dispatch({
    //      type: ACTION_TYPE.ALL_LIST,
    //      dataList: await response.json(),
    //      loading: true
    //  });
  }

  async function loadChartData() {
    fetch("data/loadChartDataXXX")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ACTION_TYPE.CHART_DATA_LOADED,
          chartLabels: data.chartLabels,
          chartData: data.chartData,
          chart_loading: true,
        });
      });
  }

  let contents = !state.loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderForecastsTable(state.dataList)
  );

  return (
    <div>
      <div>
        <Bar options={options} data={data} />
      </div>
      <div>
        <h1 id="tabelLabel">Data</h1>
        {contents}
      </div>
    </div>
  );
};

export default ADHDTableData;

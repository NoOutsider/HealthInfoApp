import React, { useReducer } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);
const ACTION_TYPE = {
  tableType: 1,
  chartType: 2,
};
Object.freeze(ACTION_TYPE);

const dataRender = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.tableType:
      return {
        ...state,
        dataList: action.dataList,
        loading: action.loading,
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

const ShowChart = () => {
  const [state, dispatch] = useReducer(
    dataRender,
    {
      dataList: [],
      loading: false,
      chartLoading: false,
      chartLabels: [],
      chartData: [],
    },
    initData
  );

  async function initData() {
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
          chart_loading: true,
        });
      });
  }

  const data = {
    labels: state.chartLabels,
    datasets: [
      {
        label: "First Dataset",
        data: state.chartData,
        borderColor: "black",
        backgroundColor: "yellow",
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default ShowChart;

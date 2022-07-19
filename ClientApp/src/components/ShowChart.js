import React from "react";
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

const ShowChart = ({ state }) => {
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

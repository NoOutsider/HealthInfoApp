import React from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    Filler,
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
    Filler,
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
            fill: true,
        lineTension : 0.5,
        label: "First Dataset",
        data: state.chartData,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
    };

    const options = {
        plugins: {
            datalabels: {
                display: true,
                color: "black",
                anchor: "top",
                align: "top",
                labels: "defined",
            }
        },
    };


  return (
    <div>
          <Line data={data} plugins={[ChartDataLabels]} options={options} />
    </div>
  );
};

export default ShowChart;

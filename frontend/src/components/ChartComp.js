import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  import {faker} from "@faker-js/faker";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  export const options = {
    responsive: true,maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { color: "white", beginAtZero: true },
        grid: {
          color: "rgb(255,255,255,0)"
        }
      },
      x: {
        ticks: { color: "white", beginAtZero: true },
        grid: {
          color: "rgb(255,255,255,0)"
        }
      }
    },
    plugins: {
      legend: {
        position: "top" ,
        display:false
      },
      title: {
        display: false,
        text: "Chart.js Line Chart"
      }
    }
  };

  const labels = ["1", "2","3", "4","5","6","7"];

  export const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgb(255, 165, 0)"
      }
    ]
  };

  
export default function ChartComp() {
  return (
    <div style={{
        margin:10,
        borderRadius:40,
        padding:20,
        height:240,
        background:"linear-gradient(180deg, rgba(17, 89, 118, 0.97) -3.55%, rgba(19, 77, 100, 0.81) 100%)"}}>
        <Line  options={options} data={data} />

    </div>
      )
}

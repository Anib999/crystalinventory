
import React from 'react'
import { ChartColor } from '../Common/ChartColor'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  Title
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
};

const BarChart = (props) => {
  const labels= props.labels
  const dataBar = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'paid',
        backgroundColor: ChartColor[4],
        data: props.data1,
        borderColor: [
          '#fff',
        ],
        borderWidth: 1,
      },
      {
        type: 'bar',
        label: 'unpaid',
        backgroundColor: ChartColor[1],
        data: props.data2,
        borderColor: [
          '#fff',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={dataBar}/>
    </div>
  )
}

export default BarChart

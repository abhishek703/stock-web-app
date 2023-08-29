import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  graphData: any[];
  dateRange: string[];
}


export function findMinMax(values: any) {
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  return { min: minValue, max: maxValue };
}

 export function normalizeValues(values: any) {
  const { label, data, borderColor, backgroundColor } = values;
  console.log("label : ", label);

  const { min, max } = findMinMax(data);
  const normalizedMin = 0;
  const normalizedMax = 1;

  const newData = values.data.map(
    (value: any) =>
      ((value - min) / (max - min)) * (normalizedMax - normalizedMin) +
      normalizedMin
  );

  return {
    label: label,
    data: newData,
    borderColor: borderColor,
    backgroundColor: backgroundColor,
  };
}

  const LineChart: React.FC<Props> = ({ graphData, dateRange }) => {
  


  const rangedGraphData = graphData.map((d: any) => normalizeValues(d));

  console.log("rangedGraphData : ", rangedGraphData);

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0, // Set the minimum value for the y-axis
        max: 1, // Set the maximum value for the y-axis
        beginAtZero: true, // Start the y-axis from zero
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = dateRange;

  const data = {
    labels,
    datasets: rangedGraphData,
  };

  return (
    <div data-testid="line-chart">
      <Line
        data-testid="normalized-dataset"
        options={options}
        data={data}
      />
    </div>
  );
};

export default LineChart;

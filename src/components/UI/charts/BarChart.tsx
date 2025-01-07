import { memo } from "react";
import { Bar } from "react-chartjs-2";
import { generateColors } from "../../../helpers";

interface BarChartProps {
  labels: string[];
  data: number[];
  chartLabel: string;
}

const BarChart = ({ labels, data, chartLabel }: BarChartProps) => {
  const backgroundColors = generateColors(data.length);
  const borderColors = backgroundColors.map((color) => color.replace("0.6", "1")); // Adjust opacity for borders

  const chartData = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data,
        backgroundColor: backgroundColors, // Dynamic colors
        borderColor: borderColors, // Dynamic borders
        borderWidth: 2,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default memo(BarChart);

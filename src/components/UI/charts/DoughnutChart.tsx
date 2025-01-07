import { memo, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { generateColors } from "../../../helpers";

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  chartLabel: string;
}

const DoughnutChart = ({ labels, data, chartLabel }: DoughnutChartProps) => {
  // Memoize the colors to avoid recalculation
  const backgroundColors = useMemo(() => generateColors(data.length), [data.length]);
  const borderColors = useMemo(
    () => backgroundColors.map(color => color.replace("0.6", "1")),
    [backgroundColors]
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default memo(DoughnutChart);

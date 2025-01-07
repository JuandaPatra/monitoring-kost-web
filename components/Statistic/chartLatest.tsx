"use client";
import { Line } from "react-chartjs-2";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { useStatisticStore } from "@/store/statisticStore";

export default function ChartLatest() {
  const { last7DaysLeads } = useStatisticStore();

  const data: ChartData<"line", number[], string> = {
    labels: last7DaysLeads?.map((item) => item.date),
    datasets: [
      {
        label: "Latest leads (7 Days)",
        data: last7DaysLeads?.map((item) => item.total),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {};
  return <Line options={options} data={data} />;
}

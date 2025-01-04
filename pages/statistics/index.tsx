import { Layout } from "@/components/Layout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  Title,
  Tooltip,
  Legend
);
import { useConfigStore } from "@/store/configStore";
import { useEffect } from "react";

interface ChartDataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

interface BarChartProps {
  data: ChartData<"bar", number[], string>;
  options?: ChartOptions<"bar">;
}

export default function Statistics() {
  const { propertyMostChosen, properties, fetchData } = useConfigStore();

  console.log(propertyMostChosen);

  useEffect(() => {
    fetchData();
  }, []);

  const data: ChartData<"bar", number[], string> = {
    labels: propertyMostChosen.map((item) => item.name),
    datasets: [
      {
        label: "Kostan paling banyak dicari",
        data: propertyMostChosen.map((item) => item.total),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Kostan paling banyak dicari",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
          callback: (value: string | number, index: number, ticks: any[]) => {
            const label = data.labels?.[index] as string;
            return label.length > 10 ? `${label.slice(0, 3)}...` : label;
          },
        },
      },

      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <>
      <Layout>
        <h1 className="text-2xl font-bold text-center">Statistics</h1>
        <div className=" overflow-x-auto lg:overflow-y-hidden">
          <div className="relative w-[600px] sm:w-full md:h-96">
            <Bar data={data} options={options} />
          </div>
        </div>
      </Layout>
    </>
  );
}

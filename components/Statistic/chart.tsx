"use client"
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
import { useStatisticStore } from "@/store/statisticStore";
import { useEffect } from "react";

export default function ChartMostSearch(){
    // const { propertyMostChosen, properties, fetchData } = useConfigStore();
    const {
        propertyMostChosen,
        
    } = useStatisticStore()

    // useEffect(() => {
    //     console.log('fetch')
    //     fetchData();
    //   }, []);

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
         <Bar data={data} options={options} />
        </>

    )

}
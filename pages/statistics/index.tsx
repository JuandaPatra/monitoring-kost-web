import { Layout } from "@/components/Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { useStatisticStore } from "@/store/statisticStore";
import { useEffect, useState } from "react";
import ChartMostSearch from "@/components/Statistic/chart";
import ChartLatest from "@/components/Statistic/chartLatest";


export default function Statistics() {
  const { fetchData } = useStatisticStore();
  useEffect(() => {
    console.log("load statistics page");
    fetchData();
  }, []);


  return (
    <>
      <Layout>
        <h1 className="text-2xl font-bold text-center pt-3 mb-3">Statistics</h1>
        <div className=" overflow-x-auto lg:overflow-y-hidden">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="relative w-[600px] sm:w-full md:h-h-[65%] bg-white p-3 rounded-xl">
              <ChartMostSearch />
            </div>
            <div className="relative w-[600px] sm:w-full md:h-[65%] bg-white p-3 rounded-xl">
              <div className="flex justify-end">
              {/* <Select id="countries" className=" w-36" required>
                <option value={0}>Weekly</option>
                <option value={1}>Monthly</option>
                <option value={2}>Yearly</option>
              </Select> */}
              </div>
              <ChartLatest />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

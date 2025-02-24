
import { useEffect } from "react";
import { PopupInsert } from "@/components/popup";
import { Layout } from "@/components/Layout";
import { HomeTable } from "@/components/Home/Table";

import { useConfigStore } from "@/store/configStore";




export default function Home() {
  const { fetchData} = useConfigStore();

  useEffect(()=>{
      fetchData()
  }, [])
  return (
    <div className="">
      <Layout>

        <PopupInsert />
        <HomeTable />

      </Layout>
    </div>
  );
}

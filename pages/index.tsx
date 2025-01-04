import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Button,
  Modal,
  Checkbox,
  Label,
  TextInput,
  Select,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { PopupInsert } from "@/components/popup";
import { Layout } from "@/components/Layout";
import { HomeTable } from "@/components/Home/Table";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
import { useConfigStore } from "@/store/configStore";
import Banner from "@/components/Home/Banner";
import { PopupEdit } from "@/components/PopupEdit";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const { fetchData} = useConfigStore();

  useEffect(()=>{
      fetchData()
  }, [])
  return (
    <>
      <Layout>

        <PopupInsert />
        <HomeTable />

      </Layout>
    </>
  );
}

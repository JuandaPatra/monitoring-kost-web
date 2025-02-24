"use client"

import React, {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import { DataTable } from '@/components/data-table'

import {columns, Leads} from '../../components/Table/index'
import axios from 'axios'
import { PopupForm } from '@/components/popupform'
import { Alert } from "flowbite-react";
import { Layout } from '@/components/Layout'
import { KostsTable } from '@/components/Kosts/Table'
import { PopupInsertKost } from '@/components/Kosts/popup/PopupInsertKost'




const Kosts = () => {

  const [data, setData] = useState<Leads[]>([]);
  const [pagination, setPagination]= useState({
    pageIndex : 0,
    pageSize : 0
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leads`);
        setData(response.data.data.data);
        setPagination({
          pageIndex : 1,
          pageSize : response.data.last_page
        })

      }catch(error){
        console.log(error)
      }
    }

    fetchData();
  }, [])



  return (
    <>
    <Layout>
      <PopupInsertKost />
      <KostsTable/>
    </Layout>
    </>
  )
}

export default Kosts
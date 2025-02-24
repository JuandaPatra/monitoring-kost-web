"use client";
import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatDate from "@/utils/formatDate";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  Row,
} from "@tanstack/react-table";

import { CiSearch } from "react-icons/ci";

import useCounterStore from "@/store/counterStore";
import useTableStore from "@/store/tableStore";
import { PopupEdit } from "@/components/PopupEdit";
import { useParams } from "next/navigation";
interface Lead {
  id: number;
  name: string;
  property_name: string;
  status: string;
  date: string;
  status_id : number;
}

interface ExportData {
  start_date: string | null;
  end_date: string | null;
}
export const HomeTable = () => {
  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    search,
    date,
    fetchData,
    setSearch,
    setPage,
    setDate,
  } = useTableStore();

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  const [inputSearch, setInputSearch] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedData, setSelectedData] = useState<Lead | null>(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Define columns
  const columnHelper = createColumnHelper<Lead>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("property_name", {
      header: "Property Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Tgl. Input",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "edit",
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => handleEdit(row)}
          className="bg-cyan-500 w-20  text-white px-3 py-1 rounded text-base"
        >
          Edit
        </button>
      ),
    }),
  ];

  const handleEdit = (e: Row<Lead>) => {
    console.log(e.original.id);
    setShowEditPopup(true);
    setSelectedData(e.original);
  };

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const CustomHeader = ({ date, decreaseMonth, increaseMonth }: any) => {
    const isPreviousDisabled = date <= oneWeekAgo;

    return (
      <div className="flex justify-between items-center p-2">
        <button
          onClick={decreaseMonth}
          disabled={isPreviousDisabled}
          className={`p-2 rounded ${
            isPreviousDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Prev
        </button>
        <span>
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button onClick={increaseMonth} className="p-2 rounded">
          Next
        </button>
      </div>
    );
  };

  const handleSearch = () => {
    setSearch(inputSearch);
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,

    onPaginationChange: ({ pageIndex }: any) => {
      setPage(pageIndex + 1);
    },
  });

  const handleChange = (event: Date) => {
    const dateFormat = event.toString();
    // alert(dateFormat);

    const date = FormatDate(dateFormat);
    console.log(event);
    setDate(date);
    fetchData();
  };

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const downloaddata = async () => {
    const params: ExportData = {
      start_date: startDate ?? "2024-12-31",
      end_date: endDate ?? "2025-01-02",
    };

    console.log('parameter', startDate, ' ', endDate);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/export-excel`,
        {
          params,
          responseType: "blob", // Penting untuk file binary
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Nama file unduhan (ganti sesuai kebutuhan)
      link.setAttribute("download", "data.xlsx");

      document.body.appendChild(link);
      link.click();
      link.remove();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-3">
      <PopupEdit
        show={showEditPopup}
        data={selectedData}
        onDismiss={() => setShowEditPopup(false)}
      />
      <h1 className="text-center text-xl text-cyan-500 font-bold mb-3">
        LEADS KOST
      </h1>
      {/* <div className="flex">
        <div className="col-5">
          <div>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              minDate={oneWeekAgo}
              className="w-[220px]"
              placeholderText="Pilih tanggal"
              startDate={startDate}
              endDate={endDate}
              selectsRange
            />
          </div>
        </div>
        <button
          className=" bg-cyan-500 py-[8px] rounded-r-md px-3 text-white border-2 "
          type="button"
          onClick={downloaddata}
        >
          Download
        </button>
      </div> */}
      <label htmlFor="search" className="mb-4 flex justify-end">
        <div className="flex items-center">

          <input
            id="search"
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className=" leading-[27px]"
            placeholder="search ..."
          />
          <button
            className="bg-cyan-500 text-white p-3 rounded-r-md hover:bg-cyan-600 transition"
            onClick={handleSearch}
          >
            <CiSearch size={20} />
          </button>
        </div>
      </label>
      <div className="overflow-x-auto mt-2 pb-5">
        <table className=" table-fixed w-[600px] lg:w-full  bg-white border border-gray-200 rounded-lg">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-2 my-4 ">
          <button
            onClick={() => setPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-cyan-500 text-white hover:bg-cyan-600"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={` py-1 rounded-md ${
                index + 1 === currentPage ? " text-cyan-500" : " text-cyan-400"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-cyan-500 text-white hover:bg-cyan-600"
            }`}
          >
            Next
          </button>
        </div>
        <div className="flex justify-center ">
          <p className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
};

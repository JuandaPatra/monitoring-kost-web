"use client";
import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";

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
interface Lead {
  id: number;
  name: string;
  property_name: string;
  status: string;
  date: string;
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
  const [ selectedData, setSelectedData] = useState<Lead |null>(null)

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
    setShowEditPopup(true)
    setSelectedData(e.original)    
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = FormatDate(event.target.value);
    setDate(date);
    fetchData();
  };
  return (
    <>
      <PopupEdit show={showEditPopup} data={selectedData }  onDismiss={()=>setShowEditPopup(false)} />
      <h1 className="text-center text-xl text-cyan-500 font-bold mb-3">
        LEADS KOST
      </h1>
      <div className="flex">
        <div className="col-3">
          <Datepicker className="w-[222px]" onSelect={handleChange} />
        </div>
      </div>
      <label htmlFor="search" className="mb-4 flex justify-end">
        <div className="flex items-center">
          <span>Search :</span>
          &nbsp;
          <input
            id="search"
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="border-transparent leading-[27px]"
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
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
    </>
  );
};

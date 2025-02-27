"use client";

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
import useKostStore from "@/store/tableKostStore";
import { PopupEditKost } from "../popup/PopupEditKost";
import Link from "next/link";

interface Kost {
  id: number;
  name: string;
  address: string;
  price: number;
  kost_owner: string;
}

export const KostsTable = () => {
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
  } = useKostStore();

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  const [inputSearch, setInputSearch] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
   const [selectedData, setSelectedData] = useState<Kost | null>(null);
  // Define columns
  const columnHelper = createColumnHelper<Kost>();
  const columns = [
    columnHelper.accessor("name", {
      header: () => <span className="font-bold text-lg py-3">Kost</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("address", {
      header: () => <span className="font-bold text-lg py-3">Alamat</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: () => <span className="font-bold text-lg py-3">Harga</span>,
      cell: (info) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(info.getValue()),
    }),
    columnHelper.accessor("kost_owner", {
      header: () => (
        <span className="font-bold text-lg py-3">Pemilik Kost</span>
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "edit",
      header: () => <span className="font-bold text-lg py-3">Actions</span>,
      cell: ({ row }) => (
        <div className=" flex">
        <button
          onClick={() => handleEdit(row)}
          className="bg-cyan-500 w-16  text-white px-2 py-1 rounded text-base mr-2"
        >
          Edit
        </button>
        <Link href={`rooms?id=${row.original.id}`} className="bg-yellow-500 w-16  text-white px-2 py-1 rounded block text-base">
        Kamar
        </Link>
        
        </div>
      ),
    }),
  ];


  const handleEdit = (e: Row<Kost>) => {
    console.log(e.original.id);
    setShowEditPopup(true);
    
  }
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

  return (
    <div className="px-3">

    <PopupEditKost
    show={showEditPopup}
    onDismiss={() => setShowEditPopup(false)}
    data={selectedData}
    />
      <h1 className="text-center text-xl text-cyan-500 font-bold mb-3 pt-2">
        LISTS KOST
      </h1>

      <label htmlFor="search" className="mb-4 flex justify-end">
        <div className="flex items-center">
          &nbsp;
          <input
            id="search"
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search..."
            className=" leading-[27px]"
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

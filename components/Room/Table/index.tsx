 import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    Row,
  } from "@tanstack/react-table";

  

export const RoomsTable = () => {
  return (
    <div className="px-3">
      <h1 className="text-center text-xl text-cyan-500 font-bold mb-3 pt-2">
        LIST KAMAR
      </h1>


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

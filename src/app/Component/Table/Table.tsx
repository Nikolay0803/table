"use client";

import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { data as initialData } from "./data";
import Image from "next/image";
import Search from "@/assets/search.svg?react";
import Arrowdown from "@/assets/arrowdown.svg?react";
import Arrow from "@/assets/arrow.svg?react";
import Edit from "@/assets/edit.svg?react";
import Trash from "@/assets/trash.svg?react";
import ThemeToggle from "./ThemeToggle";

interface DataRow {
  "Tracking ID": number;
  "Product Image": string;
  "Product Name": string;
  Customer: string;
  Date: string;
  Amount: number;
  "Payment Mode": string;
  Status: string;
}

const Table = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(initialData);
      localStorage.setItem("tableData", JSON.stringify(initialData));
    }
  }, []);

  const filteredData = data.filter((row) =>
    row["Product Name"].toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    const updatedData = data.filter((row) => row["Tracking ID"] !== id);
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="flex gap-6">
          <div className="flex items-center gap-3 mb-4 text-xs font-medium">
            <label htmlFor="rowsPerPage" className="mr-2">
              Show
            </label>
            <div className="relative">
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="py-2 pl-[9px] pr-[21px] border rounded-lg appearance-none bg-[#E0E0E0] text-black"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={filteredData.length}>Усі</option>
              </select>
              <div className="absolute inset-y-0 right-1 flex items-center pr-2 pointer-events-none">
                <Arrowdown className="w-2 h-2 text-gray-500" />
              </div>
            </div>
            <span>entries</span>
          </div>
          <div className="relative mb-4 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 pl-[33px] pr-[9px] border rounded text-xs font-medium"
            />
            <div className="absolute top-2 left-2">
              <Search className="w-4 h-4 text-[#9E9E9E]" />
            </div>
          </div>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-8 gap-4 text-center font-bold p-4">
        <div>Tracking ID</div>
        <div className="flex items-center justify-between">
          <p>Product</p>
          <Arrow />
        </div>
        <div className="flex items-center justify-between">
          <p>Customer</p>
          <Arrow />
        </div>
        <div className="flex items-center justify-between">
          <p>Date</p>
          <Arrow />
        </div>
        <div>Amount</div>
        <div>Payment Mode</div>
        <div className="flex items-center justify-between">
          <p>Status</p>
          <Arrow />
        </div>
        <div>Actions</div>
      </div>
      <div className="mb-4">
        {currentRows.map((row, index) => (
          <div
            key={row["Tracking ID"]}
            className={`grid grid-cols-8 gap-4 p-4 rounded ${
              index % 2 === 0
                ? "bg-[#F7F6FE] dark:bg-[#26264F]"
                : "bg-[#FFFFFF] dark:bg-[#1D1E42]"
            }`}
          >
            <div className="flex justify-center">{`#${row["Tracking ID"]}`}</div>
            <div className="flex gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src={row["Product Image"]}
                  alt={row["Product Name"]}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p>{row["Product Name"].split(" ")[0]}</p>
            </div>
            <div className="flex justify-center">{row.Customer}</div>
            <div className="flex justify-center">{row.Date}</div>
            <div className="flex justify-center">${row.Amount.toFixed(2)}</div>
            <div className="flex justify-center">{row["Payment Mode"]}</div>
            <div
              className={`
          px-3 py-2 flex justify-center rounded-lg
          ${row.Status === "Cancelled" ? "bg-[#FBE7E8] text-[#A30D11]" : ""} 
          ${row.Status === "Delivered" ? "bg-[#EBF9F1] text-[#1F9254]" : ""} 
          ${row.Status === "Process" ? "bg-[#FEF2E5] text-[#CD6200]" : ""}
         `}
            >
              {row.Status}
            </div>
            <div className="flex gap-4 justify-center">
              <button>
                <Edit className="w-6 h-6" />
              </button>
              <button onClick={() => handleDelete(row["Tracking ID"])}>
                <Trash className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {rowsPerPage < filteredData.length && (
        <Pagination
          currentPage={currentPage}
          totalRows={filteredData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Table;

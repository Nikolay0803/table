import React from "react";

interface PaginationProps {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    if (currentPage === 1) {
      endPage = Math.min(3, totalPages);
    } else if (currentPage === totalPages) {
      startPage = Math.max(totalPages - 2, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-[9px] py-2 rounded ${
            i === currentPage
              ? "bg-[#624DE3] text-white"
              : "bg-[#E0E0E0] dark:bg-[#141432] hover:bg-[#cfcfcf] dark:hover:bg-[#2e2e3e]"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const commonButtonClasses = "px-[9px] py-2 rounded";
  const disabledClasses = "bg-gray-100 cursor-not-allowed dark:bg-[#2e2e3e]";
  const enabledClasses = "hover:bg-[#26264F]";

  return (
    <div className="flex justify-center gap-3 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`${commonButtonClasses} ${
          currentPage === 1 ? disabledClasses : enabledClasses
        }`}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${commonButtonClasses} ${
          currentPage === totalPages ? disabledClasses : enabledClasses
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

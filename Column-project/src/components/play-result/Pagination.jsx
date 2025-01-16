/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Pagination = memo(function Pagination({ totalPage, url, currentPage }) {
  const [startPage, setStartPage] = useState(1); 
  console.log(currentPage)

  const endPage = Math.min(startPage + 9, totalPage); 

  // 페이지 번호 배열 생성
  const numberArray = useMemo(() => {
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [startPage, endPage]);

  const handlePrevious = () => {
    setStartPage(prev => Math.max(prev - 1, 1)); 
  };

  const handleNext = () => {
    setStartPage(prev => Math.min(prev + 1, totalPage - 9)); 
  };
  return (
    <>
    <div className="flex justify-center items-center gap-4 mb-4">
      {startPage > 1 && (
        <button onClick={handlePrevious} className="border-[1px] p-2 rounded-lg">
          ◀
        </button>
      )}

      {numberArray.map((ele) => (
        <Link
          key={ele}
          to={`${url}${ele}`}
          className={`border-[1px] p-2 rounded-lg text-lg ${currentPage == ele ? "bg-gray-500" : ""}`}
        >
          {ele}
        </Link>
      ))}

      {endPage < totalPage && (
        <button onClick={handleNext} className="border-[1px] p-2 rounded-lg">
          ▶
        </button>
      )}
    </div>
    </>
  );
})

export default Pagination;

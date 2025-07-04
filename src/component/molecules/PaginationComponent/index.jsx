"use client";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import classes from "./PaginationComponent.module.css";
import { RECORDS_LIMIT } from "@/const";

export default function PaginationComponent({
  totalRecords = 50,
  currentPage = 1,
  setCurrentPage = () => {},
}) {
  const totalPages = Math.ceil(totalRecords / RECORDS_LIMIT);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  if (totalPages <= 1) return null;

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.text}
      >{`Showing ${currentPage} of ${totalPages}`}</div>
      <div className="d-flex gap-2">
        <div onClick={goToPrevPage}>
          <div className={classes.iconBox}>
            <MdKeyboardArrowLeft size={20} />
          </div>
        </div>

        <div onClick={goToNextPage}>
          <div className={classes.iconBox}>
            <MdOutlineKeyboardArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import classes from "./TopHeader.module.css";
import { usePathname } from "next/navigation";
import { formatPathname } from "@/resources/utils/helper";

const TopHeader = ({ data, showBreadcrumb = true }) => {
  const pathname = usePathname();
  const formattedName = formatPathname(data ? data : pathname);

  return (
    <div className={classes?.TopHeader}>
      <h4>{formattedName}</h4>
      {showBreadcrumb && (
        <ul className={classes?.pageMenu}>
          <li>Home</li>
          <li>{formattedName}</li>
        </ul>
      )}
    </div>
  );
};

export default TopHeader;

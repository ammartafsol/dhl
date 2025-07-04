import React from "react";
import classes from "./BorderWrapper.module.css";

export default function BorderWrapper({ children, className }) {
  return (
    <div className={classes["outer-wrapper"]}>
      <div className={`${classes["inner-wrapper"]} ${className}`}>{children}</div>
    </div>
  );
}

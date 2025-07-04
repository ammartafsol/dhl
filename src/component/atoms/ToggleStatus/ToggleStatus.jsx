"use client";
import React from "react";
import classes from "./ToggleStatus.module.css";

const ToggleStatus = ({ checked = false, onChange }) => {
  const toggle = () => {
    onChange?.(!checked);
  };

  return (
    <div className={classes?.statusMain}>
      <div
        className={`${classes.toggleWrapper} ${
          checked ? classes.active : classes.inactive
        }`}
        onClick={toggle}
      >
        <div className={classes.toggleThumb}></div>
      </div>
      <span className={classes.label}>{checked ? "Active" : "Inactive"}</span>
    </div>
  );
};

export default ToggleStatus;

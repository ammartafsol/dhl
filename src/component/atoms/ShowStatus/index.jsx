import React from "react";
import classes from "./ShowStatus.module.css";
import { capitalizeFirstLetter } from "@/resources/utils/helper";

const ShowStatus = ({ status }) => {
  console.log("status",status);
  return (
    <div
      className={` ${classes.status} ${
        status === "pending" ? classes.pendingLight: status === 'rejected' || status === 'deactivate' ? classes?.rejectedLight : classes.activeLight
      }`}
    >
      <span
        className={classes.circle}
        style={{
          backgroundColor: status === "pending" ? "var(--pending-color)": status === 'rejected' || status === 'deactivate'?"var(--secondary-color-100)":"var(--success-color)",
        }}
      ></span>
      {capitalizeFirstLetter(status)}
    </div>
  );
};

export default ShowStatus;

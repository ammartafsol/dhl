import React from "react";
import classes from "./LayoutWrapper.module.css";

const LayoutWrapper = ({ children }) => {
  return <div className={classes.mainWrapper}>{children}</div>;
};

export default LayoutWrapper;

import React from "react";
import classes from "./NavigateButton.module.css";
import { BsArrowDown } from "react-icons/bs";

const NavigateButton = ({color}) => {
  return (
    <div className={classes.downBtn}>
      <span>
        <BsArrowDown color={color} size={30} />
      </span>
    </div>
  );
};

export default NavigateButton;

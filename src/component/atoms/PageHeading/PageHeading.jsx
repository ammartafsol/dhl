"use client";
import React from "react";
import classes from "./PageHeading.module.css";
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/navigation";
import Button from "../Button";

export default function PageHeading({
  showBackRoute = false,
  heading,
  btnLabel,
  onBtnClick = () => {},
}) {
  const router = useRouter();

  return (
    <div className={classes.mainDiv}>
      <div className={classes.left}>
        {showBackRoute && (
          <MdKeyboardBackspace
            size={32}
            className="cursorPointer"
            color="#BA3914"
            onClick={() => router.back()}
          />
        )}
        <h4 className={classes.heading}>{heading}</h4>
      </div>
      {btnLabel && (
        <Button label={btnLabel} onClick={onBtnClick} className={classes.btn} />
      )}
    </div>
  );
}

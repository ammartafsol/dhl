import React from "react";
import classes from "./AuthContainer.module.css";
import Image from "next/image";

const AuthContainer = ({ children }) => {
  return (
    <div className={classes?.container}>
      <div className={classes?.child}>
        <div className={classes.logo}>
          <Image src={"/Images/app-images/logo.png"} fill alt="logo" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;

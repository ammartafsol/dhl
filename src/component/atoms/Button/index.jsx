"use client";
import React from "react";
import classes from "./Button.module.css";

// Variants
const Button = ({
  label,
  customStyle,
  onClick,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  className = "",
  variant,
  type,
  ...props
}) => {
  return (
    <>
      <button
        type={type}
        style={{ ...customStyle, border: "none" }}
        onClick={onClick}
        disabled={disabled}
        color-variant={variant}
        className={` ${classes.btn} ${className} `}
        {...props}
      >
        {leftIcon && leftIcon}
        {label && <span>{label}</span>}

        {children && <>{children}</>}
        {rightIcon && rightIcon}
      </button>
    </>
  );
};

export default Button;

"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import classes from "./Input.module.css";
import { InputGroup } from "react-bootstrap";
import { NUMBER_REG_EX } from "@/const";

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  type,
  label,
  label2, // sub label
  value, // input value
  setter, // setValue function
  noBorder,
  placeholder,
  disabled,
  error,
  parentCustomStyle, // Main Div Inline Style
  customStyle, // Input Container inline Style
  inputStyle, // Input inline Style
  labelStyle, // Label inline Style
  errorText, // Error Text
  leftIcon, // Icon For Input
  rightIcon,
  regexType,
  labelOnTop = false,
  prefix = "",
  mainContClassName = "",
  inputBoxStyle,
  onClickEnter = () => {},
  ...props
}) => {
  const [passToggle, setPassToggle] = useState(false);

  let inputContainerStyleObject = {
    ...((error || errorText) && { border: "1px solid red" }),
    ...(leftIcon && { paddingLeft: "50px" }),
  };

  return (
    <div
      className={`${[
        classes.Container,
        labelOnTop ? classes.labelOnTop : "",
        mainContClassName,
      ].join(" ")}`}
      style={typeof parentCustomStyle === "object" ? parentCustomStyle : {}}
    >
      {label && (
        <label
          htmlFor={`input${label}`}
          className={`${[
            classes.labelText,
            disabled && classes.disabled,
            labelOnTop ? classes.onTopLabel : "",
          ].join(" ")}`}
          style={typeof labelStyle === "object" ? labelStyle : {}}
        >
          {label} {label2 && label2}
        </label>
      )}
      <div
        className={classes.inputPassContainer}
        style={typeof customStyle === "object" ? customStyle : {}}
      >
        {prefix && (
          <InputGroup.Text id="basic-addon1" className={classes?.prefix}>
            {prefix}
          </InputGroup.Text>
        )}
        {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
        <input
          value={value}
          onKeyDown={(e) => {
            if (type === "number" && ["e", "E", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
            if (e.key === "Enter") {
              onClickEnter && onClickEnter();
            }
          }}
          onChange={(e) => {
            if (setter) {
              if (regexType === "number" || type === "number") {
                setter(e?.target?.value?.replace(NUMBER_REG_EX, ""));
              } else {
                setter(e.target.value);
              }
            }
          }}
          disabled={disabled}
          placeholder={placeholder}
          type={passToggle ? "text" : type}
          id={`input${label}`}
          className={`${[
            classes.inputBox,
            leftIcon && classes.paddingLeft,
            noBorder && classes.noBorder,
            inputBoxStyle,
          ].join(" ")}`}
          style={{
            ...inputContainerStyleObject,
            ...(typeof inputStyle === "object" ? inputStyle : {}),
          }}
          {...props}
        />
        {rightIcon && <div className={classes.rightIcon}>{rightIcon}</div>}

        {/* Password Toggle Icons - Removed "setter" Prop */}
        {type === "password" && (
          <span
            onClick={() => setPassToggle(!passToggle)}
            className={classes.passwordIcon}
          >
            {passToggle ? (
              <AiOutlineEye fontSize={25} />
            ) : (
              <AiOutlineEyeInvisible fontSize={25} />
            )}
          </span>
        )}
      </div>
      {errorText && (
        <p className={`${classes.mt2} ${classes.errorText}`}>{errorText}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["text", "password", "email", "number"]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setter: PropTypes.func, // ✅ Ensures setter is a function
  noBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  customStyle: PropTypes.object,
  errorText: PropTypes.string,
  label2: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  regexType: PropTypes.string,
  labelOnTop: PropTypes.bool,
  prefix: PropTypes.string,
  mainContClassName: PropTypes.string,
  inputBoxStyle: PropTypes.object,
  onClickEnter: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
  placeholder: "Enter text",
  value: "",
  setter: () => {}, // ✅ Default function to prevent errors
  noBorder: false,
  disabled: false,
  errorText: "",
  leftIcon: null,
  rightIcon: null,
  regexType: "",
  labelOnTop: false,
  prefix: "",
  mainContClassName: "",
  inputBoxStyle: {},
  onClickEnter: () => {},
};

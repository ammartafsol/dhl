"use client";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ReactSelect, { components } from "react-select";
import classes from "./DropDown.module.css";

const DropDown = ({
  options,
  label,
  customStyle,
  disabled,
  value,
  setValue,
  placeholder,
  isMulti,
  style,
  leftIcon,
  Components,
  labelClassName,
  indicatorColor = "#3F78A3",
  optionLabel,
  optionValue,
  selectRef,
  isSearchable = false,
  borderRadius = "5px",
  mainContainerClass,
  classNamePrefix,
  customContainerClass,
  variant = "",
  border,
  customContainerStyle,
  inputClass,
  containerClass,
  iconClass,
  errorText,
  isLoading,
  onMenuScrollToBottom,
  hasMore,
  ...props
}) => {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {props.isFocused ? (
          <MdKeyboardArrowUp size={16} color={indicatorColor} />
        ) : (
          <MdKeyboardArrowDown size={16} color={indicatorColor} />
        )}
      </components.DropdownIndicator>
    );
  };

  const ShowMoreButton = () => {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onMenuScrollToBottom();
        }}
        style={{
          padding: '8px 12px',
          textAlign: 'center',
          color: '#3F78A3',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderTop: '1px solid #eee',
          backgroundColor: '#f8f9fa',
          cursor: 'pointer',
          fontWeight: '500',
          userSelect: 'none',
          outline: 'none'
        }}
      >
        Show More
      </div>
    );
  };

  const Menu = ({ children, ...props }) => {
    return (
      <components.Menu {...props}>
        {children}
      </components.Menu>
    );
  };

  const LoadingIndicator = () => {
    return (
      <div style={{ 
        padding: '8px 12px', 
        textAlign: 'center', 
        color: '#666',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        Loading...
      </div>
    );
  };

  const NoOptionsMessage = () => {
    return (
      <div style={{ 
        padding: '8px 12px', 
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        No options available
      </div>
    );
  };

  const dropDownStyle = {
    control: (styles, { isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? "var(--disabled-input-color)"
        : "var(--white-color)",
      borderRadius: borderRadius,
      color: "var(--Gray-700)",
      boxShadow: "none",
      fontFamily: "var(--inter)",
      width: "100%",
      fontSize: "16px",
      cursor: "pointer",
      border: errorText 
        ? "1px solid red" 
        : border 
          ? `1px solid #e4e7e9` 
          : `1px solid var(--input-border)`,
      padding: "1px 15px",
      background: "transparent",
      height: "40px",
      ...customStyle,
      ":hover": {
        ...styles[":hover"],
        borderColor: errorText ? "red" : "var(--input-border-active)",
      },
      ":placeholder": {
        ...styles[":placeholder"],
        color: "var(--Grey-900)",
        fontSize: "14px",
        fontWeight: "400",
      },
      ":active": {
        ...styles[":active"],
        color:"black",
        borderColor: errorText ? "red" : "var(--input-border-active)",
      },
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "var(--Gray-500)",
        textTransform: "capitalize",
        fontFamily: "var(--inter)",
        fontSize: "14px",
      };
    },

    option: (styles, { isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "var(--input-border-active)" : "transparent",
        color: isSelected ? "black" : "var(--text-color)",
        padding: "8px 12px",
        fontFamily: "var(--inter)",
        fontWeight: 400,
        fontSize: "14px",
        ":active": {
          ...styles[":active"],
          color: "black",
          backgroundColor: "var(--light-gray-100)",
          borderRadius: "4px",
        },
        ":hover": {
          ...styles[":hover"],
          color: "black",
          backgroundColor: "var(--light-gray-100)",
          cursor: "pointer",
          borderRadius: "4px",
        },
      };
    }
    ,

    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "var(--primary-color)",
        borderRadius: "5px",
        // padding: "4px 8px",
        fontSize: "16px",
        fontFamily: "var(--inter)",
        fontWeight: 400,
      };
    },
    singleValue: (styles) => {
      return {
        ...styles,
        fontSize: "14px",
        fontFamily: "var(--inter)",
        fontWeight: 300,
        color: "var(--black-color)",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#fff",
      fontWeight: 400,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      fontSize: "14px",
      color: "#fff",
      ":hover": {
        color: "var(--white-color)",
      },
    }),
    menu: (styles) => ({
      ...styles,
      maxHeight: '300px'
    }),
    menuList: (styles) => ({
      ...styles,
      maxHeight: '300px',
      overflowY: 'auto'
    })
  };
  return (
    <div
      className={`${[classes.Container].join(" ")} ${containerClass}  ${
        classes?.mainContainerClass
      }`}
      data-variant={variant}
    >
      <style>{`
        .DropdownOptionContainer__menu {
          margin: 0px;
          border: 0px;
        }
        .DropdownOptionContainer__single-value {
          color: var(--text-black-clr)
        }
        .DropdownOptionContainer__menu {
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
        }
        .css-hlgwow{
           padding: 0px 8px 0px 0px;
        }
        .css-1wy0on6{
        height: fit-content;
        margin: auto;
        }
        .css-1xc3v61-indicatorContainer, .css-15lsz6c-indicatorContainer,.css-1dyz3mf {
          padding: 0px;
        }
        .DropdownOptionContainer__loading-indicator {
          display: none;
        }
      `}</style>
      {label && (
        <label
          htmlFor={`dropdown${label}`}
          className={`${[
            classes.label,
            labelClassName && labelClassName,
            disabled && classes.disabled,
          ].join(" ")}`}
        >
          {label}
        </label>
      )}

      <div
        className={[classes.dropdownContainer, customContainerClass].join(" ")}
        style={{ ...customContainerStyle }}
      >
        <ReactSelect
          inputId={`dropdown${label}`}
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
          className={[classes.reactSelect, inputClass].join(" ")}
          isMulti={isMulti}
          isDisabled={disabled}
          placeholder={placeholder}
          options={options}
          styles={{ ...dropDownStyle, ...style }}
          isClearable={false}
          isSearchable={isSearchable}
          isLoading={isLoading}
          loadingMessage={() => <LoadingIndicator />}
          classNamePrefix={`DropdownOptionContainer ${
            classNamePrefix && classNamePrefix
          }`}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: (e) => DropdownIndicator(e),
            Menu,
            NoOptionsMessage,
            ...Components,
          }}
          getOptionLabel={(option) => {
            return optionLabel ? option[optionLabel] : option.label;
          }}
          getOptionValue={(option) =>
            optionValue ? option[optionValue] : option.value
          }
          onMenuScrollToBottom={onMenuScrollToBottom}
          ref={selectRef}
          {...props}
        />
        {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
      </div>
      {errorText && (
        <p className={`mt-2 ${[classes.errorText].join(" ")}`}>{errorText}</p>
      )}
    </div>
  );
};

export default DropDown;

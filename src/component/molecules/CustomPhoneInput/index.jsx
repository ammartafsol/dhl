import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import classes from "./CustomPhoneInput.module.css"; // Import the CSS Module

const CustomPhoneInput = ({
  value,
  setValue,
  label,
  errorText,
  labelStyle = {},
  disabled = false,
}) => {
  const [error, setError] = useState("");
  const showError = errorText || error;
  const handlePhoneChange = (phone) => {
    const phoneNumberObj = parsePhoneNumberFromString(`+${phone}`);
    if (phoneNumberObj !== undefined && phoneNumberObj?.country) {
      const isValid = isValidPhoneNumber(
        phoneNumberObj.nationalNumber,
        phoneNumberObj?.country
      );
      setValue({
        callingCode: phoneNumberObj.countryCallingCode,
        phoneNumber: phoneNumberObj.nationalNumber,
      });
      if (!isValid) {
        setError("Invalid phone number");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  };

  return (
    <div className={classes.container}>
      {label && (
        <label
          style={{ ...labelStyle }}
          className={`${[classes.label, disabled && classes.labelDisabled].join(
            " "
          )}`}
        >
          {label}
        </label>
      )}
      <PhoneInput
        country={"us"}
        value={value}
        onChange={handlePhoneChange}
        containerClass={classes.phoneContainer}
      />
      {showError && <p className={`${classes.errorText}`}>{showError}</p>}
    </div>
  );
};

export default CustomPhoneInput;

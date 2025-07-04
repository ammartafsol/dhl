import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";

import { useEffect } from "react";
import classes from "./PlacesInput.module.css";
import { mergeClass } from "@/resources/utils/helper";

export default function PlacesInput({
  setLocationData,
  address,
  label,
  placeholder = "Search address",
  className,
  leftIcon,
  types,
  rightIcon,
  errorText,
  labelTextStl,
}) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      ...(types && { types }),
    },
  });

  useEffect(() => {
    if (address == "") {
      setValue("", false);
      clearSuggestions();
    }
  }, [address]);

  //   handleSelect
  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const zipcode = getZipCode(results[0], false);
    const { lat, lng } = getLatLng(results[0]);

    let country = "";
    let city = "";
    let state = "";

    let addrComp = results[0].address_components;
    for (let i = 0; i < addrComp.length; ++i) {
      if (addrComp[i].types.includes("administrative_area_level_1"))
        state = addrComp[i].long_name;
      else if (addrComp[i].types.includes("locality"))
        city = addrComp[i].long_name;
      else if (addrComp[i].types.includes("country"))
        country = addrComp[i].long_name;
      //we can break early if we find all three data
      if (state != "" && city != "" && country != "") break;
    }
    setLocationData({
      address: val,
      state,
      city,
      country,
      zipcode,
      lat,
      lng,
    });
  };
  useEffect(() => {
    setValue(address, false);
    clearSuggestions();
  }, []);
  return (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <Combobox
        onSelect={handleSelect}
        className={`${className ? className : ""}`}
      >
        {label && (
          <label
            className={`fs-16 fw-700 ${[classes.labelText, labelTextStl].join(
              " "
            )}`}
          >
            {label}
          </label>
        )}
        <div className={classes.inputDiv}>
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (e.target.value == "") {
                setLocationData && setLocationData(null);
                setValue("", false);
                clearSuggestions();
              }
            }}
            disabled={!ready}
            className={`fs-14 fw-400 ${classes["comboboxInput"]}`}
            style={{
              paddingLeft: leftIcon ? "50px" : "16px",
              paddingRight: rightIcon ? "40px" : "16px",
            }}
            placeholder={placeholder}
          />

          {leftIcon && <span className={classes.leftIcon}>{leftIcon}</span>}
          {rightIcon && address && (
            <div className={mergeClass(classes.rightIconBox)}>{rightIcon}</div>
          )}

          <ComboboxList className={classes.comboBoxList}>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </div>
        {errorText && <p className={`mt-2 text-danger`}>{errorText}</p>}
      </Combobox>
    </form>
  );
}

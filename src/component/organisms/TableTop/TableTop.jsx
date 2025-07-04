import React from "react";
import classes from "./TableTop.module.css";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import { IoSearchSharp } from "react-icons/io5";
import DropDown from "@/component/molecules/DropDown/DropDown";
import FilterTabs from "@/component/atoms/FilterTabs/FilterTabs";

export default function TableTop({
  heading = "Merchants",
  showHeading = false,
  showButton = true,
  btnLabel = "Add New Merchant",
  placeholder1 = "Status",
  placeholder2 = "Date",
  showDate = true,
  placeholder3 = "",
  placeholder4 = "",
  onBtnClick = () => {},
  loading,
  walletFilters = false,
  onDateChange = () => {},
  showFilter = true,
  showSearch = true,
  statusValue,
  setStatusValue,
  filterType,
  search,
  setSearch,
  date,
  setDate,
  showDateInput = true,
  isDatePlaceholder = false,
  showPlaceholder1Dropdown = true,
}) {
  return (
    <div className={classes?.tableTop}>
      {(showHeading || showPlaceholder1Dropdown) && (
        <div className={classes.left}>
          {showHeading && <h4 className={classes.heading}>{heading}</h4>}
          {!showHeading && showPlaceholder1Dropdown && (
            <FilterTabs showHeading={false}>
              <DropDown
                placeholder={placeholder1}
                value={statusValue}
                setValue={setStatusValue}
                options={filterType}
              />
              {isDatePlaceholder && showDate ? (
                showDateInput ? (
                  <Input
                    type="date"
                    placeholder={placeholder2}
                    mainContClassName={classes.mainContClassName}
                    customStyle={{ minWidth: "150px" }}
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    setter={setDate}
                  />
                ) : (
                  <span className={classes.datePlaceholder}>{placeholder2}</span>
                )
              ) : null}
            </FilterTabs>
          )}
        </div>
      )}
      <div className={classes.right}>
        {!walletFilters && showSearch ? (
          <Input
            placeholder={"Search"}
            value={search}
            setter={setSearch}
            rightIcon={<IoSearchSharp size={24} color="#BA3914" />}
            mainContClassName={classes.mainContClassName}
            inputBoxStyle={classes.inputBoxStyle}
          />
        ) : (
          showFilter && (
            <FilterTabs>
              <DropDown
                containerClass={classes.dropDownContainer}
                placeholder={placeholder1}
                options={[]}
              />
              {placeholder2 === "Date" ? (
                <Input
                  type="date"
                  placeholder={placeholder2}
                  mainContClassName={classes.mainContClassName}
                  customStyle={{ minWidth: "150px" }}
                  onChange={(e) => onDateChange(e.target.value)}
                />
              ) : (
                <DropDown placeholder={placeholder2} options={[]} />
              )}
              {
                <DropDown
                  placeholder={placeholder3}
                  containerClass={classes.dropDownContainer}
                  options={[
                    { label: "Discount", value: "discount" },
                    { label: "Loyalty Discount", value: "loyalty" },
                  ]}
                />
              }
              {
                <DropDown
                  placeholder={placeholder4}
                  options={[
                    { label: "Completed", value: "completed" },
                    { label: "Pending", value: "pending" },
                  ]}
                />
              }
            </FilterTabs>
          )
        )}
        {showButton && (
          <Button
            label={loading === 'csv'?"loading...":btnLabel}
            className={classes.btn}
            onClick={onBtnClick}
            disabled={loading === 'csv'}
          />
        )}
      </div>
    </div>
  );
}

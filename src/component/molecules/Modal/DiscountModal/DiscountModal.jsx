"use client";
import React, { useEffect, useState } from "react";
import classes from "./DiscountModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { useFormik } from "formik";
import { DiscountCoupon } from "@/formik/formikInitialValues/form-initial-values";
import { DiscountCouponSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import RenderToast from "@/component/atoms/RenderToast";


const DiscountModal = ({ show, setShow,getDiscountData }) => {
  

  const [buyerOptions, setBuyerOptions] = useState([]);
  const {Post, Get} = useAxios();
  const [loading,setLoading] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);

  const discountFormik = useFormik({
    initialValues: DiscountCoupon,
    validationSchema: DiscountCouponSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const getAllBuyers = async () => {
    setLoading("loading");
    const {response} = await Get({
      route: `vouchers/customer/all?limit=1000`
    });
    if(response){
      setTotalRecords(response?.data?.totalRecords);
      const formattedData = response?.data?.data?.map(user => ({
        label: user.fullName,
        value: user.slug
      }));
      setBuyerOptions(formattedData);
    }
    setLoading("");
  }

  const handleSubmit = async (values) => {
    setLoading("load");
    const body = {
      "userSlugs": values.buyer?.map(item => item.value),
      "code": values.discountCode,
      "percentage": Number(values.percentage),
      "startDate": values.startedDate,
      "endDate": values.endDate
    }
    const {response} = await Post({route:"vouchers/create",data:body});
    if(response){
      RenderToast({message:"Discount created successfully",type:"success"});
      setShow(false);
      getDiscountData();
      discountFormik.resetForm();
    }
    setLoading("");
  };

  useEffect(() => {
    if (show) {
      getAllBuyers();
    }
  }, [show]);

  return (
    <ModalSkeleton header={"Create new discount"} show={show} setShow={setShow}>
      <div className={classes.content}>
        <DropDown
          label={"Select Buyer"}
          placeholder={"Select buyer"}
          containerClass={classes.dropdownContainer}
          options={buyerOptions}
          value={discountFormik.values.buyer}
          setValue={(e) => {
            discountFormik.setFieldValue("buyer", e);
          }}
          errorText={
            discountFormik.touched.buyer && discountFormik.errors.buyer
          }
          isMulti={true}
          isSearchable={true}
          isLoading={loading === "loading"}
        />
        <Input
          label={"Discount Code"}
          placeholder={"Enter discount code"}
          mainContClassName={classes.inputContainer}
          setter={(e) => {
            discountFormik.setFieldValue("discountCode", e);
          }}
          value={discountFormik.values.discountCode}
          errorText={
            discountFormik.touched.discountCode &&
            discountFormik.errors.discountCode
          }
        />
        <Input
          label={"Percentage"}
          placeholder={"Enter discount percentage"}
          type="number"
          mainContClassName={classes.inputContainer}
          setter={(e) => {
            discountFormik.setFieldValue("percentage", e);
          }}
          value={discountFormik.values.percentage}
          errorText={
            discountFormik.touched.percentage &&
            discountFormik.errors.percentage
          }
        />
        <div className={classes.dateContainer}>
          <Input
            label={"Start Date"}
            type="date"
            mainContClassName={classes.dateInput}
            setter={(e) => {
              discountFormik.setFieldValue("startedDate", e);
            }}
            value={discountFormik.values.startedDate}
            errorText={
              discountFormik.touched.startedDate &&
              discountFormik.errors.startedDate
            }
          />
          <Input
            label={"End Date"}
            type="date"
            mainContClassName={classes.dateInput}
            setter={(e) => {
              discountFormik.setFieldValue("endDate", e);
            }}
            value={discountFormik.values.endDate}
            errorText={
              discountFormik.touched.endDate && discountFormik.errors.endDate
            }
          />
        </div>
        <div className={classes.btn}>
          <Button
            className={classes.cancel}
            onClick={() => {setShow(false);discountFormik.resetForm()}}
            label={"Back"}
            disabled={loading === "load"}
            variant={"outlined"}
          />
          <Button
            className={classes.send}
            onClick={() => discountFormik.handleSubmit()}
            label={loading === "load" ? "Loading..." : "Send"}
            disabled={loading === "load"}
          />
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default DiscountModal;

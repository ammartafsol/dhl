"use client";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import PageHeading from "@/component/atoms/PageHeading/PageHeading";
import RenderToast from "@/component/atoms/RenderToast";
import UploadImageBox from "@/component/molecules/UploadImageBox";
import useAxios from "@/interceptor/axiosInterceptor";
import { CreateFormData } from "@/resources/utils/helper";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import classes from "./ProfileSettingTemplate.module.css";
import { updateUserData } from "@/store/auth/authSlice";

const ProfileSettingTemplate = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");
  const { user } = useSelector((state) => state.authReducer);
  console.log("🚀 ~ ProfileSettingTemplate ~ user:", user);
  const { Patch } = useAxios();

  const initialValues = {
    photo: null,
    fullName: "",
    email: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const profileFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (user) {
      profileFormik.setValues({
        photo: user.photo || null,
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleSubmit = async (values) => {
    setLoading("loading");
    const formData = CreateFormData(values);

    const { response } = await Patch({
      route: "users/update/me",
      isFormData: true,
      data: formData,
    });

    if (response) {
      console.log("🚀 ~ handleSubmit ~ response22:", response?.data?.user);
      dispatch(updateUserData(response?.data?.user));
      RenderToast({
        message: "Profile updated successfully",
        type: "success",
      });
    }
    setLoading("");
  };

  return (
    <Container>
      <PageHeading heading="Profile Settings" showBackRoute />
      <BorderWrapper className={classes.borderWrapper}>
        <div className={classes.mainPadding}>
          <UploadImageBox
            containerClass={classes.uploadImageContainerClass}
            hideDeleteIcon={true}
            state={profileFormik.values.photo}
            uploadImageBox={classes.uploadImageBox}
            setter={(file) => profileFormik.setFieldValue("photo", file)}
            onDelete={() => profileFormik.setFieldValue("photo", null)}
            imgClass={classes.uploadImage}
            label={"Profile Photo"}
          />

          <div className={classes.form}>
            <div className={classes.Inputs}>
              <Input
                label="Full Name"
                placeholder="Enter full name"
                value={profileFormik.values.fullName}
                setter={profileFormik.handleChange("fullName")}
                errorText={
                  profileFormik.touched.fullName &&
                  profileFormik.errors.fullName
                }
              />
              <Input
                label="Email"
                placeholder="Enter email"
                value={profileFormik.values.email}
                disabled={true}
                // className={classes.disabledInput}
              />
            </div>

            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              value={profileFormik.values.phoneNumber}
              setter={profileFormik.handleChange("phoneNumber")}
              errorText={
                profileFormik.touched.phoneNumber &&
                profileFormik.errors.phoneNumber
              }
            />

            <Button
              label={loading === "loading" ? "Please wait..." : "Save Changes"}
              className={classes.btn}
              disabled={loading === "loading"}
              onClick={profileFormik.handleSubmit}
            />
          </div>
        </div>
      </BorderWrapper>
    </Container>
  );
};

export default ProfileSettingTemplate;

"use client";

import React, { useState } from "react";
import classes from "./ForgotPasswordTemplate.module.css";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import { Container } from "react-bootstrap";
import { FORGET_PASSWORD_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { ForgetPasswordSchema } from "@/formik/formikSchema/formik-schemas";
import { useFormik } from "formik";
import RenderToast from "@/component/atoms/RenderToast";
import Cookies from "js-cookie";
import { handleEncrypt } from "@/resources/utils/helper";
import { useRouter } from "next/navigation";
import useAxios from "@/interceptor/axiosInterceptor";

const ForgotPasswordTemplate = () => {
  const router = useRouter();
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");

  const expiryDate = new Date(new Date().getTime() + 10 * 60 * 1000);

  const forgotPasswordFormik = useFormik({
    initialValues: FORGET_PASSWORD_FORM_VALUES,
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");
    const { response } = await Post({
      route: "auth/forgot/password",
      data: values,
    });
    if (response) {
      RenderToast({
        type: "success",
        message: "OTP has been sent to this email",
      });
      Cookies.set("email", handleEncrypt(values?.email), {
        expires: expiryDate,
      });
      router.push("/otp-verification");
    }
    setLoading("");
  };

  return (
    <Container>
      <div className={classes?.forgotPassword}>
        <h5>Forgot Password</h5>
        <div>
          <Input
            inputBoxInput={classes?.inputBoxInput}
            label={"Email"}
            placeholder={"Enter your email address"}
            value={forgotPasswordFormik.values.email}
            setter={forgotPasswordFormik.handleChange("email")}
            errorText={
              forgotPasswordFormik.touched.email &&
              forgotPasswordFormik.errors.email
            }
          />
          <Button
            className={classes?.btn}
            label={loading === "loading" ? "Please wait..." : "Send Reset Link"}
            onClick={forgotPasswordFormik.handleSubmit}
            disabled={loading === "loading"}
          />
        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordTemplate;

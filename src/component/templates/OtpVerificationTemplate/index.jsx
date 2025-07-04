"use client";

import React, { useEffect, useState } from "react";
import classes from "./OtpVerificationTemplate.module.css";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import useAxios from "@/interceptor/axiosInterceptor";
import Cookies from "js-cookie";
import { handleDecrypt, handleEncrypt } from "@/resources/utils/helper";
import RenderToast from "@/component/atoms/RenderToast";
import { VerifyOtpSchema } from "@/formik/formikSchema/formik-schemas";
import { OTP_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";

const OtpVerificationTemplate = () => {
  const router = useRouter();
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");
  const [loadingOtp, setLoadingOtp] = useState("");

  const email = handleDecrypt(Cookies.get("email"));
  const expiryDate = new Date(new Date().getTime() + 10 * 60 * 1000);

  const verifyOtpFormik = useFormik({
    initialValues: OTP_FORM_VALUES,
    validationSchema: VerifyOtpSchema,
    onSubmit: (values) => {
      handleOTPForm(values);
    },
  });

  console.log(verifyOtpFormik.errors);

  // otp Send
  const handleOTPForm = async (values) => {
    const payload = {
      email,

      code: values?.otp,
      fromForgotPassword: true,
    };

    setLoading("submit");
    const response = await Post({
      route: "auth/verify/otp",
      data: payload,
    });

    if (response) {
      Cookies.set("otpCode", handleEncrypt(payload?.code), {
        expires: expiryDate,
      });
      RenderToast({
        message: "OTP verified Successfully!",
        type: "success",
      });
      router.push("/reset-password");
    }

    setLoading("");
  };

  // Resend Api
  // const onResend = async (values) => {
  //   const payload = {
  //     email,
  //     code: String(values?.otp),
  //     fromForgotPassword: true,
  //   };
  //   setLoadingOtp("submit");
  //   const response = await Post({
  //     route: "auth/resend/otp",
  //     data: payload,
  //   });
  //   if (response) {
  //     RenderToast(`Verification code has been sent to your email.`, "success");
  //   }
  //   setLoadingOtp("");
  // };

  useEffect(() => {
    if (!email) {
      RenderToast(`Email is expired, Please Try Again`, "error");
      router.push("/forgot-password");
    }
  }, []);

  return (
    <Container>
      <div className={classes?.otpVerification}>
        <h5>OTP Verification</h5>
        <p>Enter the verification code sent to your email</p>
        <div>
          <Input
            inputBoxInput={classes?.inputBoxInput}
            label={"OTP Code"}
            placeholder={"Enter 6-digit code"}
            maxLength={6}
            value={verifyOtpFormik.values.otp}
            setter={verifyOtpFormik.handleChange("otp")}
            errorText={
              verifyOtpFormik.touched.otp && verifyOtpFormik.errors.otp
            }
          />
          <Button
            className={classes?.btn}
            label={loading ? "Verifying..." : "Verify OTP"}
            loading={loading}
            onClick={verifyOtpFormik.handleSubmit}
          />
          <p className={classes.resendText}>
            Didn't receive code?{" "}
            <span className={classes.resendLink}>Resend</span>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default OtpVerificationTemplate;

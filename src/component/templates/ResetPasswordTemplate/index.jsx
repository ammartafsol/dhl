"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { RESET_PASSWORD_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { ResetPasswordSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { handleDecrypt } from "@/resources/utils/helper";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./ResetPasswordTemplate.module.css";

const ResetPasswordTemplate = () => {
  const router = useRouter();
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");

  const email = handleDecrypt(Cookies.get("email"));
  const otpCode = handleDecrypt(Cookies.get("otpCode"));

  const resetPasswordFormik = useFormik({
    initialValues: RESET_PASSWORD_FORM_VALUES,
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    const payload = {
      email: email,
      password: values?.password,
      confirmPassword: values?.confirmPassword,
      code: otpCode,
    };

    setLoading("loading");
    const response = await Post({
      route: "auth/reset/password",
      data: payload,
    });

    if (response) {
      RenderToast({
        message: "Password Updated Successfully, Please Login to Continue...",
        type: "success",
      });
      Cookies.remove("resetPasswordEmail");
      Cookies.remove("otpCode");
      router.push("/sign-in");
    }
    setLoading("");
  };

  useEffect(() => {
    if (!email || !otpCode) {
      RenderToast(!email ? `Email is expired` : `Code is expired`, "error");
      router.push("/forgot-password");
    }
  }, []);

  return (
    <Container>
      <div className={classes?.resetPassword}>
        <h5>Reset Password</h5>
        <div>
          <Input
            inputBoxInput={classes?.inputBoxInput}
            label={"New Password"}
            type={"password"}
            placeholder={"Enter new password"}
            value={resetPasswordFormik.values.password}
            setter={resetPasswordFormik.handleChange("password")}
            errorText={
              resetPasswordFormik.touched.password &&
              resetPasswordFormik.errors.password
            }
          />
          <Input
            inputBoxInput={classes?.inputBoxInput}
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Confirm new password"}
            value={resetPasswordFormik.values.confirmPassword}
            setter={resetPasswordFormik.handleChange("confirmPassword")}
            errorText={
              resetPasswordFormik.touched.confirmPassword &&
              resetPasswordFormik.errors.confirmPassword
            }
          />
          <Button
            className={classes?.btn}
            label={loading === "loading" ? "Updating..." : "Update Password"}
            disabled={loading === "loading"}
            onClick={resetPasswordFormik.handleSubmit}
          />
        </div>
      </div>
    </Container>
  );
};

export default ResetPasswordTemplate;

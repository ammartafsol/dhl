"use client";

import React, { useState } from "react";
import classes from "./SignInTemplate.module.css";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import { Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { LOGIN_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { LoginSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { saveLoginUserData } from "@/store/auth/authSlice";
import { handleEncrypt } from "@/resources/utils/helper";
import RenderToast from "@/component/atoms/RenderToast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const SignInTemplate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Post } = useAxios();

  const [loading, setLoading] = useState("");

  const signInFormik = useFormik({
    initialValues: LOGIN_FORM_VALUES,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");

    const { response } = await Post({
      route: "auth/sub-admin/login",
      data: values,
    });

    if (response) {
      Cookies.set("_xpdx", handleEncrypt(response?.data?.token), {
        expires: 90,
      });
      Cookies.set(
        "_xpdx_ur",
        handleEncrypt(JSON.stringify(response?.data?.user)),
        {
          expires: 90,
        }
      );
      dispatch(saveLoginUserData(response?.data));
      RenderToast({
        type: "success",
        message: "Login Successfully",
      });
      router.push("/");
    }
    setLoading("");
  };

  return (
    <Container>
      <div className={classes?.signIn}>
        <h5>Login to your Account</h5>
        <form onSubmit={signInFormik.handleSubmit}>
          <Input
            inputBoxInput={classes?.inputBoxInput}
            label={"Email or Phone"}
            placeholder={"Enter your email or phone number"}
            value={signInFormik.values.email}
            setter={signInFormik.handleChange("email")}
            errorText={signInFormik.touched.email && signInFormik.errors.email}
          />
          <Input
            inputBoxInput={classes?.inputBoxInput}
            label={"Password"}
            type={"password"}
            placeholder={"Enter your password"}
            value={signInFormik.values.password}
            setter={signInFormik.handleChange("password")}
            errorText={
              signInFormik.touched.password && signInFormik.errors.password
            }
          />
          <h4
            className="cursorPointer"
            onClick={() => router.push("/forgot-password")}
          >
            Forget Password?
          </h4>
          <Button
            className={classes?.btn}
            label={loading === "loading" ? "Please wait..." : "Login"}
            disabled={loading === "loading"}
          />
        </form>
      </div>
    </Container>
  );
};

export default SignInTemplate;

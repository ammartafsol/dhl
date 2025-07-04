"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { handleEncrypt } from "@/resources/utils/helper";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./UpdatePassword.module.css";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import useAxios from "@/interceptor/axiosInterceptor";
import { updatePasswordSchema } from "@/formik/formikSchema/formik-schemas";
import { saveLoginUserData, updateAccessToken } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";

const UpdatePasswordTemplate = () => {
  const [loading, setLoading] = useState("");
  const {Patch} = useAxios();
  const dispatch = useDispatch();
  const updatePasswordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      reEnterNewPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, { resetForm });
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading("loading");
    const obj = {
      currentPassword: values.oldPassword,
      password: values.newPassword,
      confirmPassword: values.reEnterNewPassword,
    };
    const {response} = await Patch({ route: "auth/update/password", data: obj });
    if (response) {
      console.log("token",response?.data?.token);
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
        message: "Password Updated Successfully",
      });
      resetForm();
    }
    setLoading("");
  };

  return (
    <Container>
        <div className={classes?.mainContainer}>
    <BorderWrapper>
      <div className={classes.Wrapper}>
        <h5 className={`${"heading1"} ${classes.passwordText}`}>
          Update Password
        </h5>
        <Row>
          <Col xs="12">
            <Input
              label={"Old Password"}
              setter={(e) =>
                updatePasswordFormik.setFieldValue("oldPassword", e)
              }
              errorText={
                updatePasswordFormik.touched.oldPassword &&
                updatePasswordFormik.errors.oldPassword
              }
              value={updatePasswordFormik.values.oldPassword}
              type={"password"}
              placeholder={"*****"}
            />
          </Col>
          <Col xs="12">
            <Input
              label={"New Password"}
              setter={(e) =>
                updatePasswordFormik.setFieldValue("newPassword", e)
              }
              errorText={
                updatePasswordFormik.touched.newPassword &&
                updatePasswordFormik.errors.newPassword
              }
              value={updatePasswordFormik.values.newPassword}
              type={"password"}
              placeholder={"*****"}
            />
          </Col>
          <Col xs="12">
            <Input
              label={"Re-enter New Password"}
              setter={(e) =>
                updatePasswordFormik.setFieldValue("reEnterNewPassword", e)
              }
              errorText={
                updatePasswordFormik.touched.reEnterNewPassword &&
                updatePasswordFormik.errors.reEnterNewPassword
              }
              value={updatePasswordFormik.values.reEnterNewPassword}
              type={"password"}
              placeholder={"*****"}
            />
          </Col>
        </Row>
        <div className="btnRight">
          <Button
            onClick={updatePasswordFormik.handleSubmit}
            disabled={loading === "loading"}
            label={loading === "loading" ? "loading..." : "Update Password"}
          />
        </div>
      </div>
    </BorderWrapper>
        </div>
    </Container>
  );
};

export default UpdatePasswordTemplate;

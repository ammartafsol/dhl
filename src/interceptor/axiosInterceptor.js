"use client";
import axios from "axios";
import momentTimezone from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";

import RenderToast from "@/component/atoms/RenderToast";
import { BaseURL, handleEncrypt } from "@/resources/utils/helper";
import { signOutRequest, updateJWTTokens } from "@/store/auth/authSlice";
import Cookies from "js-cookie";

const useAxios = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector(
    (state) => state.authReducer
  );

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    if (!refreshToken) {
      RenderToast({type:"success",message:"No refresh token found."});
      return null;
    }

    try {
      const response = await axios.post(BaseURL("auth/refresh-token"), {
        token: refreshToken,
      });

      const data = response?.data;
      Cookies.set("_xpdx", handleEncrypt(data?.accessToken));
      Cookies.set("_xpdx_rf", handleEncrypt(data?.refreshToken));
      dispatch(
        updateJWTTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      return data.accessToken;
    } catch (error) {
      Cookies.remove("_xpdx");
      Cookies.remove("_xpdx_rf");
      dispatch(signOutRequest());
      return null;
    }
  };

  const getErrorMsg = (error = null) => {
    console.log("🚀 ~ getErrorMsg ~ error:", error);
    if (error?.message === "Network Error") {
      return `Network Error : Please Check Your Network Connection`;
    }
    const message = error?.response?.data?.message?.error;
    let errorMessage = "";

    Array.isArray(message)
      ? message?.map(
          (item, i) => (errorMessage = `${errorMessage} • ${item} \n`)
        )
      : (errorMessage = message);
    return errorMessage;
  };

  // Function to handle API requests
  const handleRequest = async ({
    method = "",
    route = "",
    data = {},
    headers = {},
    showAlert = true,
    isFormData = false,
  }) => {
    const url = BaseURL(route);
    const _headers = {
      Accept: "application/json",
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      timezone: momentTimezone.tz.guess(),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers,
    };

    try {
      const response = await axios({ method, url, data, headers: _headers });
      return { response: response?.data, error: null };
    } catch (error) {
      const errorMessage = getErrorMsg(error);
      if (showAlert) {
        RenderToast({type:"error",message: errorMessage || "An unexpected error occurred."});
      }

      if (error?.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          headers.Authorization = `Bearer ${newAccessToken}`;
          return await axios({ method, url, data, headers });
        }
      }
      return { error, response: null };
    }
  };

  return {
    Get: ({ route = "", headers = {}, showAlert = true }) =>
      handleRequest({ method: "get", route, headers, showAlert }),

    Post: ({
      route = "",
      data = {},
      headers = {},
      showAlert = true,
      isFormData = false,
    }) =>
      handleRequest({
        method: "post",
        route,
        data,
        headers,
        showAlert,
        isFormData,
      }),

    Put: ({
      route = "",
      data = {},
      headers = {},
      showAlert = true,
      isFormData = false,
    }) =>
      handleRequest({
        method: "put",
        route,
        data,
        headers,
        showAlert,
        isFormData,
      }),

    Patch: ({
      route = "",
      data = {},
      headers = {},
      showAlert = true,
      isFormData = false,
    }) =>
      handleRequest({
        method: "patch",
        route,
        data,
        headers,
        showAlert,
        isFormData,
      }),

    Delete: ({ route = "", headers = {}, showAlert = true }) =>
      handleRequest({ method: "delete", route, headers, showAlert }),
  };
};

export default useAxios;

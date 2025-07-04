"use client";
import useAxios from "@/interceptor/axiosInterceptor";
import { updateUserData } from "@/store/auth/authSlice";
import { setCMSData } from "@/store/common/commonSlice";
import store, { persistor } from "@/store/index";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

export function CustomProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApisProvider>{children}</ApisProvider>
      </PersistGate>
    </Provider>
  );
}

export default function ApisProvider({ children }) {
  const { accessToken } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const { Get } = useAxios();

  useEffect(() => {
    // if (accessToken) {
    //   getUserData();
    // }
    // getCMSData();
  }, []);

  const getUserData = async () => {
    const { response } = await Get({ route: "users/me" });
    if (response) {
      dispatch(updateUserData(response?.data));
    }
  };

  const getCMSData = async () => {
    const { response } = await Get({ route: "cms" });
    if (response) {
      dispatch(setCMSData(response?.data));
    }
  };

  return children;
}

"use client";

import RenderToast from "@/component/atoms/RenderToast";
import { config } from "@/config";
import { getUniqueBrowserId } from "@/resources/utils/helper";
import { signOutRequest, updateUserData } from "@/store/auth/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

// Create a new context for the socket connection
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const { accessToken, user } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    if (accessToken) {
      const initSocket = async () => {
        socket.current = io(config?.apiBaseURL, { transports: ["websocket"] });

        // get socket id
        socket.current.on("connect", () => {
          console.log("Active Socket Data 🤷‍♂️🤷‍♂️🤷‍♂️", {
            socketId: socket.current.id,
            device: getUniqueBrowserId(),
            id: user?._id,
          });
        });

        // **************** Establish connection with socket Start ****************
        socket.current.emit("join", {
          id: user?._id,
          device: getUniqueBrowserId(),
        });
        // **************** Establish connection with socket End ****************

        // **************** Listener Start ****************
        socket.current.on("updated-user", (data) => {
          if (data?.id !== user?._id) return;
          dispatch(updateUserData(data));
        });
        socket.current.on("user-blocked", (data) => {
          if (data?.id === user?._id) {
            RenderToast({
              type: "error",
              message: "Your account has been blocked by admin",
            });
            dispatch(signOutRequest());
            Cookies.remove("_xpdx");
            router?.push("/login");
          }
        });
        socket.current.on("user-deleted", (data) => {
          if (data?.id !== user?._id) return;
          RenderToast({
            type: "error",
            message: "Your account has been deleted by admin",
          });
          dispatch(signOutRequest());
          Cookies.remove("_xpdx");
          router?.push("/login");
        });

        // **************** Listener End ****************
      };
      initSocket();
      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [accessToken, dispatch, user?._id]);

  // Provide the socket connection to children
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// Custom hook to access the socket connection
export const useSocket = () => {
  return useContext(SocketContext);
};

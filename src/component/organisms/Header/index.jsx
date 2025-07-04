"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import RenderToast from "@/component/atoms/RenderToast";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { useDispatch } from "react-redux";
import { signOutRequest } from "@/store/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = usePathname();
  const isAuthPage =
    pathname === "/sign-in" ||
    pathname === "/forgot-password" ||
    pathname === "/otp-verification" ||
    pathname === "/reset-password";

  if (isAuthPage) {
    return null;
  }

  const [isMobile, setIsMobile] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const logout = async () => {
    dispatch(signOutRequest());

    Cookies.remove("_xpdx");
    Cookies.remove("_xpdx_rf");
    Cookies.remove("_xpdx_ur");

    RenderToast({
      type: "success",
      message: "Logout Successfully",
    });
    router.push("/sign-in");
  };

  function onScroll() {
    if (window.scrollY > 160) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }
  useEffect(() => {
    window?.addEventListener("scroll", onScroll);
    isMobileViewHook(setIsMobile, 992);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileHeader />
      ) : (
        <DesktopHeader isScroll={isScroll} logout={logout} />
      )}
    </>
  );
};

export default Header;

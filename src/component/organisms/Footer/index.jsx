"use client";

import { FOOTER_LINKS } from "@/developmentContent/appData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./Footer.module.css";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/sign-in" ||
    pathname === "/forgot-password" ||
    pathname === "/otp-verification" ||
    pathname === "/reset-password";

  if (isAuthPage) {
    return null;
  }
  return (
    <div className={classes.footerMain}>
      <div className={classes.footerLogo}>
        <Image src={"/Images/app-images/logo.svg"} alt="logo" fill />
      </div>
      <div className={classes.footerMenus}>
        <div className={classes.links}>
          {FOOTER_LINKS.map((link, i) => (
            <Link key={i} href={link.route} className={classes.link}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className={classes.footerBottom}>
        <p>© 2025 Tap2sos All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

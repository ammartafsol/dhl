import Button from "@/component/atoms/Button";
import { headerOptions } from "@/developmentContent/header";
import { mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import classes from "./DesktopHeader.module.css";

export default function DesktopHeader({ isScroll, logout }) {
  const router = useRouter();
  const pathname = usePathname();
  console.log(
    "🚀 ~ DesktopHeader ~ pathname:",
    pathname.split("/").slice(0, 2).join("/")
  );

  const { isLogin, user } = useSelector((state) => state?.authReducer);
  const [show, setShow] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.mainDiv}>
      <div className={classes.mainHeader}>
        <Container className="g-0">
          <div className={classes.topRow}>
            <div className={classes.logoDiv}>
              <Image src={"/Images/app-images/logo.png"} fill alt="logo" />
            </div>
            <div className={classes.actionsDiv}>
              <div
                className={classes.userDiv}
                onClick={() => {
                  router.push("/profile");
                }}
              >
                <div className={classes.userIcon}>
                  <BiUserCircle
                    onClick={() => router.push("/profile")}
                    color="#EF6923"
                    className="cursorPointer"
                    size={25}
                  />
                </div>
                <div className={classes.userInfo}>
                  <p className={classes.name}>
                    {user?.fullName || "Brandon Lemke"}
                  </p>
                  <p className={classes.email}>
                    {user?.email || "Brandon_Lemke@yahoo.com"}
                  </p>
                </div>
              </div>
              <div className={classes.userLogout}>
                <Button
                  label="Logout"
                  onClick={logout}
                  className={classes.logoutButton}
                />
              </div>
            </div>
          </div>
        </Container>
        <hr className={classes.line} />
        <Container className="g-0">
          <div className={classes.navOptions} ref={navRef}>
            {headerOptions.map((option, index) => {
              // Check if any sub-item is active for dropdown items
              const isDropdownActive = option.isDropdown && option.subItems?.some(
                subItem => pathname === subItem.href || 
                pathname.split("/").slice(0, 2).join("/") === subItem.href
              );
              
              return (
                <div
                  key={index}
                  className={`${classes.navItem} ${
                    pathname === option.href ||
                    pathname.split("/").slice(0, 2).join("/") === option.href ||
                    isDropdownActive
                      ? classes.navItemSelected
                      : ""
                  } ${option.isDropdown ? classes.dropdownNav : ""}`}
                  onClick={(e) => {
                    if (option.isDropdown) {
                      e.preventDefault();
                      setDropdownOpen(dropdownOpen === index ? null : index);
                    } else {
                      router.push(option.href);
                    }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span
                    className={mergeClass(
                      classes.icon,
                      (pathname === option.href ||
                        pathname.split("/").slice(0, 2).join("/") ===
                          option.href ||
                        hoveredIndex === index ||
                        isDropdownActive) &&
                        classes.iconShow
                    )}
                  >
                    {option.icon}
                  </span>
                  <span>{option.title}</span>
                  
                  {/* Dropdown arrow for dropdown items */}
                  {option.isDropdown && (
                    <span className={`${classes.dropdownArrow} ${dropdownOpen === index ? classes.dropdownArrowOpen : ''}`}>
                      ▼
                    </span>
                  )}
                  
                  {/* Dropdown menu */}
                  {option.isDropdown && dropdownOpen === index && (
                    <div className={classes.dropdownMenu}>
                      {option.subItems.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className={`${classes.dropdownItem} ${
                            pathname === subItem.href ||
                            pathname.split("/").slice(0, 2).join("/") === subItem.href
                              ? classes.dropdownItemActive
                              : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(subItem.href);
                            setDropdownOpen(null);
                          }}
                        >
                          <span className={classes.dropdownIcon}>
                            {subItem.icon}
                          </span>
                          <span>{subItem.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}

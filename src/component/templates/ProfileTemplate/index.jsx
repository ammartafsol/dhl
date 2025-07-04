"use client";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import PageHeading from "@/component/atoms/PageHeading/PageHeading";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { BiSolidUserPin } from "react-icons/bi";
import { FaEdit, FaRegUser } from "react-icons/fa";

import { MdLockOutline, MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { PiBankBold } from "react-icons/pi";
import { RiBarcodeLine, RiCircleFill } from "react-icons/ri";
import classes from "./ProfileTemplate.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "@/component/atoms/Button";
import StatusBadge from "@/component/atoms/StatusBadge";

const ProfileTemplate = () => {
  const router = useRouter();
  const [image, setImage] = useState("/Images/app-images/dummyProfile.png");
  const status = "Active";
  const { user } = useSelector((state) => state.authReducer);
  console.log("🚀 ~ ProfileTemplate ~ user1111:", user);

  return (
    <Container>
      <PageHeading
        heading={"Profile Details"}
        showBackRoute
        btnLabel="Update Password"
        onBtnClick={() => router.push("/update-Password")}
      />
      <div className={classes?.mainParent}>
        <BorderWrapper className={classes.borderWrapper}>
          <div className={classes.firstSection}>
            <div className={classes.profileDiv}>
              <div className={classes.imageDiv}>
                <Image
                  src={mediaUrl(user?.photo || image)}
                  alt="profile"
                  fill
                />
              </div>
              <div className={classes.textDivProfile}>
                <div className={classes.nameDiv}>
                  <p className={classes.name}>{user?.fullName}</p>
                  <StatusBadge 
                    status={status === "Active" ? "active" : "inactive"} 
                    size="small" 
                  />
                </div>
                {/* <p className={classes.location}>Saudi Arabia, Jeddah.9975</p> */}
              </div>
            </div>
            <Button
              leftIcon={<FaEdit size={16} />}
              label={"Edit"}
              onClick={() => router.push("/profile-settings")}
            />
          </div>

          <hr className={classes.line} />

          <div className={classes.contactDiv}>
            <div className={classes.iconValueDiv}>
              <MdOutlineEmail color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Email</p>
                <p className={classes.value}>{user?.email}</p>
              </div>
            </div>
            <div className={classes.iconValueDiv}>
              <MdOutlinePhone color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Phone Number</p>
                <p className={classes.value}>
                  {user?.phoneNumber || "(671) 555-0110"}
                </p>
              </div>
            </div>
          </div>

          {/* <hr className={classes.line} />
          <h6 className={classes.subHeading}>Payment Detail</h6>
          <hr className={mergeClass(classes.line, classes.marginBottom)} />

          <div className={classes.contactDiv}>
            <div className={classes.iconValueDiv}>
              <PiBankBold color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Bank Name</p>
                <p className={classes.value}>MCB</p>
              </div>
            </div>
            <div className={classes.iconValueDiv}>
              <PiBankBold color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Bank Address</p>
                <p className={classes.value}>
                  15885 Lilly Fort, Traceyfurt 12048-3887
                </p>
              </div>
            </div>
            <div className={classes.iconValueDiv}>
              <FaRegUser color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Account Holder Name</p>
                <p className={classes.value}>Kevin</p>
              </div>
            </div>
            <div className={classes.iconValueDiv}>
              <RiBarcodeLine color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Swift Code</p>
                <p className={classes.value}>12048-3887</p>
              </div>
            </div>
            <div className={classes.iconValueDiv}>
              <BiSolidUserPin color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Account Number / IBAN</p>
                <p className={classes.value}>1234-4566-4677</p>
              </div>
            </div>
          </div> */}

          {/* <hr className={classes.line} />
          <h6 className={classes.subHeading}>Login Credential</h6>
          <hr className={mergeClass(classes.line, classes.marginBottom)} />

          <div className={classes.contactDiv}>
            <div className={classes.iconValueDiv}>
              <MdOutlineEmail color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Email</p>
                <p className={classes.value}>georgia.young@example.com</p>
              </div>
            </div>
            <div className={classes.iconValueDiv}>
              <MdLockOutline color="#1C1B1F" size={18} />
              <div className={classes.keyValueDiv}>
                <p className={classes.key}>Password</p>
                <p className={classes.value}>••••••</p>
              </div>
            </div>
          </div> */}
        </BorderWrapper>
      </div>
    </Container>
  );
};

export default ProfileTemplate;

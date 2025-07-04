// import { Button } from "@/components/atoms/Button";
// import NotificationCard from "@/components/molecules/NotificationCard";
// import Overlay from "@/components/molecules/Overlay";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Container, Popover } from "react-bootstrap";
// import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";
// import { useSelector } from "react-redux";
// import { useRef } from "react";
// import classes from "./UserHeader.module.css";
// import { NotificationData } from "@/developmentContent/userPanelData/NotificationData";
// import { Get } from "@/interceptor/axiosInterceptor";
// import LoadingComponent from "@/components/atoms/LoadingComponent";

// export default function UserHeader({
//   className,
//   setSearchText,
//   searchText,
//   heading,
// }) {
//   const [show, setShow] = useState(false);
//   const { user } = useSelector((state) => state.authReducer);
//   const router = useRouter();
//   const [notificationData, setNotificationData] = useState([]);
//   const [loading, setLoading] = useState("");
//   const overlayRef = useRef(null);

//   const getNotification = async () => {
//     setLoading("loading");
//     const response = await Get({ route: "notifications/recent" });
//     if (response) {
//       setNotificationData(response?.response?.data?.notifications);
//     }
//     setLoading("");
//   };

//   const openNotificationModal = () => {
//     if (show) {
//       setShow;
//     } else {
//       setShow(true);
//       getNotification();
//     }
//   };

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (overlayRef.current && !overlayRef.current.contains(event.target)) {
//         setShow(false);
//       }
//     }

//     if (show) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [show]);

//   const NotificationView = (props) => {
//     return (
//       <Popover {...props} placement="bottom" className={classes.popover}>
//         <div ref={overlayRef}>
//           <Popover.Body className={classes.notificationCont}>
//             {loading === "loading" ? (
//               <LoadingComponent size="small" />
//             ) : (
//               <>
//                 <h4>Notification</h4>
//                 <div className={classes.notificationInner}>
//                   {notificationData?.map((data) => (
//                     <NotificationCard key={data._id} data={data} />
//                   ))}
//                 </div>
//               </>
//             )}
//             {notificationData.length > 4 && (
//               <Button
//                 label="View All"
//                 variant="primary"
//                 onClick={() => {
//                   router?.push("/notifications");
//                   setShow(false);
//                 }}
//               />
//             )}
//           </Popover.Body>
//         </div>
//       </Popover>
//     );
//   };

//   return (
//     <Container className={`${[classes.navbarContainer, className].join(" ")}`}>
//       <div className={classes.headerTextCont}>
//         <h4 className="h4">{heading}</h4>
//       </div>
//       <div className={classes.imgNameCont}>
//         <div className={classes.searchCont}>
//           <IoIosSearch color="var(--gray-v1)" size={24} />
//           <input
//             type="text"
//             placeholder="Search Here"
//             value={searchText}
//             onChange={setSearchText}
//           />
//         </div>
//         <Overlay
//           show={show}
//           setShow={openNotificationModal}
//           overlay={NotificationView}
//         >
//           <div className={classes.headerIcons}>
//             <div className={classes.iconBox} onClick={() => {}}>
//               <IoMdNotificationsOutline
//                 onClick={() => {
//                   setShow(!show);
//                 }}
//                 size={24}
//                 color="#69778E"
//               />
//             </div>
//           </div>
//         </Overlay>
//         <div className={classes.userCont}>
//           <div className={classes.avatarImageCont}>
//             <Image
//               src={"/images/dev-images/defaultUser.png"}
//               alt="avatar"
//               fill
//               onClick={() => router.push("/profile")}
//             />
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }

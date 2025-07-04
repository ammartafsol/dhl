import moment from "moment";
import classes from "./CommonCells.module.css";
import {
  capitalizeFirstLetter,
  getFormattedPrice,
  mergeClass,
} from "@/resources/utils/helper";
import { RiCircleFill } from "react-icons/ri";
import Button from "@/component/atoms/Button";
import StatusBadge from "@/component/atoms/StatusBadge";

export const RenderTextCell = ({ cellValue: item }) => {
  console.log("RenderTextCell called with:", item);
  return (
    <span title={item} className={`maxLine1 ${classes?.textCell}`}>
      {item ? capitalizeFirstLetter(item) : "-"}
    </span>
  );
};

export const RenderAmount = ({ cellValue: item }) => {
  return <span>{getFormattedPrice(item)}</span>;
};

export const RenderCategoryCell = ({ cellValue: { item } }) => {
  return (
    <span title={item} className={"maxLine1 t-t-c"}>
      {item ? capitalizeFirstLetter(item) : "-"}
    </span>
  );
};

// export const RenderDateCell = ({ cellValue: item }) => {
//   return (
//     <span className={mergeClass(classes?.date, "t-t-c")}>
//       {moment(item).format("DD/MM/YYYY")}
//     </span>
//   );
// };
export const RenderDateCell = ({ cellValue: item }) => {
  console.log("🚀 ~ RenderDateCell ~ item000333:", item);
  return (
    <span className={mergeClass(classes?.date, "t-t-c")}>
      {moment(item).format("DD-MM-YYYY")}
    </span>
  );
};

export const IconButton = ({ icon, onClick }) => {
  return (
    <div className={classes?.iconButton} onClick={onClick}>
      {icon}
    </div>
  );
};

// export const RenderStatus = ({ cellValue: item }) => {
//   return (
//     <span
//       className={mergeClass(
//         classes.statusDiv,
//         "maxLine2 t-t-c",
//         item == "Active" || item == true ? classes?.active : classes?.inactive
//       )}
//     >
//       <RiCircleFill size={12} />
//       {item ? capitalizeFirstLetter(item) : "-"}
//     </span>
//   );
// };

export const RenderStatus = ({ cellValue: item }) => {
  const isActive = item === "Active" || item === true;
  const status = isActive ? "active" : "inactive";

  return <StatusBadge status={status} size="small" />;
};

export const RenderApprovalButtons = ({ cellValue: item, handleApproval }) => {
  return (
    <div className={classes?.approvalButtons}>
      <Button
        label={"Accept"}
        variant={"secondary"}
        onClick={() =>
          handleApproval({ slug: item?.slug, decision: "approved" })
        }
      />
      <Button
        label={"Reject"}
        variant={"tertiary"}
        onClick={() =>
          handleApproval({ slug: item?.slug, decision: "rejected" })
        }
      />
    </div>
  );
};

export const RenderShipmentStatus = ({ cellValue: item }) => {
  return <StatusBadge status={item} size="small" />;
};

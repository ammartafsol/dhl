import styles from "./StatusBadge.module.css";
import { capitalizeFirstLetter } from "@/resources/utils/helper";

const StatusBadge = ({ 
  status, 
  variant = "default",
  size = "medium",
  className = "" 
}) => {
  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "pending":
      case "paid":
        return styles.statusPending;
      case "dispatched":
        return styles.statusDispatched;
      case "delivered":
      case "picked up":
        return styles.statusDelivered;
      case "failed":
      case "not picked up":
      case "rejected":
        return styles.statusFailed;
      case "approved":
        return styles.statusApproved;
      case "active":
        return styles.statusActive;
      case "inactive":
        return styles.statusInactive;
      default:
        return styles.statusDefault;
    }
  };

  const getSizeClass = (size) => {
    switch (size) {
      case "small":
        return styles.sizeSmall;
      case "large":
        return styles.sizeLarge;
      default:
        return styles.sizeMedium;
    }
  };

  if (!status) return null;

  return (
    <span 
      className={`${styles.statusBadge} ${getStatusClass(status)} ${getSizeClass(size)} ${className}`}
    >
      {capitalizeFirstLetter(status)}
    </span>
  );
};

export default StatusBadge; 
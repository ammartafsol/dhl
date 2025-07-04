import React from "react";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import Button from "@/component/atoms/Button";
import classes from "./AreYouSureModal.module.css";

const AreYouSureModal = ({
  show,
  onHide,
  onConfirm,
  actionType = "accept", // or "reject"
  loading = false,
  message = "Are you sure you want to proceed?",
}) => {
  return (
    <ModalSkeleton show={show} onHide={onHide} header={"Are you sure?"}>
      <div className={classes.content}>
        <p className={classes.message}>{message}</p>
        <div className={classes.actions}>
          <Button
            label={loading ? "Loading..." : actionType === "accept" ? "Accept" : "Reject"}
            onClick={onConfirm}
            disabled={loading}
            variant={"transparent"}
            // className={classes?.accept}
          />
          <Button
            label="Cancel"
            onClick={onHide}
            variant="secondary"
            disabled={loading}
            className={classes.reject}
          />
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default AreYouSureModal; 
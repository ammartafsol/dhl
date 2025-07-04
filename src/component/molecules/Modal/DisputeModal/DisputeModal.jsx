"use client";
import React, { useState } from "react";
import classes from "./DisputeModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import Button from "@/component/atoms/Button";

const DisputeModal = ({show,loading,setShow,disputeResolved,resolved,setResolved}) => {
  const [reason,setReason] = useState('');
  return (
    <ModalSkeleton header={`Reason to ${`Resolved in favour of the ${resolved?"buyer":"merchant"}`}`} show={show}>
      <TextArea label={"Reason"}  setter={setReason} value={reason} />
      <div className={classes?.btn}>
        <Button disabled={loading === 'resolvedDispute'} className={classes?.cancel} onClick={()=>{setShow(false);setResolved(null)}} label={"Cancel"} variant={"outlined"} />
        <Button disabled={loading === 'resolvedDispute'} className={classes?.send} onClick={()=>{disputeResolved(reason)}} label={loading === 'resolvedDispute'?"loading...":"Send"}  />
      </div>
    </ModalSkeleton>
  );
};

export default DisputeModal;

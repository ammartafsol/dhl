import React, { useState } from 'react';
import classes from "./PartialRefundModal.module.css";
import ModalSkeleton from '../ModalSkeleton/ModalSkeleton';
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import Button from '@/component/atoms/Button';
import { Input } from '@/component/atoms/Input';

const PartialRefundModal = ({ show, onClose, onConfirm, isLoading }) => {
  const [reason, setReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');

  const handleConfirm = () => {
    onConfirm({
      status: true,
      reason,
      refundAmount: Number(refundAmount)
    });
  };

  const handleCancel = () => {
    setReason('');
    setRefundAmount('');
    onClose();
  };

  return (
    <ModalSkeleton 
      header="Partial Refund" 
      show={show} 
      setShow={handleCancel} 
      width="500px"
    >
      <div className={classes.modalContent}>
        <div className={classes.inputGroup}>
          <Input
            label="Refund Amount"
            type="number"
            value={refundAmount}
            setter={setRefundAmount}
            placeholder="Enter refund amount"
            disabled={isLoading}
          />
        </div>
        <div className={classes.inputGroup}>
          <TextArea 
            label="Reason for Refund"
            value={reason}
            setter={setReason}
            placeholder="Enter reason for partial refund"
            disabled={isLoading}
          />
        </div>
        <div className={classes.actions}>
          <Button
            label="Cancel"
            variant="secondary"
            className={`${classes.btn} ${classes.cancelBtn}`}
            onClick={handleCancel}
            disabled={isLoading}
          />
          <Button
            label={isLoading ? "Processing..." : "Confirm Refund"}
            className={`${classes.btn} ${classes.confirmBtn}`}
            onClick={handleConfirm}
            disabled={isLoading || !reason || !refundAmount}
            isLoading={isLoading}
          />
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default PartialRefundModal; 
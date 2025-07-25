"use client";
import React, { useState, useEffect } from "react";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import MultiFileUpload from "@/component/molecules/MultiFileUpload/MultiFileUpload";
import classes from "./DeliveryModal.module.css";

const DeliveryModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading, 
  orderStatus,
  deliveryType 
}) => {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleCancel = () => {
    setDeliveryDate("");
    setDeliveryTime("");
    setUploadedFiles([]);
    onClose();
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    setDeliveryDate("");
    setDeliveryTime("");
    setUploadedFiles([]);
  }, [isOpen]);

  const handleSubmit = () => {
    const requestData = {};

    // Only include timeline data for dispatch orders
    if (isDispatchOrder) {
      requestData.expectedDeliveryDate = deliveryDate || null;
      requestData.expectedDeliveryTime = deliveryTime || null;
    }

    // Only include photos for deliver orders
    if (isDeliverOrder) {
      requestData.deliveryProof = uploadedFiles.map(file => file.key);
    }

    onSubmit(requestData);
  };

  const isDispatchOrder = orderStatus === "paid";
  const isDeliverOrder = orderStatus === "dispatched";

  return (
    <ModalSkeleton show={isOpen} setShow={onClose}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          {isDispatchOrder ? "Dispatch Order" : "Deliver Order"}
        </h2>
        
        {/* Delivery Timeline Section - Only for Dispatch Order */}
        {isDispatchOrder && (
          <div className={classes.section}>
            <h4 className={classes.sectionTitle}>Delivery Timeline</h4>
            <p className={classes.sectionDescription}>
              Set the expected delivery date and time for this order.
            </p>
            
            <div className={classes.timelineInputs}>
              <div className={classes.inputGroup}>
                <label>Delivery Date</label>
                <Input
                  type="date"
                  value={deliveryDate}
                  setter={setDeliveryDate}
                  placeholder="Select date"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className={classes.inputGroup}>
                <label>Delivery Time</label>
                <Input
                  type="time"
                  value={deliveryTime}
                  setter={setDeliveryTime}
                  placeholder="Select time"
                />
              </div>
            </div>
          </div>
        )}

        {/* Delivery Photos Section - Only for Deliver Order */}
        {isDeliverOrder && (
          <MultiFileUpload
            key={`delivery-upload-${isOpen}`}
            onFilesUploaded={setUploadedFiles}
            maxFiles={3}
            accept="image/*"
            title="Delivery Proof Photos"
            description="Upload photos to prove the order was delivered (optional)"
          />
        )}

        {/* Action Buttons */}
        <div className={classes.buttonContainer}>
          <Button
            className={classes.cancelButton}
            variant="secondary"
            onClick={handleCancel}
            disabled={isLoading}
            label="Cancel"
          />
          <Button
            className={classes.submitButton}
            onClick={handleSubmit}
            disabled={isLoading}
            label={isLoading ? "Processing..." : (isDispatchOrder ? "Dispatch Order" : "Deliver Order")}
          />
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default DeliveryModal; 
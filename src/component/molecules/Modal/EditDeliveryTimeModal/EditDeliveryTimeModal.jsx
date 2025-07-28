"use client";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@/component/atoms/Button";
import classes from "./EditDeliveryTimeModal.module.css";

export default function EditDeliveryTimeModal({
  show,
  onHide,
  currentDeliveryTime,
  onSave,
  isLoading = false,
}) {
  const [deliveryDate, setDeliveryDate] = useState(
    currentDeliveryTime ? new Date(currentDeliveryTime).toISOString().split('T')[0] : ""
  );
  const [deliveryTime, setDeliveryTime] = useState(
    currentDeliveryTime ? new Date(currentDeliveryTime).toTimeString().slice(0, 5) : ""
  );

  const handleSave = () => {
    if (!deliveryDate || !deliveryTime) {
      return;
    }
    
    const newDeliveryTime = new Date(`${deliveryDate}T${deliveryTime}`);
    onSave(newDeliveryTime);
  };

  const handleClose = () => {
    // Reset form when closing
    setDeliveryDate(currentDeliveryTime ? new Date(currentDeliveryTime).toISOString().split('T')[0] : "");
    setDeliveryTime(currentDeliveryTime ? new Date(currentDeliveryTime).toTimeString().slice(0, 5) : "");
    onHide();
  };

  return (
    <>
      <style>{`
        .modal-dialog-centered {
          min-height: 100% !important;
          border-radius: 20px;
        }
 
        .modal-header {
          border-bottom: none !important;
          padding: 0px !important;
          padding-top: 20px !important;
        }

        .${classes.header} button {
          color: var(--black-color) !important;
        }

        .modal-content {
          width: 94%;
          margin: 0 auto;
        }

        .modal-body {
          border-radius: 20px;
          overflow-y: auto !important; 
        }

         .modal-body::-webkit-scrollbar {
          width: 6px;
        }

        .modal-body::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .modal-body::-webkit-scrollbar-thumb {
          background: var(--primary-bg);
          border-radius: 10px;
        }

        .modal .modal-dialog {
          max-width: 500px;
          margin: 0px auto;
        }

        @media screen and (max-width: 992px) {
          .modal .modal-dialog {
            max-width: 70%;
          }
        }
        @media screen and (max-width: 768px) {
          .modal .modal-dialog {
            max-width: 80%;
          }
        }
        @media screen and (max-width: 575px) {
          .modal .modal-dialog {
            max-width: 90%;
          }
        }
      `}</style>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={`${classes.modal}`}
      >
        <Modal.Header className={classes.header}>
          <h4 className="heading1">Edit Expected Delivery Time</h4>
        </Modal.Header>
        <Modal.Body className={classes.body}>
          <div className={classes.formContainer}>
            <div className={classes.inputGroup}>
              <label htmlFor="deliveryDate">Delivery Date</label>
              <input
                type="date"
                id="deliveryDate"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className={classes.input}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className={classes.inputGroup}>
              <label htmlFor="deliveryTime">Delivery Time</label>
              <input
                type="time"
                id="deliveryTime"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className={classes.input}
              />
            </div>

            <div className={classes.buttonContainer}>
              <Button
                label="Cancel"
                onClick={handleClose}
                variant="outlined"
                className={classes.cancelButton}
                disabled={isLoading}
              />
              <Button
                label={isLoading ? "Saving..." : "Save Changes"}
                onClick={handleSave}
                disabled={!deliveryDate || !deliveryTime || isLoading}
                className={classes.saveButton}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
} 
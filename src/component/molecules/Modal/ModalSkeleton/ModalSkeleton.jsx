"use client";
import { Modal } from "react-bootstrap";
import classes from "./ModalSkeleton.module.css";

export default function ModalSkeleton({
  show,
  onHide,
  header,
  children,
  modalClass,
  headerStyles,
  width,
  headerClass,
  height,
}) {
  function handleClose() {
    onHide();
  }
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
          max-width: ${width};
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
        className={`  ${[classes.modal].join(" ")} `}
      >
        {header && (
          <Modal.Header
            className={`${[classes.header, headerClass && headerClass].join(
              " "
            )}`}
            style={{ ...headerStyles }}
          >
            <h4 className="heading1" style={{ ...headerStyles }}>
              {header}
            </h4>
          </Modal.Header>
        )}
        <Modal.Body
          className={`${[classes.body, modalClass && modalClass].join(" ")}`}
          style={{ height: height || "auto" }}
        >
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

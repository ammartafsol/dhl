import Button from "@/component/atoms/Button";
import styles from "./ConfirmModal.module.css";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";

const ConfirmModal = ({ isOpen, onClose, title = "Are you sure?", message, onYesClick, isLoading }) => {
  return (
    <ModalSkeleton show={isOpen} setShow={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <Button 
            className={styles.modalButton}
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            No
          </Button>
          <Button 
            className={styles.modalButton}
            variant="tertiary"
            onClick={() => {
              onYesClick();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Please wait...": "Yes"}
          </Button>
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default ConfirmModal;
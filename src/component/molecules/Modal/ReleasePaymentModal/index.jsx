import React from 'react';
import classes from "./ReleasePaymentModal.module.css";
import ModalSkeleton from '../ModalSkeleton/ModalSkeleton';
import Button from '@/component/atoms/Button';
import { IoClose } from 'react-icons/io5';

const ReleasePaymentModal = ({ show, onClose, onConfirm, isLoading, releaseActionLoading }) => {
  return (
        <ModalSkeleton show={show} setShow={onClose} width="400px" >
            <div className={classes?.mainRelease}>
                <h5>Release Payment</h5>
                <IoClose cursor={"pointer"} onClick={()=>{onClose()}} size={23} />
            </div>
            <div className={classes.modalContent}>
                <p className={classes.confirmationText}>
                    Are you sure you want to release this payment?
                </p>
                <div className={classes.actions}>
                    <Button
                        label="Reject"
                        variant="secondary"
                        className={classes?.btn}
                        onClick={() => onConfirm('rejected')}
                        disabled={releaseActionLoading === 'accepted' || isLoading}
                        isLoading={releaseActionLoading === 'rejected'}
                    />
                    <Button
                        label="Accept"
                        className={classes?.btn}
                        variant={"outlined"}
                        onClick={() => onConfirm('accepted')}
                        disabled={releaseActionLoading === 'rejected' || isLoading}
                        isLoading={releaseActionLoading === 'accepted'}
                    />
                </div>
            </div>
        </ModalSkeleton>
  )
}

export default ReleasePaymentModal
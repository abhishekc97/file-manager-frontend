import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { verifyPin } from "../../api/PinVerification";
import PinInput from "react-pin-input";
import styles from "./LockModal.module.css";

function LockModal({ show, onClose }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    localStorage.setItem("Lock_Is_On", true);

    function verifyEnteredPin() {
        if (pin === "") {
            setError(true);
        } else if (pin !== "") {
            verifyPin(pin).then((response) => {
                if (!response) {
                    console.log("no response");
                    setError(true);
                } else {
                    localStorage.setItem("Lock_Is_On", false);
                    onClose();
                }
            });
        }
    }

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            className={styles.lockPinModal}
            dialogClassName={styles.myModalDialog}
            contentClassName={styles.myModalContent}
        >
            <div className={styles.pinHeading}>Enter Account Pin</div>
            <PinInput
                length={4}
                initialValue=""
                secret
                onChange={(value, index) => {}}
                type="numeric"
                inputMode="number"
                style={{ padding: "10px" }}
                inputStyle={{ borderColor: "#EBF0F5" }}
                inputFocusStyle={{ borderColor: "black" }}
                onComplete={(value, index) => {
                    setPin(value);
                }}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
            {error && (
                <span className={styles.errorMsg}>
                    Please enter the correct pin
                </span>
            )}
            <button
                onClick={verifyEnteredPin}
                className={styles.enterpinButton}
            >
                Enter
            </button>
        </Modal>
    );
}

export default LockModal;

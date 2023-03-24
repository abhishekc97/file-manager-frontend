import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { createPin, updateExistingPin } from "../../api/PinVerification.js";
import styles from "./SetPinModal.module.css";

function SetPinModal({ show, onClose }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const [pinExists, setPinExists] = useState(false);

    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);

    function createNewPin() {
        if (pin === "") {
            setError(true);
        } else if (pinExists) {
            updateExistingPin(pin).then((response) => {
                if (!response) {
                    alert("Could not update pin");
                } else {
                    onClose();
                }
            });
        } else {
            createPin(pin)
                .then((response) => {
                    if (!response) {
                        console.log("no response");
                    } else {
                        onClose();
                    }
                })
                .catch((error) => {
                    alert("Could not create pin, received error: ", error);
                });
            localStorage.setItem("Pin_exists", true);
        }
    }

    useEffect(() => {
        const pinAvailable = localStorage.getItem("Pin_exists");
        if (pinAvailable === "true") {
            setPinExists(true);
        } else {
            setPinExists(false);
        }
    }, []);

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className={styles.setPinModal}
            dialogClassName={styles.myModalDialog}
            contentClassName={styles.myModalContent}
        >
            <div className={styles.pinHeading}>Set Pin</div>
            <div className={styles.inputSection}>
                <span className={styles.labels}>Enter new pin</span>
                <div className={styles.inputRow}>
                    <input
                        className={styles.inputBox}
                        type={passwordShown1 ? "text" : "password"}
                        name="pin"
                        maxLength={4}
                        onChange={(e) => {
                            setPin(e.target.value);
                        }}
                    ></input>
                    <i
                        id="togglePassword"
                        className={
                            passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
                        }
                        onClick={() => setPasswordShown1(!passwordShown1)}
                    ></i>
                </div>
            </div>
            <div className={styles.inputSection}>
                <span className={styles.labels}>Confirm new pin</span>
                <div className={styles.inputRow}>
                    <input
                        className={styles.inputBox}
                        type={passwordShown2 ? "text" : "password"}
                        name="confirm pin"
                        maxLength={4}
                    ></input>
                    <i
                        id="togglePassword"
                        className={
                            passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
                        }
                        onClick={() => setPasswordShown2(!passwordShown2)}
                    ></i>
                </div>
            </div>
            {error && (
                <span className={styles.errorMsg}>
                    Error while setting a pin
                </span>
            )}
            <button onClick={createNewPin} className={styles.enterPinButton}>
                Save Changes
            </button>
        </Modal>
    );
}

export default SetPinModal;

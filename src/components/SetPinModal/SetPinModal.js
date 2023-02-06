import { getValue } from "@testing-library/user-event/dist/utils/index.js";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { createPin, updateExistingPin } from "../../api/PinVerification.js";

import styles from "./SetPinModal.module.css";

function SetPinModal({ show, onClose }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    const [pinExists, setPinExists] = useState(false);

    function createNewPin() {
        if (pin === "") {
            setError(true);
        } else if (pinExists) {
            updateExistingPin(pin).then((response) => {
                if (!response) {
                    console.log("No response");
                } else {
                    // console.log(response);
                    console.log("Pin updated frontend");
                    onClose();
                }
            });
        } else {
            createPin(pin)
                .then((response) => {
                    if (!response) {
                        console.log("no response");
                    } else {
                        // console.log(response);
                        onClose();
                    }
                })
                .catch((error) => {
                    console.log(
                        "Could not create pin, received error: ",
                        error
                    );
                });
            localStorage.setItem("Pin_exists", true);
        }
    }

    useEffect(() => {
        const pinAvailable = localStorage.getItem("Pin_exists");
        console.log(pinAvailable);
        if (pinAvailable === "true") {
            setPinExists(true);
        } else {
            setPinExists(false);
        }
        
    }, []);

    const [passwordShown1, setPasswordShown1] = useState(false);
    const togglePassword1 = () => {
        setPasswordShown1(!passwordShown1);
    };
    
    const [passwordShown2, setPasswordShown2] = useState(false);
    const togglePassword2 = () => {
        setPasswordShown2(!passwordShown2);
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className={styles.setpinModal}
        >
            <div className={styles.modalContents}>
                <div className={styles.pinHeading}>Set Pin</div>
                {/* <div className="pin-boxes"> */}
                <label htmlFor="">Enter new pin</label>
                <br />
                <input
                    type={passwordShown1 ? "text" : "password"}
                    name="pin"
                    maxLength={4}
                    onChange={(e) => {
                        setPin(e.target.value);
                    }}
                ></input>
                <i
                    className={
                        passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
                    }
                    id="togglePassword"
                    onClick={togglePassword1}
                ></i>
                <br />
                <label htmlFor="">Confirm new pin</label>
                <br />
                <input
                    type={passwordShown2 ? "text" : "password"}
                    name="confirm pin"
                    id="password"
                    maxLength={4}
                ></input>
                <i
                    className={
                        passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
                    }
                    id="togglePassword"
                    onClick={togglePassword2}
                ></i>
                {error && (
                    <label style={{ color: "red" }}>
                        Error while setting a pin
                    </label>
                )}
                <button onClick={createNewPin} className={styles.enterPinButton}>
                    Save Changes
                </button>
            </div>
        </Modal>
    );
}

export default SetPinModal;

import React, { useEffect, useState } from "react";
import "./LockModal.css";
import Modal from "react-bootstrap/Modal";
import { verifyPin } from "../../api/PinVerification";
import PinInput from "react-pin-input";

function LockModal({ show, onClose }) {

    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    localStorage.setItem("Lock_Is_On", true);

    function verifyEnteredPin() {
        if (pin === "") {
            setError(true);
        } else {
            verifyPin(pin).then((response) => {
                if (!response) {
                    console.log("no response");
                    setError(true);
                } else {
                    // console.log(response);
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
            className="lockpin-modal"
        >
            <div className="modal-contents">
                <div className="pin-heading">Enter Account Pin</div>
                <PinInput
                    length={4}
                    initialValue=""
                    secret
                    onChange={(value, index) => {}}
                    type="numeric"
                    inputMode="number"
                    style={{ padding: "10px" }}
                    inputStyle={{ borderColor: "#EBF0F5"}}
                    inputFocusStyle={{ borderColor: "black" }}
                    onComplete={(value, index) => {
                        setPin(value); 
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
                <br />
                {error && (
                    <label style={{ color: "red" }}>
                        Please enter the correct pin
                    </label>
                )}
                <button onClick={verifyEnteredPin} className="enter-pin-button">
                    Enter
                </button>
            </div>
        </Modal>
    );
}

export default LockModal;

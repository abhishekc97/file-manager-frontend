import React, { useEffect, useState } from "react";
import "./LockModal.css";
import Modal from "react-bootstrap/Modal";
import { verifyPin } from "../../api/PinVerification";

function LockModal({ show, onClose }) {
    // const showHideClassName = show
    //     ? "modal display-block"
    //     : "modal display-none";

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
                {/* <div className="pin-heading">Enter Pin</div> */}
                <label htmlFor="">Enter Account pin</label>
                <br />
                <input
                    type="password"
                    name="pin"
                    maxLength={4}
                    onChange={(e) => {
                        setPin(e.target.value);
                    }}
                ></input>
                <br />
                {error && (
                    <label style={{ color: "red" }}>
                        Please enter the correct pin
                    </label>
                )}
                <br />
                {/* <div className="pin-boxes">Pin</div> */}
                <button onClick={verifyEnteredPin} className="enter-pin-button">
                    Enter
                </button>
            </div>
        </Modal>
    );
}

export default LockModal;

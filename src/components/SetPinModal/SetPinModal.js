import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { createPin, updateExistingPin } from "../../api/PinVerification.js";

import "./SetPinModal.css";

function SetPinModal({ show, onClose }) {
    // const input = useRef();
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    const [pinExists, setPinExists] = useState(false);

    

    function createNewPin() {
        // let pin = input.value;
        // if(!pin) setError(true);
        // console.log(pin);
        if (pin === "") {
            setError(true);
        } else if(pinExists) {
            updateExistingPin(pin).then((response) => {
                if(!response) {
                    console.log("No response");
                } else {
                    console.log(response);
                    console.log("Pin updated frontend");
                    onClose();
                }
            })
        } else {
            createPin(pin)
                .then((response) => {
                    if (!response) {
                        console.log("no response");
                    } else {
                        console.log(response);
                        onClose();
                    }
                })
                .catch((error) => {
                    console.log(
                        "Could not create pin, received error: ",
                        error
                    );
                });
        }
    }

    useEffect(() => {
        const pinAvailable = localStorage.getItem("Pin_exists");
        if(pinAvailable) setPinExists(true);
    }, []);

    return (
        <Modal show={show} backdrop="static" keyboard={false}>
            <div className="modal-contents">
                <div className="pin-heading">Set Pin</div>
                {/* <div className="pin-boxes"> */}
                <label htmlFor="">Enter new pin</label>
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
                <label htmlFor="">Confirm new pin</label>
                <br />
                <input type="password" name="confirm pin" maxLength={4}></input>
                {error && <label>Error while setting a pin</label>}
                <button onClick={createNewPin} className="enter-pin-button">
                    Save Changes
                </button>
            </div>
        </Modal>
    );
}

export default SetPinModal;

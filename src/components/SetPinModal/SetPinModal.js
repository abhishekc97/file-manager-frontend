import React from "react";
import Modal from 'react-bootstrap/Modal';
import "./SetPinModal.css"

function SetPinModal({ show, onClose }) {
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <div className="modal-contents">
                <div className="pin-heading">Set Pin</div>
                <div className="pin-boxes">
                    <label htmlFor="">Enter new pin</label><br />
                    <input type="password" name="pin"></input><br />
                    <label htmlFor="">Confirm new pin</label><br />
                    <input type="password" name="confirm pin"></input>
                </div>
                <div>
                    <button onClick={onClose} className="enter-pin-button">
                    Save Changes
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default SetPinModal;

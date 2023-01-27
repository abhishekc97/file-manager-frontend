import React from "react";
import "./LockModal.css";
import Modal from "react-bootstrap/Modal";

function LockModal({ show, onClose }) {
    // const showHideClassName = show
    //     ? "modal display-block"
    //     : "modal display-none";

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            // className={showHideClassName}
        >
            <div className="modal-contents">
                <div className="pin-heading">Enter Pin</div>
                <div className="pin-boxes">Pin</div>
                <div>
                    <button onClick={onClose} className="enter-pin-button">
                        Enter
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default LockModal;

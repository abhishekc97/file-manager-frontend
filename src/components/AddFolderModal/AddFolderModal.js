import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { createNewFolder } from "../../api/FileOperations";
import { useNavigate } from "react-router-dom";

import "./AddFolderModal.css";

function AddFolderModal({ show, onClose }) {
    const navigate = useNavigate();

    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState(false);

    function createFolder() {
        if (folderName === "") {
            setError(true);
        } else {
            createNewFolder(folderName)
                .then((response) => {
                    console.log(response);
                    console.log("New Folder made");
                    navigate(`/${folderName}`);
                })
                .catch((err) => {
                    console.log(err);
                });
            onClose();
        }
    }

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            className="addfolder-modal"
        >
            <div className="modal-contents">
                <div className="folder-heading">Create Folder</div>
                <label htmlFor="">Enter folder name</label>
                <input
                    type="text"
                    name="foldername"
                    onChange={(e) => {
                        setFolderName(e.target.value);
                    }}
                ></input>
                {error && (
                    <label style={{ color: "red" }}>
                        Please enter a folder name
                    </label>
                )}
                <button onClick={createFolder} className="create-folder-button">
                    Create now
                </button>
            </div>
        </Modal>
    );
}

export default AddFolderModal;

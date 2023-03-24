import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { createNewFolder } from "../../api/FileOperations";
import { useNavigate } from "react-router-dom";
import styles from "./AddFolderModal.module.css";

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
            onHide={onClose}
            keyboard={false}
            className={styles.addfolderModal}
            dialogClassName={styles.myModalDialog}
            contentClassName={styles.myModalContent}
        >
            <div className={styles.folderHeading}>Create Folder</div>
            <span>Enter folder name</span>
            <input
                type="text"
                className={styles.folderNameInput}
                name="foldername"
                onChange={(e) => {
                    setFolderName(e.target.value);
                }}
            ></input>
            {error && (
                <span className={styles.errorMsg}>
                    Please enter a folder name
                </span>
            )}
            <button
                onClick={createFolder}
                className={styles.createFolderButton}
            >
                Create now
            </button>
        </Modal>
    );
}

export default AddFolderModal;

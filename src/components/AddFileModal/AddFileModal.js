import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { createNewFile } from "../../api/FileOperations";

import styles from "./AddFileModal.module.css";

function AddFileModal({ show, onClose, onFileAdded }) {
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState(false);

    // useparams for getting current folder
    let { folderName } = useParams();

    function createFile() {
        if (folderName === "") {
            setError(true);
        } else {
            createNewFile(fileName, folderName)
                .then((response) => {
                    console.log("New File made");
                    onFileAdded();
                })
                .catch((err) => {
                    console.log(err);
                });
            onClose();
            localStorage.setItem("File_Added", "true");
        }
    }

    useEffect(() => {});

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className={styles.addfileModal}
            dialogClassName={styles.myModalDialog}
            contentClassName={styles.myModalContent}
        >
            <div className={styles.fileHeading}>Create File</div>
            <span>Enter file name</span>
            <input
                type="text"
                className={styles.fileNameInput}
                name="filename"
                onChange={(e) => {
                    setFileName(e.target.value);
                }}
            ></input>
            {error && (
                <span className={styles.errorMsg}>
                    Please enter a file name
                </span>
            )}
            <button onClick={createFile} className={styles.createFileButton}>
                Create now
            </button>
        </Modal>
    );
}

export default AddFileModal;

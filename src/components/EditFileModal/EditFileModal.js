import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { editFileContents } from "../../api/FileOperations";

import styles from "./EditFileModal.module.css";

function EditFileModal({ show, onClose, id, file }) {
    const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false);

    const [fileContent, setFileContent] = useState();
    function handleInputChange(e) {
        setFileContent(e.target.value);
    }
    async function saveFile() {
        const results = await editFileContents(id, fileContent);
        if (results) onClose();
    }

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className={styles.editfileModal}
            style={{ border: "none" }}
        >
            <div className={styles.modalContents}>
                <div className={styles.fileHeading}>
                    <span className={styles.fileHeading}>
                        Edit File
                    </span>
                    {/* &nbsp; -&gt; {file.name} */}
                </div>
                <div className={styles.autosaveBox}>
                    {showAutoSaveMessage && <div>...Auto saving</div>}
                </div>
                <textarea
                    className={styles.editfileInput}
                    name="text"
                    onChange={handleInputChange}
                ></textarea>
                <button onClick={saveFile} className={styles.createfileButton}>
                    Save File
                </button>
                {/* {fileContent} */}
            </div>
        </Modal>
    );
}

export default EditFileModal;

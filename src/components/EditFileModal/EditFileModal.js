import React, { useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import { editFileContents } from "../../api/FileOperations";
import JoditEditor from "jodit-react";
import styles from "./EditFileModal.module.css";

function EditFileModal({ show, onClose, id, file, handleFileUpdate }) {
    const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false);

    const [fileContent, setFileContent] = useState();

    async function saveFile() {
        const results = editFileContents(id, fileContent).then(() => {
            handleFileUpdate();
        });
        onClose();
    }
    const buttons = ["bold", "|", "italic", "|", "underline"];
    const config = useMemo(
        () => ({
            readonly: false, // all options from https://xdsoft.net/jodit/doc/,
            toolbar: true,
            placeholder: file.contents || "Type anything here...",
            buttons: buttons,
            height: 300,
            width: 467,
        }),
        [file]
    );

    function handleEditorChange(value) {
        setFileContent(value);
    }

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className={styles.editfileModal}
            dialogClassName={styles.myModalDialog}
            contentClassName={styles.myModalContent}
        >
            <div className={styles.top}>
                <div className={styles.fileHeading}>Edit File</div>
                <div className={styles.autosaveBox}>
                    {showAutoSaveMessage && <div>...Auto saving</div>}
                </div>
            </div>
            <JoditEditor
                value={file.contents}
                config={config}
                onChange={(newContent) => handleEditorChange(newContent)}
            />
            <button onClick={saveFile} className={styles.createfileButton}>
                Save File
            </button>
        </Modal>
    );
}

export default EditFileModal;

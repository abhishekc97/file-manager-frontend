import JoditEditor from "jodit-react";
import React, { useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import { editFileContents } from "../../api/FileOperations";

import styles from "./EditFileModal.module.css";

function EditFileModal({ show, onClose, id, file, handleFileUpdate }) {
    
    console.log("file", file.contents);
    const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false);

    const [fileContent, setFileContent] = useState();
    
    function handleInputChange(e) {
        setFileContent(e.target.value);
    }
    async function saveFile() {
        const results = editFileContents(id, fileContent).then(() => {handleFileUpdate()});
        onClose(); //if (results)
    }
    const buttons = ['bold', '|', 'italic','|', 'underline']
    const config = useMemo(() =>(
        {
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
            style={{ border: "none" }}
        >
            <div className={styles.modalContents}>
                <div className={styles.fileHeading}>
                    <span className={styles.fileHeading}>Edit File</span>
                    {/* &nbsp; -&gt; {file.name} */}
                </div>
                <div className={styles.autosaveBox}>
                    {showAutoSaveMessage && <div>...Auto saving</div>}
                </div>
                {/* <textarea
                    className={styles.editfileInput}
                    name="text"
                    value={file.contents}
                    onChange={handleInputChange}
                ></textarea> */}
                <JoditEditor
                    value={file.contents}
                    config={config}
                    onChange={(newContent) => handleEditorChange(newContent)}
                />
                <button onClick={saveFile} className={styles.createfileButton}>
                    Save File
                </button>
                {/* {fileContent} */}
            </div>
        </Modal>
    );
}

export default EditFileModal;

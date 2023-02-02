import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { editFileContents, getFile } from "../../api/FileOperations";

import "./EditFileModal.css";

function EditFileModal({ id, show, onClose }) {

    const [fileContent, setFileContent] = useState("");
    const [error, setError] = useState(false);
    
    const [initialFileContent, setInitialFileContent] = useState("");

    function getFileContentFromDB() {
        getFile()
    }

    async function editFile() {

        const results = await editFileContents(id, fileContent)
    }

    function handleInputChange(e) {
        console.log(e.target.value);
    }

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className="addfile-modal"
        >
            <div className="modal-contents">
                <div className="file-heading">Edit File</div>
                {/* <label htmlFor="">Enter file name</label> */}
                <input
                    type="text"
                    name="filename"
                    placeholder="Type Anything here.."
                    defaultValue={initialFileContent}
                    onChange={handleInputChange}
                ></input>
                {error && (
                    <label style={{ color: "red" }}>
                        Please enter some text
                    </label>
                )}
                <button onClick={editFile} className="create-file-button">
                    Save File
                </button>
            </div>
        </Modal>
    );
}

export default EditFileModal;

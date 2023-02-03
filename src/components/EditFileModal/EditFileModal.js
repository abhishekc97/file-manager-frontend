import React, { useEffect, useState } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { editFileContents, getFile } from "../../api/FileOperations";

import "./EditFileModal.css";

function EditFileModal({ id, show, onClose, file }) {
    
    const [fileContent, setFileContent] = useState("");
    const [error, setError] = useState(false);
    const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false);

    // console.log(file._id);
    // console.log(file.name);
    // console.log(file.contents);

    async function saveFile() {
        const results = await editFileContents(id, fileContent);
        if(results) onClose();
    }

    function handleInputChange(e) {
        // console.log(e.target.value);
        setFileContent(e.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            editFileContents(id, fileContent).then(() => console.log('data auto saved'));
            setShowAutoSaveMessage(true);
            setTimeout(() => { setShowAutoSaveMessage(false);}, 2000); 
        }, 5000);
    }, [fileContent]);

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className="editfile-modal"
            style={{ border: "none" }}
        >
            <div className="modal-contents">
                <div className="file-heading">
                    <span className="file-heading">Edit File</span>
                    <label>{file.name}</label>
                </div>
                {showAutoSaveMessage  && (<div>...Auto saving</div>)}
                <textarea 
                    className="edit-file-input"
                    name="filename"
                    placeholder="Type Anything here.."
                    defaultValue={file.contents}
                    onChange={handleInputChange}>
                </textarea>
                
                {error && (
                    <label style={{ color: "red" }}>
                        Please enter some text
                    </label>
                )}
                <button onClick={saveFile} className="create-file-button">
                    Save File
                </button>
            </div>
        </Modal>
    );
}

export default EditFileModal;

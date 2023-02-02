import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { createNewFile } from "../../api/FileOperations";
import { useNavigate } from "react-router-dom";

import "./AddFileModal.css";

function AddFileModal({ show, onClose, fileAdded }) {
    const navigate = useNavigate();

    const [fileName, setFileName] = useState("");
    const [error, setError] = useState(false);

    // useparams for getting current folder
    let { folderName } = useParams();
    console.log(folderName);

    function createFile() {
        if (folderName === "") {
            setError(true);
        } else {
            // let folderNametemp = "folder 3"
            createNewFile(fileName, folderName)
                .then((response) => {
                    console.log(response);
                    console.log("New File made");
                    navigate(`/${folderName}`);
                })
                .catch((err) => {
                    console.log(err);
                });
            onClose();
            localStorage.setItem("File_Added", "true");
            // fileAdded += 1;
        }
    }

    useEffect(() => {

    })

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className="addfile-modal"
        >
            <div className="modal-contents">
                <div className="file-heading">Create File</div>
                <label htmlFor="">Enter file name</label>
                <input
                    type="text"
                    name="filename"
                    onChange={(e) => {
                        setFileName(e.target.value);
                    }}
                ></input>
                {error && (
                    <label style={{ color: "red" }}>
                        Please enter a file name
                    </label>
                )}
                <button onClick={createFile} className="create-file-button">
                    Create now
                </button>
            </div>
        </Modal>
    );
}

export default AddFileModal;

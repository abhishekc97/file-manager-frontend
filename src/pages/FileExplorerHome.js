import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LockModal from "../components/LockFolderModal/LockModal.js";
import SetPinModal from "../components/SetPinModal/SetPinModal.js";
import AddFileModal from "../components/AddFileModal/AddFileModal.js";
import AddFolderModal from "../components/AddFolderModal/AddFolderModal.js";
import { getStatus } from "../api/PinVerification.js";
import { getFiles, getAllFolders } from "../api/FileOperations";
import "./FileExplorerHome.css";
import File from "../components/Files/File.js";
import Folder from "../components/Folders/Folder.js";

function FileExplorerHome() {
    const [showLockModal, setShowLockModal] = useState(false);
    const [showSetPinModal, setShowSetPinModal] = useState(false);

    const [showCreateFileModal, setShowCreateFileModal] = useState(false);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showEditFileModal, setShowEditFileModal] = useState(false);

    const [filesList, setFilesList] = useState([]);

    useEffect(() => {
        let lockIsOpen = localStorage.getItem("Lock_Is_On");

        console.log(lockIsOpen);
        if (lockIsOpen === "true") {
            setShowLockModal(true);
            // console.log(typeof lockIsOpen);
        } else if(lockIsOpen === "false") {
            setShowLockModal(false);
            // console.log(typeof lockIsOpen);
        }
    }, []);

    async function findPinStatus() {
        const response = await getStatus();

        if (!response) {
            console.log("no response");
            setShowSetPinModal(true);
            localStorage.setItem("Pin_exists", false);
        } else {
            console.log(response.data);
            localStorage.setItem("Pin_exists", true);
        }
    }

    useEffect(() => {
        findPinStatus();
    }, []);

    async function getAllFiles() {
        let currentFolder = "folder1";
        const results = await getFiles(currentFolder);
        setFilesList(results);
    }

    return (
        <div className="file-explorer-home-container">
            <div className="sidebar">
                <div className="app-logo">Logo</div>
                <div className="add-buttons-wrapper">
                    <button
                        className="add-file"
                        onClick={() => setShowCreateFileModal(true)}
                    >
                        <span className="add-file-icon"></span>
                        Add File
                    </button>
                    {showCreateFileModal && (
                        <AddFileModal
                            show={showCreateFileModal}
                            onClose={() => setShowCreateFileModal(false)}
                        />
                    )}
                    <button
                        className="add-folder"
                        onClick={() => {
                            setShowCreateFolderModal(true);
                        }}
                    >
                        <span className="add-folder-icon"></span>
                        Add Folder
                    </button>
                    {showCreateFolderModal && (
                        <AddFolderModal
                            show={showCreateFolderModal}
                            onClose={() => setShowCreateFolderModal(false)}
                        />
                    )}
                </div>
                <div className="folder-section-container">
                    <Folder />
                </div>
                <button
                    className="lock-button-wrapper"
                    onClick={() => setShowLockModal(true)}
                >
                    <span className="lock-now-icon"></span>
                    Lock Now
                </button>
                {showLockModal && (
                    <LockModal
                        show={showLockModal}
                        onClose={() => setShowLockModal(false)}
                    />
                )}
            </div>
            <div className="right-container">
                <div className="app-options-bar">
                    <div className="search-bar">
                        <input
                            className="search-box"
                            type="text"
                            placeholder="search bar"
                        />
                    </div>
                    <button
                        className="settings-button"
                        onClick={() => setShowSetPinModal(true)}
                    >
                        <span className="settings-icon"></span>
                    </button>
                    {showSetPinModal &&
                        createPortal(
                            <SetPinModal
                                show={showSetPinModal}
                                onClose={() => setShowSetPinModal(false)}
                            />,
                            document.body
                        )}
                    <button className="logout-button">
                        <span className="logout-icon"></span>
                    </button>
                    foldername/filename
                </div>
                <hr />
                horizontal rule folder contents
                <div className="file-section-container">
                    <File />
                </div>
            </div>
        </div>
    );
}

export default FileExplorerHome;

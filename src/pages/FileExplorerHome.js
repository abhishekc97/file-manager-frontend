import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LockModal from "../components/LockFolderModal/LockModal.js";
import SetPinModal from "../components/SetPinModal/SetPinModal.js";
import AddFileModal from "../components/AddFileModal/AddFileModal.js";
import AddFolderModal from "../components/AddFolderModal/AddFolderModal.js";
import EditFileModal from "../components/EditFileModal/EditFileModal.js";
import Files from "../components/Files/Files.js";
import Folders from "../components/Folders/Folders.js";
import { getStatus } from "../api/PinVerification.js";
import { getFiles, getAllFilesFromCollection } from "../api/FileOperations";
import "./FileExplorerHome.css";

function FileExplorerHome() {
    const [showLockModal, setShowLockModal] = useState(false);
    const [showSetPinModal, setShowSetPinModal] = useState(false);

    const [showCreateFileModal, setShowCreateFileModal] = useState(false);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showEditFileModal, setShowEditFileModal] = useState(false);

    /** Locking functionality */
    useEffect(() => {
        let lockIsOpen = localStorage.getItem("Lock_Is_On");

        if (lockIsOpen === "true") {
            setShowLockModal(true);
        } else if (lockIsOpen === "false") {
            setShowLockModal(false);
        }
    }, []);

    async function findPinStatus() {
        const response = await getStatus();

        if (!response) {
            setShowSetPinModal(true);
            localStorage.setItem("Pin_exists", "false");
        } else {
            localStorage.setItem("Pin_exists", "true");
        }
    }

    useEffect(() => {
        findPinStatus();
    }, []);

    /** Listing folders and files */
    let { folderName } = useParams(); // useparams for getting current folder

    // set files of the selected folder
    const [filesList, setFilesList] = useState([]);

    async function getAllFiles() {
        const results = await getFiles(folderName);
        setFilesList(results.data);
    }
    useEffect(() => {
        getAllFiles();
    }, [folderName]);

    // Re-fetch all files and update the state when a new file is added or a file is updated
    function handleAddNewFileAndUpdateFile() {
        getAllFiles();
    }

    /** Search functionality */
    const [value, setValue] = useState("");
    const [files, setFiles] = useState([]);
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    async function fetchAllFiles() {
        const results = await getAllFilesFromCollection();
        setFiles(results);
    }
    useEffect(() => {
        fetchAllFiles();
    }, [showEditFileModal]);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        openEditFileModal();
    };

    const [fileId, setFileId] = useState("");
    const [file, setFile] = useState();

    function openEditFileModal(file_id, file) {
        setFileId(file_id);
        setFile(file);
        setShowEditFileModal(true);
    }

    return (
        <div className="file-explorer-home-container">
            <div className="sidebar">
                <img src="images/logo.png" alt="" className="app-logo" />
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
                            onFileAdded={handleAddNewFileAndUpdateFile}
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
                    <Folders />
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
                    <div className="search-container">
                        <div className="search-inner">
                            <button
                                className="search-icon"
                                onClick={() => onSearch(value)}
                            ></button>
                            <input
                                type="text"
                                value={value}
                                onChange={onChange}
                                className="search-input-box"
                                placeholder="Search for any file"
                                onClick={() => setIsDropdownActive(true)}
                                onBlur={() => setIsDropdownActive(false)}
                            />
                        </div>
                        <div
                            className={
                                isDropdownActive ? "dropdown" : "dropdown-empty"
                            }
                        >
                            {files
                                .filter((file) => {
                                    const searchTerm =
                                        typeof value === "string"
                                            ? value.toLocaleLowerCase()
                                            : "";
                                    const name =
                                        typeof file.name === "string"
                                            ? file.name.toLocaleLowerCase()
                                            : "";
                                    return searchTerm &&
                                        typeof name === "string"
                                        ? name.includes(searchTerm)
                                        : "" && name !== searchTerm;
                                })
                                .slice(0, 5)
                                .map((file) => (
                                    <div
                                        onClick={() => {
                                            onSearch(file.name);
                                            openEditFileModal(file._id, file);
                                        }}
                                        className="dropdown-row"
                                        key={file._id}
                                    >
                                        <div className="dropdown-row-icon"></div>
                                        <div className="dropdownText">
                                            {file.name}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {showEditFileModal && (
                            <EditFileModal
                                id={fileId}
                                file={file}
                                show={showEditFileModal}
                                onClose={() => setShowEditFileModal(false)}
                                onFileUpdate={handleAddNewFileAndUpdateFile}
                            />
                        )}
                    </div>
                    <button
                        className="settings-button"
                        onClick={() => setShowSetPinModal(true)}
                    >
                        <span className="settings-icon"></span>
                    </button>
                    {showSetPinModal && (
                        <SetPinModal
                            show={showSetPinModal}
                            onClose={() => setShowSetPinModal(false)}
                        />
                    )}
                    <button
                        className="logout-button"
                        onClick={() => setShowLockModal(true)}
                    >
                        <span className="logout-icon"></span>
                    </button>
                </div>
                <div className="breadcrumbs">{`${folderName} /`}</div>
                <hr />
                <div className="file-section-container">
                    <Files
                        filesList={filesList}
                        handleFileUpdate={handleAddNewFileAndUpdateFile}
                    />
                </div>
            </div>
        </div>
    );
}

export default FileExplorerHome;

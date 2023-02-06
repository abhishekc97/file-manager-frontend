import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import LockModal from "../components/LockFolderModal/LockModal.js";
import SetPinModal from "../components/SetPinModal/SetPinModal.js";
import AddFileModal from "../components/AddFileModal/AddFileModal.js";
import AddFolderModal from "../components/AddFolderModal/AddFolderModal.js";
import EditFileModal from "../components/EditFileModal/EditFileModal.js";
import { getStatus } from "../api/PinVerification.js";
import {
    getFiles,
    getAllFolders,
    getAllFilesFromCollection,
} from "../api/FileOperations";
import "./FileExplorerHome.css";
import Files from "../components/Files/Files.js";
import Folders from "../components/Folders/Folders.js";

function FileExplorerHome() {
    const [showLockModal, setShowLockModal] = useState(false);
    const [showSetPinModal, setShowSetPinModal] = useState(false);

    const [showCreateFileModal, setShowCreateFileModal] = useState(false);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showEditFileModal, setShowEditFileModal] = useState(false);
    // const [searchText, setSearchText] = useState("");

    // console.log(showCreateFileModal, showCreateFolderModal, showEditFileModal);

    useEffect(() => {
        let lockIsOpen = localStorage.getItem("Lock_Is_On");

        // console.log(lockIsOpen);
        if (lockIsOpen === "true") {
            setShowLockModal(true);
            // console.log(typeof lockIsOpen);
        } else if (lockIsOpen === "false") {
            setShowLockModal(false);
            // console.log(typeof lockIsOpen);
        }
    }, []);

    async function findPinStatus() {
        const response = await getStatus();

        if (!response) {
            // console.log("no response");
            setShowSetPinModal(true);
            localStorage.setItem("Pin_exists", "false");
        } else {
            // console.log(response.data);
            localStorage.setItem("Pin_exists", "true");
        }
    }

    useEffect(() => {
        findPinStatus();
    }, []);

    // async function getAllFiles() {
    //     let currentFolder = "folder1";
    //     const results = await getFiles(currentFolder);
    //     setFilesList(results);
    // }

    // const [refreshNewFiles, setRefreshNewFiles] = useState(false);

    // async function findRefreshStatus() {
    //     let fileAdded = localStorage.getItem("File_Added");

    //     if (fileAdded === "true") {
    //         setRefreshNewFiles(true);
    //     } else if (fileAdded === "true") {
    //         setRefreshNewFiles(false);
    //     }
    // }

    // useEffect(() => {
    //     findRefreshStatus();
    // }, []);

    /** List all files */
    const navigate = useNavigate();
    // useparams for getting current folder
    let { folderName } = useParams();

    const [filesList, setFilesList] = useState([
        { name: "" },
        { name: "file 2" },
    ]);

    async function getAllFiles() {
        // console.log(folderName);
        const results = await getFiles(folderName);
        // console.log(results);
        setFilesList(results.data);

        if (results) {
            if (!folderName) {
                const defaultFile = filesList[0];
                const defaultFileName = defaultFile.name;
                console.log(defaultFileName);
                navigate(`/${folderName}`); // navigate(`/${folderName}/:${defaultFileName}`);
            }
        }
    }
    useEffect(() => {
        getAllFiles();
    }, [folderName]);

    const [updateCounter, setUpdateCounter] = useState(0);

    async function handleFileAdded() {
        // Re-fetch data from the API and update the state
        getAllFiles();
        console.log("inside handlefileadded");
        // const results = await getFiles(folderName);
        // console.log(results);
        // setFilesList(results.data);

        setUpdateCounter(updateCounter + 1);
    }

    /** Search functions */
    const [value, setValue] = useState("");

    const [files, setFiles] = useState([]);

    const [dropdownIsActive, setActive] = useState("false");
    const toggleClass = () => {
        setActive(!dropdownIsActive);
    };

    async function fetchAllFiles() {
        const results = await getAllFilesFromCollection();
        setFiles(results);
        // console.log(results);
    }
    useEffect(() => {
        fetchAllFiles();
    },[showEditFileModal]);

    const onChange = (event) => {
        toggleClass();
        setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        // our api to fetch the search result
        console.log("search ", searchTerm);
        toggleClass();
        openEditFileModal();
    };

    
    const [fileId, setFileId] = useState("");
    const [file, setFile] = useState();

    function openEditFileModal(file_id, file) {
        setShowEditFileModal(true);
        setFileId(file_id);
        setFile(file);
    }

    return (
        <div className="file-explorer-home-container">
            <div className="sidebar">
                <div className="app-logo"></div>
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
                            onFileAdded={handleFileAdded}
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
                            />
                        </div>
                        <div
                            className={
                                dropdownIsActive ? "dropdown" : "dropdown-empty"
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
                                        {file.name}
                                    </div>
                                ))}
                        </div>
                        {showEditFileModal && (
                            <EditFileModal
                                id={fileId}
                                file={file}
                                show={showEditFileModal}
                                onClose={() => setShowEditFileModal(false)}
                            />
                        )}
                    </div>

                    {/* <div className="search-bar">
                        <input
                            className="search-box"
                            type="text"
                            placeholder="search bar"
                        />
                    </div> */}
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
                    <button
                        className="logout-button"
                        onClick={() => setShowLockModal(true)}
                    >
                        <span className="logout-icon"></span>
                    </button>
                </div>
                <hr />
                <div className="file-section-container">
                    <Files
                        filesList={filesList}
                        updateCounter={updateCounter}
                    />
                </div>
            </div>
        </div>
    );
}

export default FileExplorerHome;

import React, { useEffect } from "react";
import { useState } from "react";
import { createPortal } from 'react-dom';
import LockModal from "../components/LockFolderModal/LockModal.js";
import SetPinModal from "../components/SetPinModal/SetPinModal.js";

import { getStatus, createPin, verifyPin } from "../api/PinVerification.js";

import "./FileExplorerHome.css";

function FileExplorerHome() {
    const [showLockModal, setShowLockModal] = useState(false);
    const [showSetPinModal, setShowSetPinModal] = useState(false);

    const [showCreateFileModal, setShowCreateFileModal] = useState(false);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showEditFileModal, setShowEditFileModal] = useState(false);

    

    async function findPinStatus() {
        const response = await getStatus();
        
        if(!response) {
            console.log("no response");
            setShowSetPinModal(true);
        } else {
            console.log(response.data);
            localStorage.setItem("Pin_exists", "true");
        }
    }

    useEffect(() => {
        findPinStatus();
    }, []);
    
    // async function createNewPin() {
    //     const response = await createPin("5588");
    //     if(!response) {
    //         console.log("no response");
    //     } else {
    //         console.log(response);
    //     }
    // }

    // useEffect(() => {
    //     createNewPin();
    // }, []);

    async function verifyGivenPin() {
        const response = await verifyPin("1234");
        if(!response) {
            console.log("no response");
        } else {
            console.log(response);
        }
    }
    // useEffect(() => {
    //     verifyGivenPin();
    // }, []);


    return (
        <div className="file-explorer-home-container">
            <div className="sidebar">
                <div className="app-logo">Logo</div>
                <div className="add-buttons-wrapper">
                    <button className="add-file">
                        <span className="add-file-icon"></span>
                        Add File
                    </button>
                    <button className="add-folder">
                        <span className="add-folder-icon"></span>
                        Add Folder
                    </button>
                </div>
                <div className="folder-section">
                    folder selection divs
                    <div className="folder-box">folder name 1</div>
                    <div className="folder-box">folder name 2</div>
                </div>
                <button className="lock-button-wrapper" onClick={() => setShowLockModal(true)}>
                    <span className="lock-now-icon"></span>
                    Lock Now
                </button>
                { showLockModal && 
                    <LockModal show={showLockModal} onClose={ () => setShowLockModal(false)} />
                    
                }
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
                    <button className="settings-button" onClick={() => setShowSetPinModal(true)} >
                        <span className="settings-icon"></span>
                    </button>
                    {
                        showSetPinModal && createPortal(
                            <SetPinModal show={showSetPinModal} onClose={ () => setShowSetPinModal(false) } />, 
                            document.body
                        )
                    }
                    <button className="logout-button">
                        <span className="logout-icon"></span>
                    </button>
                    foldername/filename
                </div>
                <hr />
                horizontal rule folder contents
            </div>
        </div>
    );
}

export default FileExplorerHome;

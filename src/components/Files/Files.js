import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFiles } from "../../api/FileOperations.js";
import EditFileModal from "../EditFileModal/EditFileModal.js";
import "./Files.css";

function File({ filesList }) {
    const [showEditFileModal, setShowEditFileModal] = useState(false);

    // const navigate = useNavigate();
    // // useparams for getting current folder
    // let { folderName } = useParams();

    // const [filesList, setFilesList] = useState([
    //     { name: "" },
    //     { name: "file 2" },
    // ]);

    // async function getAllFiles() {
    //     console.log(folderName);
    //     const results = await getFiles(folderName);
    //     console.log(results);
    //     setFilesList(results.data);

    //     if (results) {
    //         if (!folderName) {
    //             const defaultFile = filesList[0];
    //             const defaultFileName = defaultFile.name;
    //             console.log(defaultFileName);
    //             navigate(`/${folderName}`); // navigate(`/${folderName}/:${defaultFileName}`);
    //         }
    //     }
    // }
    // useEffect(() => {
    //     getAllFiles();
    //     console.log(filesList);
    // }, [folderName]); //filesList[0]]

    // function openFile(id) {
    //     console.log(id);
    //     setShowEditFileModal(true);
    // }

    // async function refreshAll() {
    //     getAllFiles();
    // }

    // let refresh = refreshNewFiles;
    // useEffect(() => {
    //     refreshAll();
    //     localStorage.setItem("File_Added", "false");
    // }, [refresh]);

    return (
        <div className="file-container">
            <>
                {filesList.map((file, index) => (
                    <div className="file-box" key={index}>
                        <button
                            className="file-button"
                            onClick={() => {
                                setShowEditFileModal(true);
                            }}
                        >
                            <span className="file-icon"></span>
                        </button>
                        <div className="file-name">{file.name}</div>
                        {showEditFileModal && (
                            <EditFileModal
                                id={file._id}
                                show={showEditFileModal}
                                onClose={() => setShowEditFileModal(false)}
                            />
                        )}
                    </div>
                ))}
            </>
        </div>
    );
}

export default File;

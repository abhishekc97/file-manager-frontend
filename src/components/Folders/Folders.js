import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllFolders } from "../../api/FileOperations.js";
import "./Folders.css";

function Folder() {
    const navigate = useNavigate();
    // useparams for getting current folder
    let { folderName } = useParams();

    const [foldersList, setFoldersList] = useState([
        { name: "folder name 1" },
        { name: "folder name 2" },
    ]);

    async function getFolders() {
        const results = await getAllFolders();
        setFoldersList(results.data);

        if (results) {
            if (!folderName) {
                const defaultFolder = foldersList[0];
                const defaultFolderName = defaultFolder.name;
                navigate(`/${defaultFolderName}`);
            }
        }
    }

    useEffect(() => {
        getFolders();
    }, [folderName]);

    function navigateToFolder(folder) {
        navigate(`/${folder}`);
    }

    return (
        <div className="folders-container">
            <>
                {foldersList.map((folder, index) => (
                    <button
                        className="folder-box"
                        key={index}
                        onClick={() => {
                            navigateToFolder(folder.name);
                        }}
                    >
                        <span className="folder-icon"></span>
                        <span className="folder-name"> {folder.name} </span>
                    </button>
                ))}
            </>
        </div>
    );
}

export default Folder;

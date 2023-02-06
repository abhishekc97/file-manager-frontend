import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllFolders } from "../../api/FileOperations.js";
import styles from "./Folders.module.css";

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
        <div className={styles.foldersContainer}>
            <>
                {foldersList.map((folder, index) => (
                    <button
                        className={folder.name === folderName ? styles.folderBoxSelected: styles.folderBox}
                        key={index}
                        onClick={() => {
                            navigateToFolder(folder.name);
                        }}
                    >
                        <span className={styles.folderIcon}></span>
                        <span className={styles.folderName}> {folder.name} </span>
                    </button>
                ))}
            </>
        </div>
    );
}

export default Folder;

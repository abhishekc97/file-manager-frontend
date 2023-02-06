import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFiles } from "../../api/FileOperations.js";
import EditFileModal from "../EditFileModal/EditFileModal.js";
import styles from "./Files.module.css";

function Files({ filesList, updateCounter }) {
    const [showEditFileModal, setShowEditFileModal] = useState(false);

    const [fileId, setFileId] = useState("");
    const [file, setFile] = useState();

    function openEditFileModal(file_id, file) {
        setShowEditFileModal(true);
        setFileId(file_id);
        setFile(file);
    }

    useEffect(() => {
        // Re-render the component whenever the data or updateCounter changes
      }, [filesList, updateCounter]);

    return (
        <div className={styles.fileContainer}>
            <>
                {filesList.map((file, index) => (
                    <div className={styles.fileBox} key={index}>
                        <button
                            className={styles.fileButton}
                            onClick={() => {
                                openEditFileModal(file._id, file);
                            }}
                        >
                            <span className={styles.fileIcon}></span>
                        </button>
                        <div className={styles.fileName}>{file.name}</div>
                    </div>
                ))}
                {showEditFileModal && (
                    <EditFileModal
                        id={fileId}
                        file={file}
                        show={showEditFileModal}
                        onClose={() => setShowEditFileModal(false)}
                    />
                )}
            </>
        </div>
    );
}

export default Files;

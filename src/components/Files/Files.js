import React, { useEffect, useState } from "react";
import EditFileModal from "../EditFileModal/EditFileModal.js";
import styles from "./Files.module.css";

function Files({ filesList, handleFileUpdate }) {
    const [showEditFileModal, setShowEditFileModal] = useState(false);

    const [fileId, setFileId] = useState("");
    const [file, setFile] = useState();

    function openEditFileModal(file_id, fileObj) {
        setFileId(file_id);
        setFile(fileObj);
        setShowEditFileModal(true);
    }

    // Re-render the component whenever the data changes
    useEffect(() => {}, [fileId, file, filesList]);

    return (
        <div className={styles.fileContainer}>
            <>
                {filesList.map((file, index) => (
                    <div className={styles.fileBox} key={index}>
                        <button
                            className={styles.fileButton}
                            onDoubleClick={() => {
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
                        handleFileUpdate={handleFileUpdate}
                    />
                )}
            </>
        </div>
    );
}

export default Files;

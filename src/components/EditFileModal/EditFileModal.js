import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";
import Modal from "react-bootstrap/Modal";
import { editFileContents, getFile } from "../../api/FileOperations";
import debounce from "lodash.debounce";
import JoditEditor from "jodit-react";
import styles from "./EditFileModal.module.css";
import TextBox from "../TextBox/TextBox";

function EditFileModal({ id, show, onClose, file }) {
    // Fetch the file data contents by using an API call, for inital value in textarea, to prevent it from saving empty string
    let fileData;
    const [initialContents, setInitialContents] = useState("");

    getFile(file._id).then((response) => {
        fileData = response[0];
        console.log(response);
        setInitialContents(fileData.contents);
        console.log(initialContents);
    });

    const [fileContent, setFileContent] = useState(initialContents);

    const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedSave = useMemo(
        debounce((nextContent) => {
            editFileContents(file.id, nextContent)
                .then((response) => {
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }, 1000),
        []
    );

    const handleChange = (event) => {
        const nextContent = event.target.value;
        setFileContent(nextContent);
        debouncedSave(nextContent);
    };

    async function saveFile() {
        const results = await editFileContents(id, fileContent);
        if (results) onClose();
    }

    // const [isLoading, setIsLoading] = useState(false);

    const handleFileContentChange = debounce(async (fileContent) => {
        setIsLoading(true);
        try {
            await editFileContents(id, fileContent);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }, 1000);

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className={styles.editfileModal}
            style={{ border: "none" }}
        >
            <div className={styles.modalContents}>
                <div className={styles.fileHeading}>
                    <span className={styles.fileHeading}>
                        Edit File &nbsp; -&gt; {file.name}
                    </span>
                    {/* &nbsp; -&gt; {file.name} */}
                </div>
                <div className={styles.autosaveBox}>
                    {showAutoSaveMessage && <div>...Auto saving</div>}
                </div>
                <TextBox
                    fileContent={fileContent}
                    onFileContentChange={handleFileContentChange}
                />
                {/* <textarea
                    className={styles.editfileInput}
                    name="filename"
                    placeholder="Type Anything here.."
                    value={fileContent}
                    onChange={handleChange}
                ></textarea> */}
                <button onClick={saveFile} className={styles.createfileButton}>
                    Save File
                </button>
                {fileContent}
            </div>
        </Modal>
    );
}

export default EditFileModal;

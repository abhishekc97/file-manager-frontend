let fileData;
    const [initialContents, setInitialContents] = useState("");

    getFile(file._id).then((response) => {
        fileData = response[0];
        console.log(response);
        setInitialContents(fileData.contents);
    });

    const [fileContent, setFileContent] = useState("");
    const [error, setError] = useState(false);
    const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false);

    

// console.log(file);
    // const [value, setValue] = useState("");
    // setValue(file.contents);
    // console.log(value);
    // const editor = useRef(null);

    // const config = ["bold", "italic", "underline"];

    async function saveFile() {
        const results = await editFileContents(id, fileContent);
        if (results) onClose();
    }

    function handleInputChange(e) {
        // console.log(e.target.value);
        // setFileContent(newValue);
        setFileContent(e.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            editFileContents(id, fileContent).then(() =>
                console.log("data auto saved")
            );
            setShowAutoSaveMessage(true);
            setTimeout(() => {
                setShowAutoSaveMessage(false);
            }, 2000);
        }, 5000);
    }, [fileContent]);

    const changeHandler = (event) => {
        setFileContent(event.target.value);
    };

    //   const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);
    const debouncedChangeHandler = useMemo(() => {
        return debounce(changeHandler, 3000);
    }, []);

    // function autosave(event) {
    //     setFileContent(event.target.value);
    //     editFileContents(id, fileContent).then(() =>
    //         console.log("data auto saved")
    //     );
    //     setShowAutoSaveMessage(true);
    //     setTimeout(() => {
    //         setShowAutoSaveMessage(false);
    //     }, 2000);
    // }

    // const debouncedAutosave = useMemo(() => {
    //     return debounce(autosave, 5000);
    // }, []);
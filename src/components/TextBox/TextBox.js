import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

function TextBox({ fileContent, onFileContentChange }) {
    const [value, setValue] = useState(fileContent);
    
    useEffect(() => {
        console.log(value);
        console.log(fileContent);

    }, [fileContent]);
    // const editor = useRef(null);
    // const config = ["bold", "italic", "underline"];

    const handleChange = (event) => {
        const { value: nextValue } = event.target;
        setValue(nextValue);
        onFileContentChange(nextValue);
    };
    return (
        <textarea
            style={{
                height: "400px",
                width: "467px",
            }}
            name="filename"
            value={fileContent}
            onChange={handleChange}
        ></textarea>
        // <JoditEditor
        //     ref={editor}
        //     value={value}
        //     config={config}
        //     onChange={handleChange}
        // />
    );
}

export default TextBox;

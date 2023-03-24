import React, { useState, useEffect } from "react";

function TextBox({ fileContent, onFileContentChange }) {
    const [value, setValue] = useState(fileContent);

    useEffect(() => {
        console.log(value);
        console.log(fileContent);
    }, [fileContent]);

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
    );
}

export default TextBox;

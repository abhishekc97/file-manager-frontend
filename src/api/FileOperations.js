import axios from "axios";

// api to make a new folder
export async function createNewFolder(name) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/newFolder`;
        const response = await axios.post(reqUrl, { name: name });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// api to get all folders
export async function getAllFolders() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getFolders`;
        const response = await axios.get(reqUrl);

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

/** api to make a new file */
export async function createNewFile(name, folder) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/newFile`;
        const response = await axios.post(reqUrl, {
            name: name,
            folder: folder,
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// api to edit contents in a file; POST Request
export async function editFileContents(id, contents) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/editFileContent`;
        const response = await axios.post(reqUrl, {
            id: id,
            contents: contents,
        });
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// get all files belonging to a folder
export async function getFiles(folder) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getFiles/${folder}`;
        const response = await axios.get(reqUrl);

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// get a particular file using its id
export async function getFile(id) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getFile/${id}`;
        const response = await axios.get(reqUrl);

        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// get list of all files from files collection
export async function getAllFilesFromCollection() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getAllFiles`;
        const response = await axios.get(reqUrl);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

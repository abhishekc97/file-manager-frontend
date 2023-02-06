import axios from "axios";
// https://file-manager-backend.onrender.com/

// api to make a new folder (http://127.0.0.1:3000/api/operations/newFolder)
// POST Request
export async function createNewFolder(name) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/newFolder`;
        const response = await axios.post(reqUrl, { name: name });

        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// api to get all folders (http://127.0.0.1:3000/api/operations/getFolders)
// GET Request
export async function getAllFolders() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getFolders`;
        const response = await axios.get(reqUrl);

        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * api to make a new file (http://127.0.0.1:3000/api/operations/newFile)
 *  req.body params:
 *  name
 * folder
 */
// POST Request
export async function createNewFile(name, folder) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/newFile`;
        console.log(name, folder);
        const response = await axios.post(reqUrl, {
            name: name,
            folder: folder,
        });

        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// api to edit contents in a file (http://127.0.0.1:3000/api/operations/editFileContent)
// POST Request
export async function editFileContents(id, contents) {
    try {
        console.log(contents);
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/editFileContent`;
        const response = await axios.post(reqUrl, {
            id: id,
            contents: contents,
        });

        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// get all files belonging to a folder (http://127.0.0.1:3000/api/operations/getFiles/:folder)
// GET Request
export async function getFiles(folder) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getFiles/${folder}`;
        const response = await axios.get(reqUrl);

        if (response) {
            // console.log(response);
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
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAllFilesFromCollection() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getAllFiles`;
        const response = await axios.get(reqUrl);
        if (response) {
            // console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        
    }
}
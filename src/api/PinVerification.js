import axios from "axios";
// https://file-manager-backend.onrender.com/
// api to check whether pin exists or not (http://127.0.0.1:3000/api/admin/pinStatus)
export async function getStatus() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/admin/pinStatus`;
        const response = await axios.get(reqUrl);

        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// POST api to create pin (http://127.0.0.1:3000/api/admin/createPin)
export async function createPin(pin) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/admin/createPin`;
        const response = await axios.post(reqUrl, { pin: pin });
        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        // console.log(error);
    }
}

// api to verify the entered pin (http://127.0.0.1:3000/api/admin/verifyPin)
export async function verifyPin(pin) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/admin/verifyPin`;
        const response = await axios.post(reqUrl, { pin: pin });

        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        // console.log(error);
    }
}

// api to update an existing pin (http://127.0.0.1:3000/api/admin/verifyPin))
export async function updateExistingPin(pin) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/admin/changePin`;
        const response = await axios.post(reqUrl, { pin: pin });

        if(response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}
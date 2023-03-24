import axios from "axios";

// api to check whether pin exists or not
export async function getStatus() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/admin/pinStatus`;
        const response = await axios.get(reqUrl);

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// POST api to create pin
export async function createPin(pin) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/admin/createPin`;
        const response = await axios.post(reqUrl, { pin: pin });
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// api to verify the entered pin
export async function verifyPin(pin) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/admin/verifyPin`;
        const response = await axios.post(reqUrl, { pin: pin });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

// api to update an existing pin
export async function updateExistingPin(pin) {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/admin/changePin`;
        const response = await axios.post(reqUrl, { pin: pin });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

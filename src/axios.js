import axios from "axios";

const instance = axios.create({
    // Tomar backend server-er URL
    baseURL: "http://localhost:9000",
});

export default instance;
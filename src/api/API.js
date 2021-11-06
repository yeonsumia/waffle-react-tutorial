import axios from "axios";

const API = axios.create({
    baseURL: "https://g5imzjo8qf.execute-api.ap-northeast-2.amazonaws.com/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

export default API;
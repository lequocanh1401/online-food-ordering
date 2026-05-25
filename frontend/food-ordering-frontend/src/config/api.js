import axios from "axios";

// Trỏ thẳng vào cổng Backend Spring Boot của bạn
export const API_URL = "http://localhost:5454";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});
import axios from "axios";
import { API_URL } from "../../config/api";
import {
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS
} from "./ActionType";

// 1. Hàm Đăng ký
export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
        // Nếu thành công, lưu thẻ JWT vào bộ nhớ trình duyệt
        if (data.jwt) localStorage.setItem("jwt", data.jwt);

        // Chuyển hướng dựa vào Role (Vai trò)
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Đăng ký thành công", data);
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error });
        console.log("Lỗi đăng ký", error);
    }
};

// 2. Hàm Đăng nhập
export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);

        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("Đăng nhập thành công", data);
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        console.log("Lỗi đăng nhập", error);
    }
};

// 3. Hàm Lấy thông tin User từ JWT
export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("Lấy Profile thành công", data);
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error });
        console.log("Lỗi lấy Profile", error);
    }
};

// 4. Hàm Đăng xuất
export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("Đăng xuất thành công");
    } catch (error) {
        console.log("Lỗi đăng xuất", error);
    }
};
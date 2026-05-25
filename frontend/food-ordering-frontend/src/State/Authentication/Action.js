import axios from "axios";
import { API_URL } from "../../config/api";
import {
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS
} from "./ActionType";

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);

        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Đăng ký thành công", data);
    } catch (error) {
        // Chỉ gửi chuỗi text báo lỗi, ngăn Redux bị nghẹn
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
        console.log("Lỗi đăng ký", errorMessage);
    }
};

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
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        console.log("Lỗi đăng nhập", errorMessage);
    }
};

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
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
        console.log("Lỗi lấy Profile", errorMessage);
    }
};

export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("Đăng xuất thành công");
    } catch (error) {
        console.log("Lỗi đăng xuất", error);
    }
};
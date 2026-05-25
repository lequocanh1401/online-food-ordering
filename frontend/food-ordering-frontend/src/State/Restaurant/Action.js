import axios from "axios";
import { API_URL } from "../../config/api";
import {
    GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS
} from "./ActionType";

export const getAllRestaurantsAction = (token) => async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/restaurants`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
        console.log("Tải danh sách nhà hàng thành công", data);
    } catch (error) {
        // Cắt gọn lỗi để Redux không bị nghẹn
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: errorMessage });
        console.log("Lỗi tải danh sách nhà hàng", errorMessage);
    }
};

export const getRestaurantById = (reqData) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/restaurants/${reqData.restaurantId}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
        });
        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
        console.log("Tải chi tiết nhà hàng thành công", data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: errorMessage });
        console.log("Lỗi tải chi tiết nhà hàng", errorMessage);
    }
};
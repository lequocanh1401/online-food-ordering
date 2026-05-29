import axios from "axios";
import { API_URL } from "../../config/api";
import {
    GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS
} from "./ActionType";

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/admin/order/restaurant/${restaurantId}`, {
            params: { order_status: orderStatus },
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error.message });
    }
};

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/api/admin/order/${orderId}/${orderStatus}`, {}, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error.message });
    }
};
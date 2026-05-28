import axios from "axios";
import { API_URL } from "../../config/api";
import {
    CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
    GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS
} from "./ActionType";

// 1. Tạo đơn hàng mới (Từ Giỏ hàng bấm Đặt hàng)
export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            // 👇 Đảm bảo truyền đúng reqData.reqData (chứa address và restaurantId) và tách jwt ra headers
            const res = await api.post(`/api/order`, reqData.reqData, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });

            // Nếu backend trả về link thanh toán Stripe
            if (res.data.payment_url) {
                window.location.href = res.data.payment_url; // Chuyển hướng sang trang thanh toán
            }

            console.log("Tạo đơn hàng thành công:", res.data);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("Lỗi tạo đơn hàng rồi:", error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
        }
    };
};

// 2. Lấy danh sách lịch sử đơn hàng của người dùng
export const getUsersOrders = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/order/user`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
    }
};
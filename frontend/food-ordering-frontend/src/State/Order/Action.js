import axios from "axios";
import { API_URL } from "../../config/api";
import {
    CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
    GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS
} from "./ActionType";

// 1. Tạo đơn hàng mới (Từ Giỏ hàng bấm Đặt hàng)
export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST }); // Lưu ý: Đảm bảo CREATE_ORDER_REQUEST đã được import từ ActionType
        try {
            console.log("Đang gửi yêu cầu tạo đơn hàng và lấy link Stripe...");

            // Dùng axios thay vì api
            const { data } = await axios.post(`${API_URL}/api/order`, reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });

            // LOGIC MỚI: Nếu Java trả về link Stripe, đá Khách hàng sang đó
            if (data.payment_url) {
                console.log("Đã có link Stripe, chuẩn bị chuyển trang:", data.payment_url);
                window.location.href = data.payment_url;
            }

            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        } catch (error) {
            console.error("Lỗi tạo đơn hàng rồi:", error);
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
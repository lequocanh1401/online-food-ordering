import { api } from "../../config/api";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_USERS_ORDERS_FAILURE,
    GET_USERS_ORDERS_REQUEST,
    GET_USERS_ORDERS_SUCCESS
} from "./ActionType";

export const createOrder = ({ reqData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const { data } = await api.post('/api/order', reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            // Nếu Java trả về link thanh toán Stripe, tự động chuyển hướng khách hàng
            if (data.payment_url) {
                window.location.href = data.payment_url;
            }

            console.log("Tạo đơn hàng thành công: ", data);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi tạo đơn hàng rồi: ", error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        }
    };
};

export const getUsersOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDERS_REQUEST });
        try {
            const { data } = await api.get('/api/order/user', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Kéo lịch sử đơn hàng thành công: ", data);
            dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi kéo lịch sử đơn hàng: ", error);
            dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
        }
    };
};
import { api } from "../../config/api";
import axios from "axios";
import { API_URL } from "../../config/api";
import {
    ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS,
    CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS,
    FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS,
    REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS,
    UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS
} from "./ActionType";

// 1. Tìm giỏ hàng của User hiện tại
export const findCart = (token) => async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/cart`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: FIND_CART_SUCCESS, payload: data });
        console.log("Lấy giỏ hàng thành công", data);
    } catch (error) {
        dispatch({ type: FIND_CART_FAILURE, payload: error });
    }
};

// 2. Lấy tất cả item trong giỏ
export const getAllCartItems = (reqData) => async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/carts/${reqData.cartId}/items`, {
            headers: { Authorization: `Bearer ${reqData.token}` },
        });
        dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
    }
};

// 3. Thêm món vào giỏ
export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            // Zosh thường dùng lệnh PUT cho việc thêm món vào giỏ
            const res = await api.put(`/api/cart/add`, reqData.reqData, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("Đã thêm món vào giỏ hàng thành công:", res.data);
            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("Lỗi thêm vào giỏ hàng:", error);
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
        }
    };
};

// 4. Cập nhật số lượng món (Tăng / Giảm)
export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARTITEM_REQUEST });
        try {
            // 👇 SỬA TẠI ĐÂY: Chỉ gửi cartItemId và quantity xuống body, tách jwt ra ngoài
            const res = await api.put(`/api/cart-item/update`, {
                cartItemId: reqData.cartItemId,
                quantity: reqData.quantity
            }, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("Cập nhật số lượng thành công:", res.data);
            dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("Lỗi cập nhật số lượng:", error);
            dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error.message });
        }
    };
};

// 5. Xóa món khỏi giỏ
export const removeCartItem = ({ cartItemId, jwt }) => async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });
    try {
        const { data } = await axios.delete(`${API_URL}/api/cart-item/${cartItemId}/remove`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
        console.log("Xóa món thành công", data);
    } catch (error) {
        dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error });
    }
};

// 6. Xóa sạch giỏ hàng (Sau khi đặt hàng xong)
export const clearCartAction = () => async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/api/cart/clear`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
        console.log("Dọn dẹp giỏ hàng thành công", data);
    } catch (error) {
        dispatch({ type: CLEAR_CART_FAILURE, payload: error });
    }
};

export const findUserCart = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const res = await api.get(`/api/cart`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Dữ liệu giỏ hàng kéo từ Java về:", res.data);
            dispatch({ type: FIND_CART_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("Lỗi kéo giỏ hàng:", error);
            dispatch({ type: FIND_CART_FAILURE, payload: error });
        }
    };
};
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
export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/api/cart/add`, reqData.cartItem, {
            headers: { Authorization: `Bearer ${reqData.token}` },
        });
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
        console.log("Thêm vào giỏ thành công", data);
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
    }
};

// 4. Cập nhật số lượng món (Tăng / Giảm)
export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CARTITEM_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/api/cart-item/update`, reqData.data, {
            headers: { Authorization: `Bearer ${reqData.jwt}` },
        });
        dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
        console.log("Cập nhật giỏ hàng thành công", data);
    } catch (error) {
        dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error });
    }
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
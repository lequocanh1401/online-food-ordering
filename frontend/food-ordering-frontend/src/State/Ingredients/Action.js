import axios from "axios";
import { API_URL } from "../../config/api";
import {
    CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS,
    GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS,
    UPDATE_IN_STOCK
} from "./ActionType";

export const getIngredientsOfRestaurant = ({ id, jwt }) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/api/admin/ingredients/restaurant/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_INGREDIENTS, payload: data });
    } catch (error) { console.log("Lỗi lấy nguyên liệu", error); }
};

export const createIngredient = ({ data, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
        const response = await axios.post(`${API_URL}/api/admin/ingredients`, data, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error.message });
    }
};

export const createIngredientCategory = ({ data, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
        const response = await axios.post(`${API_URL}/api/admin/ingredients/category`, data, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error.message });
    }
};

export const getIngredientCategory = ({ id, jwt }) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
    try {
        const response = await axios.get(`${API_URL}/api/admin/ingredients/restaurant/${id}/category`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error.message });
    }
};

export const updateStockOfIngredient = ({ id, jwt }) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${API_URL}/api/admin/ingredients/${id}/stoke`, {}, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_IN_STOCK, payload: data });
    } catch (error) { console.log("Lỗi cập nhật kho", error); }
};
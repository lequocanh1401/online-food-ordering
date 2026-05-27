import axios from "axios";
import { API_URL } from "../../config/api";
import {
    GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS,
    CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, CREATE_RESTAURANT_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE,
    CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE
} from "./ActionType";

export const getAllRestaurantsAction = (token) => async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/restaurants`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error.message });
    }
};

export const getRestaurantById = (reqData) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/restaurants/${reqData.restaurantId}`, {
            headers: { Authorization: `Bearer ${reqData.jwt}` },
        });
        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error.message });
    }
};

export const getRestaurantByUserId = (jwt) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/admin/restaurants/user`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message });
    }
};

export const createRestaurant = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/api/admin/restaurants`, reqData.data, {
            headers: { Authorization: `Bearer ${reqData.token}` },
        });
        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error.message });
    }
};

export const getRestaurantsCategory = ({ jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/category/restaurant/${restaurantId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error.message });
    }
};

export const createCategoryAction = ({ reqData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/api/admin/category`, reqData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
    }
};
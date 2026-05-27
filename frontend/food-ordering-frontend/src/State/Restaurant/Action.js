import axios from "axios";
import { API_URL } from "../../config/api";
import {
    GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS,
    CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, CREATE_RESTAURANT_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_STATUS_FAILURE,
    CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE,
    CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE,
    GET_RESTAURANTS_EVENTS_REQUEST, GET_RESTAURANTS_EVENTS_SUCCESS, GET_RESTAURANTS_EVENTS_FAILURE,
    DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE
} from "./ActionType";

// ================= CÁC HÀM DÀNH CHO KHÁCH HÀNG =================

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

// ================= CÁC HÀM DÀNH CHO ADMIN =================

export const getRestaurantByUserId = (jwt) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/admin/restaurants/user`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) { dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message }); }
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/api/admin/restaurants/${restaurantId}/status`, {}, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data });
    } catch (error) { dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error.message }); }
};

export const createRestaurant = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/api/admin/restaurants`, reqData.data, {
            headers: { Authorization: `Bearer ${reqData.token}` },
        });
        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
    } catch (error) { dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error.message }); }
};

export const getRestaurantsCategory = ({ jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/category/restaurant/${restaurantId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: data });
    } catch (error) { dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error.message }); }
};

export const createCategoryAction = ({ reqData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/api/admin/category`, reqData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) { dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message }); }
};

export const createEventAction = ({ data, jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST });
    try {
        const res = await axios.post(`${API_URL}/api/admin/events/restaurant/${restaurantId}`, data, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });
    } catch (error) { dispatch({ type: CREATE_EVENT_FAILURE, payload: error.message }); }
};

export const getRestaurantsEvents = ({ restaurantId, jwt }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
        const res = await axios.get(`${API_URL}/api/admin/events/restaurant/${restaurantId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) { dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error.message }); }
};

export const deleteEventAction = ({ eventId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
        await axios.delete(`${API_URL}/api/admin/events/${eventId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
    } catch (error) { dispatch({ type: DELETE_EVENT_FAILURE, payload: error.message }); }
};
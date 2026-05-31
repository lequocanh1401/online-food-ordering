import axios from 'axios';
import { API_URL } from '../../config/api';
import {
    CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILURE,
    GET_RESTAURANT_REVIEWS_REQUEST, GET_RESTAURANT_REVIEWS_SUCCESS, GET_RESTAURANT_REVIEWS_FAILURE,
    GET_FOOD_REVIEWS_REQUEST, GET_FOOD_REVIEWS_SUCCESS, GET_FOOD_REVIEWS_FAILURE,
    UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAILURE,
    DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE
} from './ActionTypes';

export const createReview = ({ reviewData, jwt, restaurantId, foodId }) => async (dispatch) => {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    try {
        const queryParams = new URLSearchParams();
        queryParams.append("restaurantId", restaurantId);
        if (foodId) {
            queryParams.append("foodId", foodId);
        }
        
        const { data } = await axios.post(`${API_URL}/api/reviews?${queryParams.toString()}`, reviewData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
        return data;
    } catch (error) {
        const errMsg = error.response && error.response.data ? error.response.data : error.message;
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: errMsg });
        throw new Error(errMsg);
    }
};

export const getRestaurantReviews = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_REVIEWS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/reviews/restaurant/${restaurantId}`);
        dispatch({ type: GET_RESTAURANT_REVIEWS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_RESTAURANT_REVIEWS_FAILURE, payload: error.message });
    }
};

export const getFoodReviews = ({ foodId }) => async (dispatch) => {
    dispatch({ type: GET_FOOD_REVIEWS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/reviews/food/${foodId}`);
        dispatch({ type: GET_FOOD_REVIEWS_SUCCESS, payload: data, foodId });
    } catch (error) {
        dispatch({ type: GET_FOOD_REVIEWS_FAILURE, payload: error.message });
    }
};

export const updateReview = ({ reviewId, reviewData, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_REVIEW_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/api/reviews/${reviewId}`, reviewData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data });
        return data;
    } catch (error) {
        const errMsg = error.response && error.response.data ? error.response.data : error.message;
        dispatch({ type: UPDATE_REVIEW_FAILURE, payload: errMsg });
        throw new Error(errMsg);
    }
};

export const deleteReview = ({ reviewId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    try {
        await axios.delete(`${API_URL}/api/reviews/${reviewId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
    } catch (error) {
        const errMsg = error.response && error.response.data ? error.response.data : error.message;
        dispatch({ type: DELETE_REVIEW_FAILURE, payload: errMsg });
        throw new Error(errMsg);
    }
};

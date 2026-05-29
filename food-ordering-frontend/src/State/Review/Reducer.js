import {
    CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILURE,
    GET_RESTAURANT_REVIEWS_REQUEST, GET_RESTAURANT_REVIEWS_SUCCESS, GET_RESTAURANT_REVIEWS_FAILURE,
    GET_FOOD_REVIEWS_REQUEST, GET_FOOD_REVIEWS_SUCCESS, GET_FOOD_REVIEWS_FAILURE
} from './ActionTypes';

const initialState = {
    loading: false,
    error: null,
    reviews: [],
    averageRating: 0.0,
    totalReviews: 0,
    foodReviews: {}, // map of foodId -> { reviews, averageRating, totalReviews }
};

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
        case GET_RESTAURANT_REVIEWS_REQUEST:
        case GET_FOOD_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                reviews: action.payload.food ? state.reviews : [action.payload, ...state.reviews]
            };
        case GET_RESTAURANT_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews,
                averageRating: action.payload.averageRating,
                totalReviews: action.payload.totalReviews,
                error: null,
            };
        case GET_FOOD_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                foodReviews: {
                    ...state.foodReviews,
                    [action.foodId]: action.payload
                },
                error: null,
            };
        case CREATE_REVIEW_FAILURE:
        case GET_RESTAURANT_REVIEWS_FAILURE:
        case GET_FOOD_REVIEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

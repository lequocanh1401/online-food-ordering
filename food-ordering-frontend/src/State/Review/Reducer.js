import {
    CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILURE,
    GET_RESTAURANT_REVIEWS_REQUEST, GET_RESTAURANT_REVIEWS_SUCCESS, GET_RESTAURANT_REVIEWS_FAILURE,
    GET_FOOD_REVIEWS_REQUEST, GET_FOOD_REVIEWS_SUCCESS, GET_FOOD_REVIEWS_FAILURE,
    UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAILURE,
    DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE
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
        case UPDATE_REVIEW_REQUEST:
        case DELETE_REVIEW_REQUEST:
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
        case UPDATE_REVIEW_SUCCESS:
            // Cập nhật review trong list reviews chính (nếu không phải review của món ăn)
            const updatedReviews = state.reviews.map(r => r.id === action.payload.id ? action.payload : r);
            
            // Cập nhật review trong foodReviews map (nếu là review của món ăn)
            const updatedFoodReviews = { ...state.foodReviews };
            if (action.payload.food) {
                const foodId = action.payload.food.id;
                if (updatedFoodReviews[foodId]) {
                    updatedFoodReviews[foodId] = {
                        ...updatedFoodReviews[foodId],
                        reviews: updatedFoodReviews[foodId].reviews.map(r => r.id === action.payload.id ? action.payload : r)
                    };
                }
            }
            
            return {
                ...state,
                loading: false,
                reviews: updatedReviews,
                foodReviews: updatedFoodReviews,
                error: null
            };
        case DELETE_REVIEW_SUCCESS:
            // Xóa review trong list reviews chính
            const filteredReviews = state.reviews.filter(r => r.id !== action.payload);
            
            // Xóa review trong foodReviews map
            const filteredFoodReviews = { ...state.foodReviews };
            Object.keys(filteredFoodReviews).forEach(foodId => {
                if (filteredFoodReviews[foodId]) {
                    filteredFoodReviews[foodId] = {
                        ...filteredFoodReviews[foodId],
                        reviews: filteredFoodReviews[foodId].reviews.filter(r => r.id !== action.payload)
                    };
                }
            });
            
            return {
                ...state,
                loading: false,
                reviews: filteredReviews,
                foodReviews: filteredFoodReviews,
                error: null
            };
        case CREATE_REVIEW_FAILURE:
        case GET_RESTAURANT_REVIEWS_FAILURE:
        case GET_FOOD_REVIEWS_FAILURE:
        case UPDATE_REVIEW_FAILURE:
        case DELETE_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

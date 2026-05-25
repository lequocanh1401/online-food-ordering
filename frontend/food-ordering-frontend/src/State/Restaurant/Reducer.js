import {
    GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS
} from "./ActionType";

const initialState = {
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    isLoading: false,
    error: null,
};

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RESTAURANTS_REQUEST:
        case GET_RESTAURANT_BY_ID_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_ALL_RESTAURANTS_SUCCESS:
            return { ...state, isLoading: false, restaurants: action.payload };

        case GET_RESTAURANT_BY_ID_SUCCESS:
            return { ...state, isLoading: false, restaurant: action.payload };

        case GET_ALL_RESTAURANTS_FAILURE:
        case GET_RESTAURANT_BY_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
import {
    CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS,
    CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS
} from "./ActionType";

const initialState = {
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    categories: [],
    isLoading: false,
    error: null,
};

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RESTAURANTS_REQUEST:
        case GET_RESTAURANT_BY_ID_REQUEST:
        case GET_RESTAURANT_BY_USER_ID_REQUEST:
        case CREATE_RESTAURANT_REQUEST:
        case GET_RESTAURANTS_CATEGORY_REQUEST:
        case CREATE_CATEGORY_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_ALL_RESTAURANTS_SUCCESS:
            return { ...state, isLoading: false, restaurants: action.payload };

        case GET_RESTAURANT_BY_ID_SUCCESS:
            return { ...state, isLoading: false, restaurant: action.payload };

        case GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case CREATE_RESTAURANT_SUCCESS:
            return { ...state, isLoading: false, usersRestaurant: action.payload };

        case GET_RESTAURANTS_CATEGORY_SUCCESS:
            return { ...state, isLoading: false, categories: action.payload };

        case CREATE_CATEGORY_SUCCESS:
            return { ...state, isLoading: false, categories: [...state.categories, action.payload] };

        case GET_ALL_RESTAURANTS_FAILURE:
        case GET_RESTAURANT_BY_ID_FAILURE:
        case GET_RESTAURANT_BY_USER_ID_FAILURE:
        case CREATE_RESTAURANT_FAILURE:
        case GET_RESTAURANTS_CATEGORY_FAILURE:
        case CREATE_CATEGORY_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
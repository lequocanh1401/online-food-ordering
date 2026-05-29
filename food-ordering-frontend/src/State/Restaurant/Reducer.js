import {
    CREATE_CATEGORY_SUCCESS, CREATE_EVENT_SUCCESS, CREATE_EVENTS_SUCCESS, CREATE_RESTAURANT_SUCCESS,
    DELETE_EVENT_SUCCESS, GET_ALL_RESTAURANTS_SUCCESS, GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANTS_EVENTS_SUCCESS, GET_ALL_EVENTS_SUCCESS, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_SUCCESS,
    UPDATE_RESTAURANT_STATUS_SUCCESS
} from "./ActionType";

const initialState = {
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    categories: [],
    events: [],
    isLoading: false,
    error: null,
};

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RESTAURANTS_SUCCESS:
            return { ...state, isLoading: false, restaurants: action.payload };
        case GET_RESTAURANT_BY_ID_SUCCESS:
            return { ...state, isLoading: false, restaurant: action.payload };
        case GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case CREATE_RESTAURANT_SUCCESS:
        case UPDATE_RESTAURANT_STATUS_SUCCESS:
            return { ...state, isLoading: false, usersRestaurant: action.payload };
        case GET_RESTAURANTS_CATEGORY_SUCCESS:
            return { ...state, isLoading: false, categories: action.payload };
        case CREATE_CATEGORY_SUCCESS:
            return { ...state, isLoading: false, categories: [...state.categories, action.payload] };
        case GET_RESTAURANTS_EVENTS_SUCCESS:
        case GET_ALL_EVENTS_SUCCESS:
            return { ...state, isLoading: false, events: action.payload };
        case CREATE_EVENT_SUCCESS:
        case CREATE_EVENTS_SUCCESS:
            return { ...state, isLoading: false, events: [...state.events, action.payload] };
        case DELETE_EVENT_SUCCESS:
            return { ...state, isLoading: false, events: state.events.filter((item) => item.id !== action.payload) };
        default:
            return state;
    }
};
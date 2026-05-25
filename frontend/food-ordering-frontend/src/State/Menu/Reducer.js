import {
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS
} from "./ActionType";

const initialState = {
    menuItems: [],
    search: [],
    isLoading: false,
    error: null,
    message: null
};

export const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case SEARCH_MENU_ITEM_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, menuItems: action.payload };

        case SEARCH_MENU_ITEM_SUCCESS:
            return { ...state, isLoading: false, search: action.payload };

        case GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case SEARCH_MENU_ITEM_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
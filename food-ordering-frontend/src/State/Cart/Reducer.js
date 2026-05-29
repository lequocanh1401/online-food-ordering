import {
    ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART_SUCCESS, FIND_CART_FAILURE,
    FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_REQUEST,
    REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS,
    UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS
} from "./ActionType";

const initialState = {
    cart: null,
    cartItems: [],
    isLoading: false,
    error: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_CART_REQUEST:
        case GET_ALL_CART_ITEMS_REQUEST:
        case UPDATE_CARTITEM_REQUEST:
        case REMOVE_CARTITEM_REQUEST:
            return { ...state, isLoading: true, error: null };

        case FIND_CART_SUCCESS:
        case CLEAR_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                cartItems: action.payload.item, // Dữ liệu trả về từ BE thường là 'item' hoặc 'items'
            };

        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: [action.payload, ...state.cartItems],
            };

        case UPDATE_CARTITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        case REMOVE_CARTITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };

        case FIND_CART_FAILURE:
        case UPDATE_CARTITEM_FAILURE:
        case REMOVE_CARTITEM_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
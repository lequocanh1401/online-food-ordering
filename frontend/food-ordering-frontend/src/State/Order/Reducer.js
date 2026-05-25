import {
    CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
    GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS
} from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    orders: [],
    paymentUrl: null // Chứa link thanh toán nếu có
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_ORDERS_REQUEST:
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_USERS_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload };

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentUrl: action.payload.payment_url,
                orders: [action.payload, ...state.orders]
            };

        case GET_USERS_ORDERS_FAILURE:
        case CREATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
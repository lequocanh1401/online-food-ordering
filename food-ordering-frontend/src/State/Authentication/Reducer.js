import {
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, jwt: action.payload, success: "Xác thực thành công" };

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        case LOGOUT:
            return initialState; // Reset lại kho trống trơn

        default:
            return state;
    }
};
import { GET_INGREDIENTS, UPDATE_STOCK } from "./ActionType";

const initialState = {
    ingredients: [],
    update: null,
};

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return { ...state, ingredients: action.payload };

        case UPDATE_STOCK:
            return {
                ...state,
                update: action.payload,
                ingredients: state.ingredients.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        default:
            return state;
    }
};
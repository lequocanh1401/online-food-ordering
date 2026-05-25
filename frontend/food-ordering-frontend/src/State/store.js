import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Authentication/Reducer";
import { restaurantReducer } from "./Restaurant/Reducer";
import { menuItemReducer } from "./Menu/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";           // Thêm dòng này
import { ingredientReducer } from "./Ingredients/Reducer"; // Thêm dòng này

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,             // Thêm dòng này
    restaurantOrder: ingredientReducer, // Tạm thời map chung, có thể đổi tên tùy ý
});

export const store = configureStore({
    reducer: rootReducer,
});
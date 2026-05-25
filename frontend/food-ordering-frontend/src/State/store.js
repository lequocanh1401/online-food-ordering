import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Authentication/Reducer";
import { restaurantReducer } from "./Restaurant/Reducer"; // Thêm dòng này

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer, // Thêm dòng này
});

export const store = configureStore({
    reducer: rootReducer,
});
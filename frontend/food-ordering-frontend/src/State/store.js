import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Authentication/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    // Sau này làm tiếp sẽ thêm restaurant, cart, order... vào đây
});

export const store = configureStore({
    reducer: rootReducer,
    // Đã xóa bỏ phần middleware vì Redux Toolkit tự động lo hết!
});
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// rootReducer là nơi phân chia các khu vực trong nhà kho
// Hiện tại kho đang trống, ở video sau chúng ta sẽ thêm các ngăn như: auth (chứa user), cart (chứa giỏ hàng)...
const rootReducer = combineReducers({

});

export const store = configureStore({
    reducer: rootReducer,
});
import axios from "axios";
import { API_URL } from "../../config/api";
import {
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS
} from "./ActionType";

// 1. Lấy danh sách món ăn của 1 nhà hàng (có kèm bộ lọc)
export const getMenuItemsByRestaurantId = (reqData) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await axios.get(
            `${API_URL}/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
            {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            }
        );
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
        console.log("Tải thực đơn nhà hàng thành công", data);
    } catch (error) {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("Lỗi tải thực đơn", error);
    }
};

// 2. Tìm kiếm món ăn
export const searchMenuItem = (reqData) => async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/food/search?name=${reqData.keyword}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
        });
        dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
        console.log("Tìm kiếm món ăn thành công", data);
    } catch (error) {
        dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
        console.log("Lỗi tìm kiếm món ăn", error);
    }
};
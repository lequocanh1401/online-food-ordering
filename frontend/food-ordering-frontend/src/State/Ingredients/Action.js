import axios from "axios";
import { API_URL } from "../../config/api";
import { GET_INGREDIENTS, UPDATE_STOCK } from "./ActionType";

export const getIngredientsOfRestaurant = ({ id, jwt }) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/api/admin/ingredients/restaurant/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_INGREDIENTS, payload: data });
    } catch (error) {
        console.log("Lỗi lấy kho nguyên liệu", error);
    }
};

export const updateStockOfIngredient = ({ id, jwt }) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${API_URL}/api/admin/ingredients/${id}/stock`, {}, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_STOCK, payload: data });
    } catch (error) {
        console.log("Lỗi cập nhật kho", error);
    }
};
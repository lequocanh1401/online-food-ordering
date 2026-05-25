import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../State/Cart/Action';

// Nhận món ăn (item) từ trang RestaurantDetails truyền vào
export const MenuCard = ({ item }) => {
    const dispatch = useDispatch();
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleCheckBoxChange = (ingredientName) => {
        if (selectedIngredients.includes(ingredientName)) {
            setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredientName));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredientName]);
        }
    };

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        const reqData = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: selectedIngredients
            }
        };
        // Bắn action lưu vào giỏ hàng
        dispatch(addItemToCart(reqData));
        console.log("Đã bấm thêm vào giỏ:", reqData);
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />} sx={{ backgroundColor: "#1f2937", color: "white" }}>
                <div className='lg:flex items-center justify-between w-full'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img className='w-[7rem] h-[7rem] object-cover rounded-md' src={item.images?.[0] || "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg"} alt={item.name} />
                        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl mt-3 lg:mt-0'>
                            <p className='font-semibold text-xl'>{item.name}</p>
                            <p className='text-pink-500 font-semibold'>{item.price} đ</p>
                            <p className='text-gray-400'>{item.description}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#111827", color: "white" }}>
                <form onSubmit={handleAddItemToCart}>
                    <div className='flex gap-5 flex-wrap'>
                        {/* Kiểm tra nếu Backend có trả về mảng ingredientsItem thì render */}
                        {item.ingredientsItems && Object.keys(categorizeIngredients(item.ingredientsItems)).map((category) => (
                            <div key={category}>
                                <p className='font-semibold text-gray-300'>{category}</p>
                                <FormGroup>
                                    {categorizeIngredients(item.ingredientsItems)[category].map((ingredient) => (
                                        <FormControlLabel
                                            key={ingredient.name}
                                            control={<Checkbox onChange={() => handleCheckBoxChange(ingredient.name)} sx={{ color: 'gray', '&.Mui-checked': { color: '#e91e63' } }} />}
                                            label={ingredient.name}
                                        />
                                    ))}
                                </FormGroup>
                            </div>
                        ))}
                    </div>
                    <div className='pt-5'>
                        <Button variant="contained" type="submit" disabled={!item.available} sx={{ backgroundColor: "#e91e63", '&:hover': { backgroundColor: "#c2185b" } }}>
                            {item.available ? "Thêm vào giỏ" : "Hết hàng"}
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}

// Hàm hỗ trợ gom nhóm nguyên liệu (ví dụ: Đế bánh -> [Đế dày, Đế mỏng])
const categorizeIngredients = (ingredients) => {
    return ingredients.reduce((acc, ingredient) => {
        const { category } = ingredient;
        if (!acc[category.name]) {
            acc[category.name] = [];
        }
        acc[category.name].push(ingredient);
        return acc;
    }, {});
};
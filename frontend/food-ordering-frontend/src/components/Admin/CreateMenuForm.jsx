import React, { useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip, Box } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../State/Menu/Action';
import { getIngredientCategory, getIngredientsOfRestaurant } from '../../State/Ingredients/Action';
import { useNavigate } from 'react-router-dom';

export const CreateMenuForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);
    const ingredients = useSelector(store => store.ingredients);

    useEffect(() => {
        if (restaurant.usersRestaurant?.id && jwt) {
            dispatch(getIngredientsOfRestaurant({ id: restaurant.usersRestaurant.id, jwt }));
            dispatch(getIngredientCategory({ id: restaurant.usersRestaurant.id, jwt }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const formik = useFormik({
        initialValues: {
            name: "", description: "", price: "", category: "",
            images: "", vegetarian: true, seasonal: false, ingredients: []
        },
        onSubmit: (values) => {
            const data = {
                name: values.name,
                description: values.description,
                price: Number(values.price),
                images: [values.images],
                restaurantId: restaurant.usersRestaurant?.id,
                category: { id: values.category },
                vegetarian: values.vegetarian,
                // KHỚP ĐÚNG LỖI CHÍNH TẢ BÊN JAVA CỦA BẠN (seasional)
                seasional: values.seasonal,
                ingredients: values.ingredients,
            };

            dispatch(createMenuItem({ menu: data, jwt }));
            navigate("/admin/restaurant/menu");
        }
    });

    return (
        <div className='py-10 px-5 flex justify-center'>
            <Box className='max-w-3xl w-full bg-gray-800 p-8 rounded-lg shadow-xl'>
                <h1 className='text-2xl font-bold text-center text-white mb-5'>THÊM MÓN ĂN MỚI</h1>
                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    <TextField fullWidth name="name" label="Tên món" value={formik.values.name} onChange={formik.handleChange} sx={{ input: { color: 'white' }, label: { color: 'gray' } }} />
                    <TextField fullWidth name="description" label="Mô tả" value={formik.values.description} onChange={formik.handleChange} sx={{ input: { color: 'white' }, label: { color: 'gray' } }} />
                    <div className='flex gap-4'>
                        <TextField fullWidth name="price" label="Giá (đ)" type="number" value={formik.values.price} onChange={formik.handleChange} sx={{ input: { color: 'white' }, label: { color: 'gray' } }} />
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'gray' }}>Danh mục</InputLabel>
                            <Select name="category" value={formik.values.category} onChange={formik.handleChange} sx={{ color: 'white' }}>
                                {Array.isArray(restaurant.categories) && restaurant.categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <TextField fullWidth name="images" label="Link ảnh món ăn" value={formik.values.images} onChange={formik.handleChange} sx={{ input: { color: 'white' }, label: { color: 'gray' } }} />

                    <FormControl fullWidth>
                        <InputLabel sx={{ color: 'gray' }}>Nguyên liệu</InputLabel>
                        <Select multiple name="ingredients" value={formik.values.ingredients} onChange={formik.handleChange} input={<OutlinedInput label="Nguyên liệu" />} renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => <Chip key={value.id} label={value.name} sx={{ color: 'white', backgroundColor: '#e91e63' }} />)}
                            </Box>
                        )} sx={{ color: 'white' }}>
                            {Array.isArray(ingredients.ingredients) && ingredients.ingredients.map((item) => <MenuItem key={item.id} value={item}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <Button fullWidth variant="contained" type="submit" sx={{ backgroundColor: "#e91e63", py: 1.5 }}>TẠO MÓN ĂN</Button>
                </form>
            </Box>
        </div>
    );
};
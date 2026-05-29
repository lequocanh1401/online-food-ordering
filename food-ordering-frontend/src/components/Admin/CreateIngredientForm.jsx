import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../State/Ingredients/Action';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', outline: 'none', boxShadow: 24, p: 4, borderRadius: '8px' };

export const CreateIngredientForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, ingredients } = useSelector(store => store);

    const formik = useFormik({
        initialValues: { name: "", categoryId: "" },
        onSubmit: (values) => {
            const data = {
                name: values.name,
                categoryId: values.categoryId,
                restaurantId: restaurant.usersRestaurant?.id
            };
            dispatch(createIngredient({ data, jwt }));
            formik.resetForm();
            handleClose();
        }
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className='text-gray-400 font-bold text-center text-xl pb-6'>THÊM NGUYÊN LIỆU MỚI</h1>
                    <TextField fullWidth id="name" name="name" label="Tên nguyên liệu (VD: Thịt Bò, Muối...)" variant="outlined" onChange={formik.handleChange} value={formik.values.name} sx={{ mb: 3 }} />
                    <FormControl fullWidth>
                        <InputLabel id="category-label">Danh mục</InputLabel>
                        <Select labelId="category-label" id="categoryId" name="categoryId" value={formik.values.categoryId} label="Danh mục" onChange={formik.handleChange}>
                            {/* Lấy các Danh mục thật vừa tạo đắp vào Menu xổ xuống */}
                            {ingredients.category?.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }} fullWidth size='large'>Tạo Nguyên Liệu</Button>
                </form>
            </Box>
        </Modal>
    );
};
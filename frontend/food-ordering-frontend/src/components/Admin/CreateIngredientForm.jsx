import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', outline: 'none', boxShadow: 24, p: 4, borderRadius: '8px' };
const fakeCategories = [{ id: 1, name: "Vegetable" }, { id: 2, name: "Meat" }];

export const CreateIngredientForm = ({ open, handleClose }) => {
    const formik = useFormik({
        initialValues: { name: "", categoryId: "" },
        onSubmit: (values) => {
            console.log("Nguyên liệu mới:", values);
            formik.resetForm();
            handleClose();
        }
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className='text-gray-400 font-bold text-center text-xl pb-6'>THÊM NGUYÊN LIỆU</h1>
                    <TextField fullWidth id="name" name="name" label="Tên nguyên liệu" variant="outlined" onChange={formik.handleChange} value={formik.values.name} sx={{ mb: 3 }} />
                    <FormControl fullWidth>
                        <InputLabel id="category-label">Danh mục</InputLabel>
                        <Select labelId="category-label" id="categoryId" name="categoryId" value={formik.values.categoryId} label="Danh mục" onChange={formik.handleChange}>
                            {fakeCategories.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }} fullWidth size='large'>Tạo</Button>
                </form>
            </Box>
        </Modal>
    );
};
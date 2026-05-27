import React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', outline: 'none', boxShadow: 24, p: 4, borderRadius: '8px' };

export const CreateIngredientCategoryForm = ({ open, handleClose }) => {
    const formik = useFormik({
        initialValues: { name: "" },
        onSubmit: (values) => {
            console.log("Danh mục nguyên liệu mới:", values);
            formik.resetForm();
            handleClose();
        }
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className='text-gray-400 font-bold text-center text-xl pb-6'>TẠO DANH MỤC NGUYÊN LIỆU</h1>
                    <TextField fullWidth id="name" name="name" label="Tên danh mục" variant="outlined" onChange={formik.handleChange} value={formik.values.name} />
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }} fullWidth size='large'>Tạo</Button>
                </form>
            </Box>
        </Modal>
    );
};
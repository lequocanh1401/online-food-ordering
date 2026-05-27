import React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';

// Cấu hình vị trí và kiểu dáng cho cái Popup (Nằm chính giữa màn hình)
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px'
};

export const CreateFoodCategoryForm = ({ open, handleClose }) => {
    const formik = useFormik({
        initialValues: {
            categoryName: "",
        },
        onSubmit: (values) => {
            console.log("Dữ liệu Danh mục mới chuẩn bị gửi:", values);
            alert("Đã tạo danh mục thành công! Check Console F12 nhé.");
            // Reset form và đóng popup sau khi submit
            formik.resetForm();
            handleClose();
        }
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className='text-gray-600 font-bold text-center text-xl pb-6'>
                        THÊM DANH MỤC MỚI
                    </h1>
                    <TextField
                        fullWidth
                        id="categoryName"
                        name="categoryName"
                        label="Tên Danh Mục (VD: Tráng Miệng, Đồ Uống...)"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.categoryName}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 3 }}
                        fullWidth
                        size='large'
                    >
                        Tạo Danh Mục
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
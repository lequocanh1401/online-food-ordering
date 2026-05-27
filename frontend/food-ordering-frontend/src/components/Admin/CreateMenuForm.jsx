import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, IconButton, CircularProgress, Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../util/uploadToCloudinary';

const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    ingredients: [],
    seasonal: false,
    vegetarian: false,
};

// Dữ liệu giả để hiển thị danh mục và nguyên liệu trên Form chọn (Lát nối API sẽ thay sau)
const fakeCategories = [{ id: 1, name: "Món Chính" }, { id: 2, name: "Đồ Uống" }];
const fakeIngredients = [{ id: 1, name: "Sườn Nướng" }, { id: 2, name: "Chả Trứng" }, { id: 3, name: "Đồ Chua" }];

export const CreateMenuForm = () => {
    const [uploadImage, setUploadImage] = useState(false);
    const [images, setImages] = useState([]);

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const reqData = {
                name: values.name,
                description: values.description,
                price: values.price,
                category: values.category,
                ingredients: values.ingredients,
                seasonal: values.seasonal,
                vegetarian: values.vegetarian,
                images: images
            };
            console.log("Dữ liệu Form Tạo Món Ăn chuẩn bị gửi đi:", reqData);
            alert("Đã ghi nhận dữ liệu món ăn! Hãy kiểm tra Console F12.");
        }
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadImage(true);
            try {
                const url = await uploadImageToCloudinary(file);
                setImages((prev) => [...prev, url]);
            } catch (error) {
                console.error("Lỗi úp ảnh món ăn:", error);
            } finally {
                setUploadImage(false);
            }
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className='py-10 px-5 lg:px-20 min-h-screen text-white'>
            <div className='max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-xl'>
                <h1 className='text-3xl font-bold text-center mb-8 text-gray-100'>Thêm Món Ăn Mới Vào Thực Đơn</h1>

                <form onSubmit={formik.handleSubmit} className='space-y-6'>
                    <Grid container spacing={3}>
                        {/* Tải ảnh món ăn */}
                        <Grid item="true" xs={12} className='flex flex-wrap gap-5 items-center'>
                            <input accept='image/*' id='menuFileInput' style={{ display: 'none' }} type='file' onChange={handleImageChange} />
                            <label htmlFor='menuFileInput'>
                                <span className='w-24 h-24 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-md hover:border-gray-400 bg-gray-800 transition-colors'>
                                    {uploadImage ? <CircularProgress size={24} color="inherit" /> : (
                                        <>
                                            <AddPhotoAlternateIcon className='text-gray-400' />
                                            <span className='text-xs text-gray-400 mt-1'>Ảnh món ăn</span>
                                        </>
                                    )}
                                </span>
                            </label>
                            <div className='flex flex-wrap gap-3'>
                                {images.map((imgUrl, index) => (
                                    <div key={index} className='relative w-24 h-24 border border-gray-700 rounded-md overflow-hidden'>
                                        <img src={imgUrl} alt="food" className='w-full h-full object-cover' />
                                        <IconButton size='small' onClick={() => handleRemoveImage(index)} sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(0,0,0,0.6)', color: 'white' }}>
                                            <CloseIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </Grid>

                        {/* Tên & Mô tả món */}
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Tên món ăn" name="name" value={formik.values.name} onChange={formik.handleChange} {...formik.getFieldProps('name')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Giá tiền (VNĐ)" name="price" type="number" value={formik.values.price} onChange={formik.handleChange} {...formik.getFieldProps('price')} />
                        </Grid>
                        <Grid item="true" xs={12}>
                            <TextField fullWidth multiline rows={2} label="Mô tả chi tiết món ăn" name="description" value={formik.values.description} onChange={formik.handleChange} {...formik.getFieldProps('description')} />
                        </Grid>

                        {/* Lựa chọn Danh mục món ăn */}
                        <Grid item="true" xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="category-select-label">Danh mục</InputLabel>
                                <Select labelId="category-select-label" id="category-select" name="category" value={formik.values.category} label="Danh mục" onChange={formik.handleChange}>
                                    {fakeCategories.map((item) => (
                                        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Lựa chọn nhiều Nguyên liệu (Multi-Select Chip) */}
                        <Grid item="true" xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="ingredients-select-label">Nguyên liệu kèm theo</InputLabel>
                                <Select
                                    labelId="ingredients-select-label"
                                    id="ingredients-select"
                                    multiple
                                    name="ingredients"
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Nguyên liệu kèm theo" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {fakeIngredients.map((item) => (
                                        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Trạng thái đặc biệt */}
                        <Grid item="true" xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="vegetarian-select-label">Món chay?</InputLabel>
                                <Select labelId="vegetarian-select-label" name="vegetarian" value={formik.values.vegetarian} label="Món chay?" onChange={formik.handleChange}>
                                    <MenuItem value={true}>Phải (Món Chay)</MenuItem>
                                    <MenuItem value={false}>Không (Món Mặn)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item="true" xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="seasonal-select-label">Món ăn theo mùa?</InputLabel>
                                <Select labelId="seasonal-select-label" name="seasonal" value={formik.values.seasonal} label="Món ăn theo mùa?" onChange={formik.handleChange}>
                                    <MenuItem value={true}>Phải (Bán theo mùa)</MenuItem>
                                    <MenuItem value={false}>Không (Bán quanh năm)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <div className='pt-4 text-center'>
                        <Button variant='contained' color='primary' type='submit' size='large' className='w-full lg:w-auto px-10 py-3 font-semibold text-lg'>
                            Thêm Vào Thực Đơn
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
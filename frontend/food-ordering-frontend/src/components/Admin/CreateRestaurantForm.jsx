import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, IconButton, CircularProgress } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../util/uploadToCloudinary';

const initialValues = {
    name: "",
    description: "",
    cuisineType: "",
    openingHours: "08:00 - 22:00",
    streetAddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "Vietnam",
    email: "",
    mobile: "",
    twitter: "",
    instagram: ""
};

export const CreateRestaurantForm = () => {
    const [uploadImage, setUploadImage] = useState(false);
    const [images, setImages] = useState([]);

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const reqData = {
                name: values.name,
                description: values.description,
                cuisineType: values.cuisineType,
                openingHours: values.openingHours,
                address: {
                    streetAddress: values.streetAddress,
                    city: values.city,
                    stateProvince: values.stateProvince,
                    postalCode: values.postalCode,
                    country: values.country
                },
                contactInformation: {
                    email: values.email,
                    mobile: values.mobile,
                    twitter: values.twitter,
                    instagram: values.instagram
                },
                images: images
            };
            console.log("Dữ liệu Form Tạo Nhà Hàng chuẩn bị gửi đi:", reqData);
            alert("Đã ghi nhận dữ liệu form! Hãy kiểm tra Console F12 để xem cấu trúc.");
            // Lát nữa ở Phần 3 sẽ chèn lệnh dispatch nối API xuống Java ở đây
        }
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadImage(true);
            try {
                const url = await uploadImageToCloudinary(file);
                setImages((prev) => [...prev, url]);
                console.log("Đã upload ảnh thành công lên Cloudinary. Đường link ảnh thật:", url);
            } catch (error) {
                console.error("Lỗi khi tải ảnh lên Cloudinary:", error);
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
                <h1 className='text-3xl font-bold text-center mb-8 text-gray-100'>Đăng Ký Mở Cửa Hàng Mới</h1>

                <form onSubmit={formik.handleSubmit} className='space-y-6'>
                    <Grid container spacing={3}>
                        {/* Khu vực Upload Ảnh */}
                        <Grid item="true" xs={12} className='flex flex-wrap gap-5 items-center'>
                            <input
                                accept='image/*'
                                id='fileInput'
                                style={{ display: 'none' }}
                                type='file'
                                onChange={handleImageChange}
                            />
                            <label htmlFor='fileInput'>
                                <span className='w-24 h-24 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-md hover:border-gray-400 bg-gray-800 transition-colors'>
                                    {uploadImage ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        <>
                                            <AddPhotoAlternateIcon className='text-gray-400' />
                                            <span className='text-xs text-gray-400 mt-1'>Thêm ảnh</span>
                                        </>
                                    )}
                                </span>
                            </label>

                            {/* Danh sách ảnh đã upload thành công */}
                            <div className='flex flex-wrap gap-3'>
                                {images.map((imgUrl, index) => (
                                    <div key={index} className='relative w-24 h-24 border border-gray-700 rounded-md overflow-hidden'>
                                        <img src={imgUrl} alt="restaurant" className='w-full h-full object-cover' />
                                        <IconButton
                                            size='small'
                                            onClick={() => handleRemoveImage(index)}
                                            sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
                                        >
                                            <CloseIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </Grid>

                        {/* Thông tin cơ bản */}
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Tên quán ăn" name="name" value={formik.values.name} onChange={formik.formikClassName} {...formik.getFieldProps('name')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Loại ẩm thực (Cuisine Type)" name="cuisineType" value={formik.values.cuisineType} onChange={formik.handleChange} {...formik.getFieldProps('cuisineType')} />
                        </Grid>
                        <Grid item="true" xs={12}>
                            <TextField fullWidth multiline rows={2} label="Mô tả quán" name="description" value={formik.values.description} onChange={formik.handleChange} {...formik.getFieldProps('description')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Giờ hoạt động" name="openingHours" value={formik.values.openingHours} onChange={formik.handleChange} {...formik.getFieldProps('openingHours')} />
                        </Grid>

                        {/* Địa chỉ */}
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Đường / Phố (Street)" name="streetAddress" value={formik.values.streetAddress} onChange={formik.handleChange} {...formik.getFieldProps('streetAddress')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={4}>
                            <TextField fullWidth label="Thành phố" name="city" value={formik.values.city} onChange={formik.handleChange} {...formik.getFieldProps('city')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={4}>
                            <TextField fullWidth label="Tỉnh / Bang" name="stateProvince" value={formik.values.stateProvince} onChange={formik.handleChange} {...formik.getFieldProps('stateProvince')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={4}>
                            <TextField fullWidth label="Mã bưu điện (Postal Code)" name="postalCode" value={formik.values.postalCode} onChange={formik.handleChange} {...formik.getFieldProps('postalCode')} />
                        </Grid>
                        <Grid item="true" xs={12}>
                            <TextField fullWidth label="Quốc gia" name="country" value={formik.values.country} onChange={formik.handleChange} {...formik.getFieldProps('country')} />
                        </Grid>

                        {/* Liên hệ */}
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Email liên hệ" name="email" value={formik.values.email} onChange={formik.handleChange} {...formik.getFieldProps('email')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Số điện thoại" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} {...formik.getFieldProps('mobile')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Instagram Link" name="instagram" value={formik.values.instagram} onChange={formik.handleChange} {...formik.getFieldProps('instagram')} />
                        </Grid>
                        <Grid item="true" xs={12} lg={6}>
                            <TextField fullWidth label="Twitter Link" name="twitter" value={formik.values.twitter} onChange={formik.handleChange} {...formik.getFieldProps('twitter')} />
                        </Grid>
                    </Grid>

                    <div className='pt-4 text-center'>
                        <Button variant='contained' color='primary' type='submit' size='large' className='w-full lg:w-auto px-10 py-3 font-semibold text-lg'>
                            Tạo Nhà Hàng
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
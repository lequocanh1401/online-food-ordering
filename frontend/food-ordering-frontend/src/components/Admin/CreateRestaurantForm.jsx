import React from 'react';
import { Button, TextField } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../../State/Restaurant/Action';

const initialValues = {
    name: "", description: "", cuisineType: "", streetAddress: "",
    city: "", state: "", postalCode: "", openingHours: "T2 - CN: 08:00 AM - 10:00 PM",
    imageUrl: "" // Tạm thời dùng link ảnh copy trên mạng cho nhanh
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên quán"),
    description: Yup.string().required("Vui lòng nhập mô tả"),
    cuisineType: Yup.string().required("Loại hình ẩm thực (vd: Đồ nướng, Trà sữa...)"),
    streetAddress: Yup.string().required("Vui lòng nhập số nhà, tên đường"),
    city: Yup.string().required("Vui lòng nhập Quận / Huyện"),
    state: Yup.string().required("Vui lòng nhập Tỉnh / Thành phố"),
    postalCode: Yup.string().required("Vui lòng nhập mã bưu điện"),
});

export const CreateRestaurantForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleSubmit = (values) => {
        const data = {
            name: values.name,
            description: values.description,
            cuisineType: values.cuisineType,
            address: {
                streetAddress: values.streetAddress,
                city: values.city,
                state: values.state,
                postalCode: values.postalCode,
                country: "Vietnam"
            },
            // Điền sẵn dữ liệu ảo vào đây để tránh Backend bị NullPointerException
            contactInformation: {
                email: "restaurant@gmail.com",
                mobile: "0123456789",
                twitter: "",
                instagram: ""
            },
            openingHours: values.openingHours,
            // Đảm bảo mảng ảnh không bị rỗng
            images: [values.imageUrl || "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg"]
        };

        dispatch(createRestaurant({ data, token: jwt }));
    };

    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className='lg:max-w-4xl w-full bg-[#1f2937] p-8 rounded-lg shadow-xl'>
                <h1 className='font-bold text-2xl text-center text-white mb-8'>ĐĂNG KÝ QUÁN ĂN MỚI</h1>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ touched, errors }) => (
                        <Form className="space-y-5">
                            <div className='flex gap-5'>
                                <Field as={TextField} name="name" label="Tên Quán ĂN" fullWidth variant="outlined" error={touched.name && Boolean(errors.name)} helperText={<ErrorMessage name="name" />} sx={{ input: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />
                                <Field as={TextField} name="cuisineType" label="Loại Ẩm Thực (VD: Pizza, Món Việt...)" fullWidth variant="outlined" error={touched.cuisineType && Boolean(errors.cuisineType)} helperText={<ErrorMessage name="cuisineType" />} sx={{ input: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />
                            </div>

                            <Field as={TextField} name="description" label="Mô Tả Ngắn" fullWidth variant="outlined" multiline rows={3} error={touched.description && Boolean(errors.description)} helperText={<ErrorMessage name="description" />} sx={{ textarea: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />

                            <div className='flex gap-5'>
                                <Field as={TextField} name="streetAddress" label="Số Nhà, Tên Đường" fullWidth variant="outlined" error={touched.streetAddress && Boolean(errors.streetAddress)} helperText={<ErrorMessage name="streetAddress" />} sx={{ input: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />
                                <Field as={TextField} name="city" label="Quận / Huyện" fullWidth variant="outlined" error={touched.city && Boolean(errors.city)} helperText={<ErrorMessage name="city" />} sx={{ input: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />
                            </div>

                            <div className='flex gap-5'>
                                <Field as={TextField} name="state" label="Tỉnh / Thành Phố" fullWidth variant="outlined" error={touched.state && Boolean(errors.state)} helperText={<ErrorMessage name="state" />} sx={{ input: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />
                                <Field as={TextField} name="postalCode" label="Mã Bưu Điện" fullWidth variant="outlined" error={touched.postalCode && Boolean(errors.postalCode)} helperText={<ErrorMessage name="postalCode" />} sx={{ input: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />
                            </div>

                            <div className='flex gap-5'>
                                <Field as={TextField} name="openingHours" label="Giờ Mở Cửa" fullWidth variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />
                                <Field as={TextField} name="imageUrl" label="Link Ảnh Của Quán (Copy link trên mạng dán vào)" fullWidth variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'gray' }, fieldset: { borderColor: 'gray' } }} />
                            </div>

                            <Button fullWidth variant="contained" type="submit" sx={{ mt: 5, py: 1.5, backgroundColor: "#e91e63", '&:hover': { backgroundColor: "#c2185b" } }}>
                                TẠO NHÀ HÀNG
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../State/Authentication/Action';

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập Email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu")
});

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Khởi tạo người đưa thư của Redux

    const handleSubmit = (values) => {
        // Đóng gói dữ liệu và gửi đi bằng Redux
        dispatch(loginUser({ userData: values, navigate }));
    };

    return (
        <div className="space-y-5">
            <Typography variant="h5" className="text-center font-semibold text-gray-800">
                Đăng Nhập
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ touched, errors }) => (
                    <Form className="space-y-4">
                        <Field as={TextField} name="email" label="Email" fullWidth variant="outlined" error={touched.email && Boolean(errors.email)} helperText={<ErrorMessage name="email" />} />
                        <Field as={TextField} name="password" label="Password" type="password" fullWidth variant="outlined" error={touched.password && Boolean(errors.password)} helperText={<ErrorMessage name="password" />} />
                        <Button fullWidth variant="contained" type="submit" color="primary" sx={{ py: 1.5 }}>
                            Đăng nhập
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="body2" className="text-center text-gray-600 mt-4">
                Chưa có tài khoản?{" "}
                <span onClick={() => navigate("/account/register")} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                    Đăng ký ngay
                </span>
            </Typography>
        </div>
    );
};
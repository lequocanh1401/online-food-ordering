import React from 'react';
import { Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../State/Authentication/Action';

const initialValues = { fullName: "", email: "", password: "", role: "ROLE_CUSTOMER" };

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ tên"),
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập Email"),
    password: Yup.string().min(6, "Mật khẩu từ 6 ký tự").required("Vui lòng nhập mật khẩu"),
    role: Yup.string().required("Vui lòng chọn vai trò")
});

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        // Gửi lệnh đăng ký lên Redux
        dispatch(registerUser({ userData: values, navigate }));
    };

    return (
        <div className="space-y-5">
            <Typography variant="h5" className="text-center font-semibold text-gray-800">
                Đăng Ký Tài Khoản
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ touched, errors, setFieldValue, values }) => (
                    <Form className="space-y-4">
                        <Field as={TextField} name="fullName" label="Họ và tên" fullWidth variant="outlined" error={touched.fullName && Boolean(errors.fullName)} helperText={<ErrorMessage name="fullName" />} />
                        <Field as={TextField} name="email" label="Email" fullWidth variant="outlined" error={touched.email && Boolean(errors.email)} helperText={<ErrorMessage name="email" />} />
                        <Field as={TextField} name="password" label="Password" type="password" fullWidth variant="outlined" error={touched.password && Boolean(errors.password)} helperText={<ErrorMessage name="password" />} />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="role-select">Role</InputLabel>
                            <Select labelId="role-select" value={values.role} onChange={(e) => setFieldValue("role", e.target.value)} label="Role">
                                <MenuItem value="ROLE_CUSTOMER">Khách hàng</MenuItem>
                                <MenuItem value="ROLE_RESTAURANT_OWNER">Chủ nhà hàng</MenuItem>
                            </Select>
                        </FormControl>
                        <Button fullWidth variant="contained" type="submit" color="primary" sx={{ py: 1.5 }}>
                            Đăng ký
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="body2" className="text-center text-gray-600 mt-4">
                Đã có tài khoản?{" "}
                <span onClick={() => navigate("/account/login")} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                    Đăng nhập tại đây
                </span>
            </Typography>
        </div>
    );
};
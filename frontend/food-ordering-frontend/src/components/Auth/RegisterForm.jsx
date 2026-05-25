import React from 'react';
import { Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
};

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập Email"),
    password: Yup.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên").required("Vui lòng nhập mật khẩu"),
    role: Yup.string().required("Vui lòng chọn vai trò")
});

export const RegisterForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log("Dữ liệu đăng ký: ", values);
    };

    return (
        <div className="space-y-5">
            <Typography variant="h5" className="text-center font-semibold text-gray-800">
                Đăng Ký Tài Khoản
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ touched, errors, setFieldValue, values }) => (
                    <Form className="space-y-4">
                        <Field
                            as={TextField}
                            name="fullName"
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            error={touched.fullName && Boolean(errors.fullName)}
                            helperText={<ErrorMessage name="fullName" />}
                        />
                        <Field
                            as={TextField}
                            name="email"
                            label="Email Address"
                            fullWidth
                            variant="outlined"
                            error={touched.email && Boolean(errors.email)}
                            helperText={<ErrorMessage name="email" />}
                        />
                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            error={touched.password && Boolean(errors.password)}
                            helperText={<ErrorMessage name="password" />}
                        />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value={values.role}
                                onChange={(e) => setFieldValue("role", e.target.value)}
                                label="Role"
                            >
                                <MenuItem value="ROLE_CUSTOMER">Khách hàng (Customer)</MenuItem>
                                <MenuItem value="ROLE_RESTAURANT_OWNER">Chủ nhà hàng (Owner)</MenuItem>
                            </Select>
                        </FormControl>
                        <Button fullWidth variant="contained" type="submit" color="primary" sx={{ py: 1.5 }}>
                            Đăng ký
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="body2" className="text-center text-gray-600 mt-4">
                Đã có tài khoản rồi?{" "}
                <span onClick={() => navigate("/account/login")} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                    Đăng nhập tại đây
                </span>
            </Typography>
        </div>
    );
};
import React, { useState } from 'react';
import { Divider, Button, Card, TextField, Grid, Modal, Box } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CartItem } from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../State/Order/Action';

const style = {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)', width: 400,
    bgcolor: 'background.paper', outline: "none",
    boxShadow: 24, p: 4, borderRadius: 2
};

const initialValues = { streetAddress: "", state: "", city: "", pincode: "" };
const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
    state: Yup.string().required("Vui lòng nhập Tỉnh / Thành phố"),
    city: Yup.string().required("Vui lòng nhập Quận / Huyện"),
    pincode: Yup.string().required("Vui lòng nhập mã bưu điện")
});

export const Cart = () => {
    const [open, setOpen] = useState(false);
    const { cart, auth } = useSelector(store => store); // Móc kho Giỏ hàng và User ra
    const dispatch = useDispatch();

    const handleOpenAddressModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (values) => {
        const data = {
            jwt: localStorage.getItem("jwt"),
            order: {
                // Lấy ID nhà hàng từ món ăn đầu tiên trong giỏ
                restaurantId: cart.cartItems[0]?.food?.restaurant?.id,
                deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: values.streetAddress,
                    city: values.city,
                    state: values.state,
                    postalCode: values.pincode,
                    country: "Vietnam"
                }
            }
        };
        // Bắn action tạo đơn hàng
        dispatch(createOrder(data));
        console.log("Submit Đặt Hàng: ", data);
        handleClose();
    };

    return (
        <div className='min-h-screen pt-5'>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {/* In danh sách món trong giỏ (Kèm khiên bảo vệ Array) */}
                    {Array.isArray(cart.cartItems) && cart.cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}

                    <Divider className="bg-gray-700" />

                    <div className='billDetails px-5 text-sm'>
                        <p className='font-semibold py-5 text-white'>Hóa Đơn Chi Tiết</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Tổng tiền món</p>
                                <p>{cart.cart?.total || 0} đ</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Phí giao hàng</p>
                                <p>30000 đ</p>
                            </div>
                            <Divider className="bg-gray-700" />
                            <div className='flex justify-between text-white pb-5 font-semibold text-lg'>
                                <p>Tổng cộng</p>
                                {/* Cộng thêm phí ship vào tổng tiền */}
                                <p>{(cart.cart?.total || 0) + 30000} đ</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Divider orientation='vertical' flexItem className="bg-gray-700 hidden lg:block" />

                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10 text-white'>Chọn Địa Chỉ Giao Hàng</h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {/* Nút bật Form thêm địa chỉ */}
                            <Card className="flex gap-5 w-64 p-5 items-center justify-center cursor-pointer bg-gray-800 text-white hover:bg-gray-700 transition-all" onClick={handleOpenAddressModal}>
                                <div className='flex flex-col items-center'>
                                    <AddLocationAltIcon fontSize="large" className="text-pink-500" />
                                    <p className='font-semibold mt-2'>Thêm địa chỉ mới</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <h2 className="text-xl font-semibold mb-5 text-gray-800">Thêm Địa Chỉ Mới</h2>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ touched, errors }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field as={TextField} name="streetAddress" label="Số nhà, Tên đường" fullWidth variant="outlined" error={touched.streetAddress && Boolean(errors.streetAddress)} helperText={<ErrorMessage name="streetAddress" />} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field as={TextField} name="city" label="Quận / Huyện" fullWidth variant="outlined" error={touched.city && Boolean(errors.city)} helperText={<ErrorMessage name="city" />} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field as={TextField} name="state" label="Tỉnh / Thành phố" fullWidth variant="outlined" error={touched.state && Boolean(errors.state)} helperText={<ErrorMessage name="state" />} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field as={TextField} name="pincode" label="Mã bưu điện" fullWidth variant="outlined" error={touched.pincode && Boolean(errors.pincode)} helperText={<ErrorMessage name="pincode" />} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" type="submit" color="primary" sx={{ mt: 2, py: 1.5 }}>
                                            Giao Hàng Tới Đây
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    )
}
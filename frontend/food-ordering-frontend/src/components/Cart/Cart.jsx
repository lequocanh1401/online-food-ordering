import React, { useEffect } from 'react';
import { Box, Button, Card, Divider, Grid, TextField, IconButton } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../State/Order/Action';
import { updateCartItem, removeCartItem, findUserCart } from '../../State/Cart/Action';

export const Cart = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    // Rút kho giỏ hàng ra
    const cartData = useSelector(store => store.cart);

    // 👇 BỘ LỌC THÔNG MINH: Tự động vét sạch dữ liệu dù backend đặt tên là gì
    const cartItems = cartData.cartItems || cartData.cart?.item || cartData.cart?.items || [];
    const cartTotal = cartData.cart?.total || cartData.cart?.totalPrice || 0;

    useEffect(() => {
        if (jwt) {
            dispatch(findUserCart(jwt));
        }
    }, [dispatch, jwt]);

    const formik = useFormik({
        initialValues: { streetAddress: "", state: "", pincode: "", city: "" },
        onSubmit: (values) => {
            const reqData = {
                address: {
                    streetAddress: values.streetAddress,
                    city: values.city,
                    state: values.state,
                    postalCode: values.pincode,
                    country: "Vietnam"
                },
                restaurantId: cartItems[0]?.food?.restaurant?.id
            };
            console.log("Đang gửi API Đặt Hàng:", reqData);
            dispatch(createOrder({ reqData, jwt }));
            formik.resetForm();
        }
    });

    const handleUpdateCartItem = (cartItemId, quantity) => {
        if (quantity === 0) {
            dispatch(removeCartItem({ cartItemId, jwt }));
        } else {
            dispatch(updateCartItem({ cartItemId, quantity, jwt }));
        }
    };

    return (
        <div className='text-white min-h-screen p-5 lg:px-20'>
            <main className='lg:flex justify-between gap-10 mt-10'>

                {/* CỘT TRÁI: DANH SÁCH MÓN ĂN */}
                <section className='lg:w-[40%] space-y-6 pb-10'>
                    <h1 className='text-2xl font-semibold border-b border-gray-800 pb-3'>Giỏ Hàng Của Bạn</h1>

                    {cartItems.length === 0 ? (
                        <p className='text-gray-400 mt-5'>Giỏ hàng đang trống rỗng. Hãy quay lại chọn món nhé!</p>
                    ) : (
                        cartItems.map((item) => (
                            <Card key={item.id} className='p-5 bg-gray-950 border border-gray-800 flex justify-between items-center text-white'>
                                <div className='flex items-center gap-5'>
                                    <img className='w-[5rem] h-[5rem] object-cover rounded' src={item.food?.images?.[0]} alt="" />
                                    <div className='space-y-1'>
                                        <p className='font-semibold text-lg'>{item.food?.name}</p>
                                        <p className='text-gray-400'>{item.totalPrice}đ</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <IconButton onClick={() => handleUpdateCartItem(item.id, item.quantity - 1)} color="primary">
                                        <RemoveCircleIcon />
                                    </IconButton>
                                    <span className='font-semibold'>{item.quantity}</span>
                                    <IconButton onClick={() => handleUpdateCartItem(item.id, item.quantity + 1)} color="primary">
                                        <AddCircleIcon />
                                    </IconButton>
                                </div>
                            </Card>
                        ))
                    )}
                    <Divider sx={{ bgcolor: "gray" }} />
                    <div className='flex justify-between font-semibold text-xl px-2'>
                        <p>Tổng thanh toán:</p>
                        <p className='text-pink-500'>{cartTotal}đ</p>
                    </div>
                </section>

                <Divider orientation='vertical' flexItem sx={{ bgcolor: "gray", display: { xs: 'none', lg: 'block' } }} />

                {/* CỘT PHẢI: ĐỊA CHỈ */}
                <section className='lg:w-[50%] space-y-6'>
                    <h1 className='text-2xl font-semibold border-b border-gray-800 pb-3'>Thông Tin Giao Hàng</h1>
                    <form onSubmit={formik.handleSubmit} className='space-y-5 bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-xl'>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Địa chỉ nhà (Số nhà, tên đường)" name="streetAddress" value={formik.values.streetAddress} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Quận / Huyện" name="state" value={formik.values.state} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Thành phố" name="city" value={formik.values.city} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Mã Bưu Điện" name="pincode" value={formik.values.pincode} onChange={formik.handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                    fullWidth
                                    size='large'
                                    disabled={cartItems.length === 0}
                                >
                                    Xác Nhận Đặt Hàng
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </section>
            </main>
        </div>
    );
};
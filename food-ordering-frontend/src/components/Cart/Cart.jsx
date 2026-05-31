import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Divider, Grid, TextField, IconButton, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../State/Order/Action';
import { updateCartItem, removeCartItem, findUserCart } from '../../State/Cart/Action';
import { api } from '../../config/api';

export const Cart = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const navigate = useNavigate();
    // Rút kho giỏ hàng ra
    const cartData = useSelector(store => store.cart);
    const auth = useSelector(store => store.auth);

    // Bộ lọc vét dữ liệu
    const cartItems = cartData.cartItems || cartData.cart?.item || cartData.cart?.items || [];
    const cartTotal = cartData.cart?.total || cartData.cart?.totalPrice || 0;

    // Coupon states
    const [promoCode, setPromoCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [promoError, setPromoError] = useState("");

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) {
            setPromoError("Vui lòng nhập mã giảm giá");
            return;
        }
        const restaurantId = cartItems[0]?.food?.restaurant?.id;
        if (!restaurantId) {
            setPromoError("Giỏ hàng rỗng hoặc không hợp lệ");
            return;
        }

        try {
            const { data } = await api.get(`/api/coupons/validate?code=${encodeURIComponent(promoCode.trim().toUpperCase())}&restaurantId=${restaurantId}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            if (data && data.active) {
                if (cartTotal < (data.minimumOrderValue || 0)) {
                    setPromoError(`Đơn hàng tối thiểu từ ${(data.minimumOrderValue || 0).toLocaleString()} đ để áp dụng mã này.`);
                    setAppliedCoupon(null);
                } else {
                    setAppliedCoupon(data);
                    setPromoError("");
                }
            } else {
                setPromoError("Mã giảm giá đã hết hiệu lực");
                setAppliedCoupon(null);
            }
        } catch (err) {
            setPromoError("Mã giảm giá không hợp lệ");
            setAppliedCoupon(null);
        }
    };

    const handleRemovePromo = () => {
        setAppliedCoupon(null);
        setPromoCode("");
        setPromoError("");
    };

    const getDiscountAmount = () => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.discountType === "PERCENTAGE") {
            return (cartTotal * appliedCoupon.discountValue) / 100;
        }
        return appliedCoupon.discountValue;
    };

    const discount = getDiscountAmount();
    const finalTotal = Math.max(0, cartTotal - discount);

    useEffect(() => {
        if (jwt) {
            dispatch(findUserCart(jwt));
        }
    }, [dispatch, jwt]);

    useEffect(() => {
        if (appliedCoupon && cartTotal < (appliedCoupon.minimumOrderValue || 0)) {
            setAppliedCoupon(null);
            setPromoError(`Mã giảm giá ${appliedCoupon.code} đã bị gỡ do đơn hàng chưa đạt giá trị tối thiểu ${(appliedCoupon.minimumOrderValue || 0).toLocaleString()} đ.`);
        }
    }, [cartTotal, appliedCoupon]);

    const formik = useFormik({
        initialValues: { streetAddress: "", state: "", pincode: "", city: "" },
        onSubmit: (values) => {
            const reqData = {
                deliveryAddress: {
                    streetAddress: values.streetAddress,
                    city: values.city,
                    stateProvince: values.state,
                    postalCode: values.pincode,
                    country: "Vietnam"
                },
                restaurantId: cartItems[0]?.food?.restaurant?.id,
                couponCode: appliedCoupon ? appliedCoupon.code : null
            };
            console.log("Đang gửi API Đặt Hàng:", reqData);
            dispatch(createOrder({ reqData, jwt, navigate }));
            formik.resetForm();
            setAppliedCoupon(null);
            setPromoCode("");
        }
    });

    const handleUpdateCartItem = (cartItemId, quantity) => {
        if (quantity === 0) {
            dispatch(removeCartItem({ cartItemId, jwt }));
        } else {
            dispatch(updateCartItem({ cartItemId, quantity, jwt }));
        }

        // Dùng setTimeout ép React chờ 300ms cho Backend tính toán xong 
        // rồi mới tự động kéo giỏ hàng mới về
        setTimeout(() => {
            dispatch(findUserCart(jwt));
        }, 300);
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
                                        <p className='text-gray-400'>{item.food?.price * item.quantity} VND</p>
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

                    {/* Ô nhập mã giảm giá (Promo Code) */}
                    {cartItems.length > 0 && (
                        <Box className="p-4 bg-gray-950 border border-gray-800 rounded-lg space-y-3">
                            <Typography className="text-gray-300 font-semibold text-sm">
                                Khuyến mãi / Mã giảm giá:
                            </Typography>
                            {!appliedCoupon ? (
                                <Box className="flex gap-2">
                                    <TextField
                                        size="small"
                                        label="Nhập mã (ví dụ: GIAM20K)"
                                        value={promoCode}
                                        onChange={(e) => {
                                            setPromoCode(e.target.value.toUpperCase());
                                            setPromoError("");
                                        }}
                                        error={Boolean(promoError)}
                                        helperText={promoError}
                                        fullWidth
                                        sx={{
                                            '& label.Mui-focused': { color: '#e91e63' },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': { borderColor: '#e91e63' },
                                            }
                                        }}
                                    />
                                    <Button 
                                        onClick={handleApplyPromo}
                                        variant="contained" 
                                        sx={{ bgcolor: '#e91e63', '&:hover': { bgcolor: '#c2185b' }, fontWeight: 'bold', px: 3 }}
                                    >
                                        Áp dụng
                                    </Button>
                                </Box>
                            ) : (
                                <Box className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30">
                                    <div>
                                        <Typography variant="subtitle2" className="text-emerald-400 font-bold">
                                            Đã áp dụng mã: {appliedCoupon.code}
                                        </Typography>
                                        <Typography variant="caption" className="text-gray-400">
                                            {appliedCoupon.discountType === "PERCENTAGE" 
                                                ? `Giảm ${appliedCoupon.discountValue}% trên tổng hóa đơn` 
                                                : `Giảm ${appliedCoupon.discountValue?.toLocaleString()} đ`}
                                        </Typography>
                                    </div>
                                    <Button 
                                        onClick={handleRemovePromo} 
                                        size="small" 
                                        color="error" 
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        Gỡ bỏ
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    )}

                    <Divider sx={{ bgcolor: "gray" }} />
                    {appliedCoupon && (
                        <div className='space-y-2 mt-4 px-2 text-sm text-gray-400'>
                            <div className='flex justify-between'>
                                <p>Tạm tính:</p>
                                <p>{cartTotal?.toLocaleString()} VND</p>
                            </div>
                            <div className='flex justify-between text-emerald-400 font-semibold'>
                                <p>Giảm giá ({appliedCoupon.code}):</p>
                                <p>-{discount?.toLocaleString()} VND</p>
                            </div>
                            <Divider sx={{ bgcolor: "gray" }} />
                        </div>
                    )}
                    <div className='flex justify-between font-semibold text-xl px-2 mt-2'>
                        <p>Tổng thanh toán:</p>
                        <p className='text-pink-500'>{finalTotal?.toLocaleString()} VND</p>
                    </div>
                </section>

                <Divider orientation='vertical' flexItem sx={{ bgcolor: "gray", display: { xs: 'none', lg: 'block' } }} />

                {/* CỘT PHẢI: ĐỊA CHỈ */}
                <section className='lg:w-[50%] space-y-6'>
                    <h1 className='text-2xl font-semibold border-b border-gray-800 pb-3'>Thông Tin Giao Hàng</h1>

                    {/* Chọn nhanh địa chỉ đã lưu */}
                    {auth.user?.addresses && auth.user.addresses.length > 0 && (
                        <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-800 space-y-2">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Chọn nhanh địa chỉ đã lưu:</p>
                            <div className="flex flex-wrap gap-2">
                                {auth.user.addresses.map((addr, index) => (
                                    <Button
                                        key={addr.id || index}
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            formik.setValues({
                                                streetAddress: addr.streetAddress || "",
                                                state: addr.stateProvince || addr.state || "",
                                                city: addr.city || "",
                                                pincode: addr.postalCode || ""
                                            });
                                        }}
                                        sx={{
                                            color: '#e91e63',
                                            borderColor: 'rgba(233, 30, 99, 0.4)',
                                            textTransform: 'none',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            '&:hover': {
                                                borderColor: '#e91e63',
                                                bgcolor: 'rgba(233, 30, 99, 0.05)'
                                            }
                                        }}
                                    >
                                        #{index + 1}: {addr.streetAddress}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

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
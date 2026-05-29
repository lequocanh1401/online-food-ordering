import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Card, Typography, Box, Chip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { completePayment } from '../../State/Order/Action';

export const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (id && jwt) {
            dispatch(completePayment({ orderId: id, jwt }));
        }
    }, [id, jwt, dispatch]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-5 relative overflow-hidden">
            {/* Vòng tròn hiệu ứng mờ nền phía sau */}
            <div className="absolute w-[30rem] h-[30rem] rounded-full bg-emerald-500/10 blur-[100px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute w-[20rem] h-[20rem] rounded-full bg-pink-500/5 blur-[120px] bottom-1/4 left-1/3 pointer-events-none" />

            <Card sx={{ bgcolor: 'rgba(17, 24, 39, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4 }} className="w-full max-w-md p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-6 z-10">

                {/* Vùng Icon với hiệu ứng sóng đập nhẹ */}
                <Box className="relative flex items-center justify-center">
                    <Box className="absolute w-24 h-24 rounded-full bg-emerald-500/20 animate-ping duration-1000" />
                    <CheckCircleIcon sx={{ fontSize: "5.5rem", color: "#10b981", filter: 'drop-shadow(0 0 15px rgba(16,185,129,0.4))' }} className="relative z-10" />
                </Box>

                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                        Thanh Toán Thành Công!
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Cảm ơn bạn đã đặt hàng tại Online Food Ordering. Đơn hàng của bạn đã được gửi đến nhà hàng và đang được chế biến khẩn trương.
                    </p>
                </div>

                {id && (
                    <Box className="bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full flex items-center gap-2">
                        <Typography className="text-sm font-semibold text-emerald-400">
                            Mã đơn hàng:
                        </Typography>
                        <Chip 
                            label={`#${id}`} 
                            size="small" 
                            color="success"
                            className="font-bold text-xs"
                            sx={{ bgcolor: '#10b981', color: '#fff' }}
                        />
                    </Box>
                )}

                <div className="w-full border-t border-b border-gray-800/80 py-5 text-left space-y-3 text-sm text-gray-400">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Trạng thái thanh toán:</span>
                        <span className="font-semibold text-emerald-400">Đã thanh toán (Stripe)</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Phương thức nhận hàng:</span>
                        <span className="font-semibold text-gray-200">Giao hàng tận nơi</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Thời gian dự kiến:</span>
                        <span className="font-semibold text-gray-200 text-pink-500">30 - 45 phút</span>
                    </div>
                </div>

                {/* Các nút điều hướng nhanh */}
                <div className="flex flex-col w-full gap-3 pt-2">
                    <Button
                        onClick={() => navigate("/my-profile/orders")}
                        variant="contained"
                        fullWidth
                        size="large"
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 font-bold tracking-wide py-3"
                        sx={{ borderRadius: 2 }}
                    >
                        Xem Lịch Sử Đơn Hàng
                    </Button>

                    <Button
                        onClick={() => navigate("/")}
                        variant="outlined"
                        fullWidth
                        size="large"
                        sx={{ 
                            color: 'rgba(255,255,255,0.7)', 
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderRadius: 2,
                            '&:hover': {
                                borderColor: 'rgba(255,255,255,0.2)',
                                bgcolor: 'rgba(255,255,255,0.03)'
                            }
                        }}
                    >
                        Quay Lại Trang Chủ
                    </Button>
                </div>
            </Card>
        </div>
    );
};
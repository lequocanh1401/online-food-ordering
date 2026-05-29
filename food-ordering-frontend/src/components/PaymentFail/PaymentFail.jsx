import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Card, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PaymentFail = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-5 relative overflow-hidden">
            {/* Vòng tròn hiệu ứng mờ nền đỏ phía sau */}
            <div className="absolute w-[30rem] h-[30rem] rounded-full bg-rose-500/10 blur-[100px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute w-[20rem] h-[20rem] rounded-full bg-amber-500/5 blur-[120px] bottom-1/4 left-1/3 pointer-events-none" />

            <Card sx={{ bgcolor: 'rgba(17, 24, 39, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4 }} className="w-full max-w-md p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-6 z-10">

                {/* Vùng Icon với hiệu ứng sóng đập nhẹ màu đỏ */}
                <Box className="relative flex items-center justify-center">
                    <Box className="absolute w-24 h-24 rounded-full bg-rose-500/20 animate-ping duration-1000" />
                    <CancelIcon sx={{ fontSize: "5.5rem", color: "#f43f5e", filter: 'drop-shadow(0 0 15px rgba(244,63,94,0.4))' }} className="relative z-10" />
                </Box>

                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-200">
                        Thanh Toán Thất Bại!
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Giao dịch thanh toán của bạn không thể hoàn tất. Vui lòng kiểm tra lại thẻ thanh toán hoặc số dư tài khoản của bạn.
                    </p>
                </div>

                <div className="w-full border-t border-b border-gray-800/80 py-5 text-left space-y-3 text-sm text-gray-400">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Trạng thái giao dịch:</span>
                        <span className="font-semibold text-rose-400 font-bold">Thất bại / Bị hủy</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Hình thức thanh toán:</span>
                        <span className="font-semibold text-gray-200">Thẻ Visa/Mastercard (Stripe)</span>
                    </div>
                </div>

                {/* Các nút điều hướng nhanh */}
                <div className="flex flex-col w-full gap-3 pt-2">
                    <Button
                        onClick={() => navigate("/cart")}
                        variant="contained"
                        fullWidth
                        size="large"
                        className="bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-600 hover:to-amber-700 font-bold tracking-wide py-3"
                        sx={{ borderRadius: 2 }}
                    >
                        Quay Lại Giỏ Hàng
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

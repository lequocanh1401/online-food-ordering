import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white px-5'>
            <Card className='w-full max-w-md p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-6'>

                {/* Icon Tích Xanh Thành Công */}
                <CheckCircleIcon sx={{ fontSize: "5rem", color: "#4caf50" }} />

                <div className='space-y-2'>
                    <h1 className='text-3xl font-bold tracking-wide text-gray-100'>
                        Thanh Toán Thành Công!
                    </h1>
                    <p className='text-gray-400 text-sm'>
                        Cảm ơn bạn đã đặt hàng tại Zosh Food. Đơn hàng của bạn đã được gửi đến nhà hàng và đang được xử lý.
                    </p>
                </div>

                <div className='w-full border-t border-b border-gray-800 py-4 text-left space-y-2 text-sm text-gray-400'>
                    <p><span className='font-semibold text-gray-300'>Trạng thái:</span> Đã thanh toán qua Stripe</p>
                    <p><span className='font-semibold text-gray-300'>Hình thức:</span> Giao hàng tận nơi</p>
                </div>

                {/* Các nút điều hướng nhanh */}
                <div className='flex flex-col w-full gap-3'>
                    <Button
                        onClick={() => navigate("/my-profile/orders")}
                        variant='contained'
                        color='primary'
                        fullWidth
                        size='large'
                    >
                        Xem Lịch Sử Đơn Hàng
                    </Button>

                    <Button
                        onClick={() => navigate("/")}
                        variant='outlined'
                        sx={{ color: 'white', borderColor: 'gray' }}
                        fullWidth
                        size='large'
                    >
                        Quay Lại Trang Chủ
                    </Button>
                </div>
            </Card>
        </div>
    );
};
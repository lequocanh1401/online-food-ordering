import React from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen px-5 flex flex-col items-center justify-center bg-gray-900">
            <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5 border border-gray-700 bg-gray-800 text-white shadow-lg">
                <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
                <h1 className="py-5 text-2xl font-semibold">Thanh toán thành công!</h1>
                <p className="py-3 text-center text-gray-400">
                    Cảm ơn bạn đã đặt món. Đơn hàng của bạn đang được nhà hàng chuẩn bị.
                </p>
                <p className="py-2 text-center text-gray-200 text-lg">Chúc bạn ngon miệng!</p>

                <Button
                    variant="contained"
                    className="my-5"
                    sx={{ margin: "2rem 0rem", backgroundColor: "#e91e63" }}
                    onClick={() => navigate("/")}
                >
                    Quay về Trang Chủ
                </Button>
            </div>
        </div>
    );
};
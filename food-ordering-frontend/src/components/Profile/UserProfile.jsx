import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../State/Authentication/Action';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Rút thông tin user từ kho Redux ra để hiển thị tên thật
    const auth = useSelector(store => store.auth);

    const handleLogout = () => {
        // Bắn lệnh xóa JWT trong bộ nhớ máy
        dispatch(logout());
        // Đá người dùng về trang chủ
        navigate("/");
    };

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col items-center justify-center'>
                <AccountCircleIcon sx={{ fontSize: "9rem", color: "#e91e63" }} />

                <h1 className='py-5 text-2xl font-semibold text-white'>
                    {auth.user?.fullName || "Khách hàng"}
                </h1>

                <p className='text-gray-400'>Email: {auth.user?.email || "Chưa cập nhật"}</p>
                <p className='text-gray-400 mb-5'>Vai trò: {auth.user?.role === "ROLE_RESTAURANT_OWNER" ? "Chủ nhà hàng" : "Khách hàng"}</p>

                <Button
                    onClick={handleLogout}
                    variant='contained'
                    sx={{ padding: "0.8rem 2rem", backgroundColor: "#e91e63", '&:hover': { backgroundColor: "#c2185b" } }}
                >
                    Đăng xuất
                </Button>
            </div>
        </div>
    )
}
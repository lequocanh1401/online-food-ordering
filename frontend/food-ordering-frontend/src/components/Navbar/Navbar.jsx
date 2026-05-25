import React from 'react';
import { IconButton, Avatar, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const navigate = useNavigate();
    // Lấy dữ liệu user từ kho Redux
    const { auth } = useSelector(store => store);

    const handleAvatarClick = () => {
        if (auth.user?.role === "ROLE_CUSTOMER") {
            navigate("/my-profile");
        } else if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
            navigate("/admin/restaurant");
        } else {
            navigate("/account/login");
        }
    };

    return (
        <div className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
                <div onClick={() => navigate("/")} className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li className='font-semibold text-white text-2xl list-none'>
                        Food Delivery
                    </li>
                </div>
            </div>

            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div>
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                    </IconButton>
                </div>

                <div className='cursor-pointer'>
                    <Avatar
                        onClick={handleAvatarClick}
                        sx={{ bgcolor: "white", color: "#e91e63" }}
                    >
                        {/* Nếu đăng nhập rồi thì hiện chữ cái đầu của tên, chưa thì hiện Icon hoặc rỗng */}
                        {auth.user?.fullName ? auth.user.fullName[0].toUpperCase() : ""}
                    </Avatar>
                </div>

                <div>
                    <IconButton onClick={() => navigate("/cart")}>
                        <Badge color="primary" badgeContent={3}>
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
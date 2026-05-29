import React, { useState } from 'react';
import { Avatar, Badge, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchModal } from './SearchModal';

export const Navbar = () => {
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);

    // Kéo thông tin người dùng và giỏ hàng từ Redux để hiển thị số lượng món ăn
    const auth = useSelector(store => store.auth);
    const cart = useSelector(store => store.cart);

    const handleAvatarClick = () => {
        if (auth.user?.role === "ROLE_CUSTOMER") {
            navigate("/my-profile");
        } else if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
            navigate("/admin/restaurant");
        }
    };

    return (
        <Box className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between sticky top-0'>
            {/* Logo Góc Trái */}
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li onClick={() => navigate("/")} className='logo font-semibold text-white text-2xl list-none'>
                    Online Food Ordering
                </li>
            </div>

            {/* Các Nút Chức Năng Góc Phải */}
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <IconButton onClick={() => setSearchOpen(true)}>
                        <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                    </IconButton>
                </div>

                <div className=''>
                    {auth.user ? (
                        <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: "#e91e63", cursor: "pointer" }}>
                            {/* Lấy chữ cái đầu tiên của tên để làm Avatar */}
                            {auth.user?.fullName[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <IconButton onClick={() => navigate("/account/login")}>
                            <Avatar sx={{ bgcolor: "white", color: "#e91e63" }} />
                        </IconButton>
                    )}
                </div>

                <div className=''>
                    <IconButton onClick={() => navigate("/cart")}>
                        {/* Huy hiệu màu xanh hiện số lượng món trong giỏ */}
                        <Badge color="primary" badgeContent={cart.cart?.items?.length || 0}>
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                        </Badge>
                    </IconButton>
                </div>
            </div>

            <SearchModal open={searchOpen} handleClose={() => setSearchOpen(false)} />
        </Box>
    );
};
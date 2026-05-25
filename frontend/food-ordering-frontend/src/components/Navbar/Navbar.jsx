import React from 'react';
import { IconButton, Avatar, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between items-center'>
            {/* Cụm Logo bên trái */}
            <div className='flex items-center space-x-4'>
                <div onClick={() => navigate("/")} className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li className='font-semibold text-white text-2xl list-none'>
                        Food Delivery
                    </li>
                </div>
            </div>

            {/* Cụm Icon bên phải */}
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div>
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                    </IconButton>
                </div>

                {/* Click vào Avatar để bật trang Login */}
                <div className='cursor-pointer'>
                    <Avatar
                        onClick={() => navigate("/account/login")}
                        sx={{ bgcolor: "white", color: "#e91e63" }}
                    >
                        QA
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
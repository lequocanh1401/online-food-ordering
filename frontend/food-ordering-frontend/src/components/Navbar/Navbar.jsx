import React from 'react';
import { IconButton, Avatar, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Navbar = () => {
    return (
        <div className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>
            {/* Cụm Logo bên trái */}
            <div className='flex items-center space-x-4'>
                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
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
                <div>
                    <Avatar sx={{ bgcolor: "white", color: "#e91e63" }}>QA</Avatar>
                </div>
                <div>
                    <IconButton>
                        <Badge color="primary" badgeContent={3}>
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
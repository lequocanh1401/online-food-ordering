import React from 'react';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const UserProfile = () => {
    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center text-white'>
            <div className='flex flex-col items-center justify-center'>
                <AccountCircleIcon sx={{ fontSize: "9rem" }} className='text-pink-500' />
                <h1 className='py-5 text-2xl font-semibold'>Lê Quốc Anh</h1>
                <p className='text-gray-400'>Email: khachhang@gmail.com</p>
                <Button variant='contained' color='error' sx={{ margin: "2rem 0rem" }}>
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
};
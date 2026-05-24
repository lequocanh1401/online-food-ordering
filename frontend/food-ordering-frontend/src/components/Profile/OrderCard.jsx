import React from 'react';
import { Button, Card } from '@mui/material';

export const OrderCard = () => {
    return (
        <Card className='flex justify-between items-center p-5 bg-gray-800 text-white w-full lg:w-[60vw]'>
            <div className='flex items-center space-x-5'>
                <img className='h-16 w-16 object-cover' src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Food" />
                <div>
                    <p className='font-semibold text-lg'>Pizza Thập Cẩm</p>
                    <p className='text-gray-400 text-sm'>150,000 đ</p>
                </div>
            </div>
            <div>
                <Button disabled className='bg-green-600 text-white px-3 py-1 rounded'>
                    Đã giao
                </Button>
            </div>
        </Card>
    );
};
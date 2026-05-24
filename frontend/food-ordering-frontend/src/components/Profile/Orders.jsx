import React from 'react';
import { OrderCard } from './OrderCard';

export const Orders = () => {
    return (
        <div className='flex items-center flex-col text-white w-full'>
            <h1 className='text-xl text-center py-7 font-semibold'>Lịch Sử Đơn Hàng</h1>
            <div className='space-y-4 w-full flex flex-col items-center px-5'>
                {[1, 1, 1].map((item, index) => <OrderCard key={index} />)}
            </div>
        </div>
    );
};
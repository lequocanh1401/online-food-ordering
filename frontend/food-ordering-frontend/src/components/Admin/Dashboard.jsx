import React from 'react';
import { Orders } from './Orders';

export const Dashboard = () => {
    return (
        <div>
            <h1 className='text-2xl font-bold pb-5 px-5'>BẢNG ĐIỀU KHIỂN TỔNG QUAN</h1>
            <Orders />
        </div>
    );
};
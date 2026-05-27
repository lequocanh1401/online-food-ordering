import React from 'react';
import { CreateRestaurantForm } from './CreateRestaurantForm';

export const Dashboard = () => {
    return (
        <div>
            {/* Gọi Form tạo nhà hàng ra trang chủ Admin để kiểm tra */}
            <CreateRestaurantForm />
        </div>
    );
};
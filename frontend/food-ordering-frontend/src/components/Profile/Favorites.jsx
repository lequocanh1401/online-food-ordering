import React from 'react';
import { RestaurantCard } from '../Restaurant/RestaurantCard';

export const Favorites = () => {
    return (
        <div className='text-white w-full px-5 lg:px-20'>
            <h1 className='text-xl text-center py-7 font-semibold'>Nhà Hàng Yêu Thích</h1>
            <div className='flex flex-wrap gap-5 justify-center'>
                {[1, 1, 1].map((item, index) => <RestaurantCard key={index} />)}
            </div>
        </div>
    );
};
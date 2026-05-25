import React from 'react';
import { RestaurantCard } from '../Restaurant/RestaurantCard';
import { useSelector } from 'react-redux';

export const Favorites = () => {
    // Lấy ngăn auth từ kho Redux ra để kiểm tra danh sách yêu thích
    const { auth } = useSelector(store => store);

    return (
        <div className='text-white w-full px-5 lg:px-20'>
            <h1 className='text-xl text-center py-7 font-semibold'>Nhà Hàng Yêu Thích</h1>
            <div className='flex flex-wrap gap-5 justify-center'>
                {/* Ép kiểm tra mảng thật từ Redux, tránh truyền số ảo vào làm sập giao diện */}
                {Array.isArray(auth.favorites) && auth.favorites.map((item) =>
                    <RestaurantCard key={item.id} item={item} />
                )}
            </div>
        </div>
    );
};
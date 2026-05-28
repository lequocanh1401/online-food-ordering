import React from 'react';
import { useSelector } from 'react-redux';
import { RestaurantCard } from '../Restaurant/RestaurantCard';

export const Favorites = () => {
    // Rút thông tin user từ Redux để lấy mảng favorites
    const auth = useSelector(store => store.auth);

    return (
        <div className='pb-10'>
            <h1 className='text-2xl text-center py-7 font-bold text-gray-300 tracking-wider'>
                NHÀ HÀNG YÊU THÍCH
            </h1>
            <div className='flex flex-wrap items-center justify-center gap-5 px-5'>
                {/* Quét mảng favorites và render ra các thẻ nhà hàng */}
                {auth.favorites?.length > 0 ? (
                    auth.favorites.map((item) => (
                        <RestaurantCard key={item.id} item={item} />
                    ))
                ) : (
                    <p className='text-gray-500 mt-5 text-lg'>Bạn chưa thả tim nhà hàng nào cả.</p>
                )}
            </div>
        </div>
    );
};
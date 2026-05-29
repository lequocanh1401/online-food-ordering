import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../../State/Restaurant/Action';
import { RestaurantCard } from '../Restaurant/RestaurantCard'; // Import component vừa tạo

export const Home = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const restaurant = useSelector(store => store.restaurant);

    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt));
    }, [dispatch, jwt]);

    return (
        <div className='pb-10 bg-black min-h-screen text-white'>
            {/* Banner */}
            <section
                className='relative flex flex-col justify-center items-center'
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '65vh'
                }}
            >
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-0'></div>

                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-3xl lg:text-7xl font-bold py-5 tracking-wide text-white'>Online Food Ordering</p>
                    <p className='text-gray-300 text-xl lg:text-3xl font-light'>Hương vị tuyệt hảo, giao ngay tận cửa!</p>
                </div>
            </section>

            {/* Danh sách nhà hàng */}
            <section className='p-10 lg:py-10 lg:px-20'>
                <h1 className='text-2xl font-semibold text-gray-400 py-3 pb-5 border-b border-gray-800'>
                    Các Nhà Hàng Nổi Bật
                </h1>

                <div className='flex flex-wrap items-center justify-start gap-3 mt-8'>
                    {/* Duyệt mảng và đổ ra Card chuyên nghiệp */}
                    {restaurant.restaurants?.map((item) => (
                        <RestaurantCard key={item.id} item={item} />
                    ))}
                </div>
            </section>
        </div>
    );
};
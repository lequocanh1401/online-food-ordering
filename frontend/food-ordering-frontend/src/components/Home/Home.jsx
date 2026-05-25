import React, { useEffect } from 'react';
import { MultiItemCarousel } from './MultiItemCarousel';
import { RestaurantCard } from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../../State/Restaurant/Action';

export const Home = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    // Lấy ngăn restaurant từ trong kho tổng Redux ra dùng
    const { restaurant } = useSelector(store => store);

    // Kích hoạt hàm gọi API khi trang Home vừa lên hình
    useEffect(() => {
        if (jwt) {
            dispatch(getAllRestaurantsAction(jwt));
        }
    }, [dispatch, jwt]);

    return (
        <div className='pb-10 bg-gray-900 min-h-screen text-white'>
            <section className='relative flex flex-col justify-center items-center banner h-[60vh] bg-cover bg-center' style={{ backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10'></div>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Food Delivery</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-2xl'>Ngon miệng, nhanh chóng và tiện lợi.</p>
                </div>
            </section>

            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Món Ngon Đề Xuất</p>
                <MultiItemCarousel />
            </section>

            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-gray-400 pb-8'>Đặt Hàng Ngay</h1>
                <div className='flex flex-wrap items-center justify-around gap-5'>
                    {/* Quét qua mảng dữ liệu THẬT từ Backend để in thẻ */}
                    {restaurant.restaurants?.map((item) => (
                        <RestaurantCard key={item.id} item={item} />
                    ))}
                </div>
            </section>
        </div>
    )
}
import React, { useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsAction } from '../../State/Restaurant/Action'; // Hoặc đường dẫn chứa action lấy sự kiện của bạn

export const Events = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    // Lấy dữ liệu từ store restaurant giống như bên trang Admin
    const restaurant = useSelector(store => store.restaurant);

    // Tự động kéo toàn bộ sự kiện trên hệ thống về khi khách mở tab
    useEffect(() => {
        if (jwt) {
            // Nếu trong Action.js của bạn tên hàm khác (VD: getAllEvents), hãy sửa lại cho đúng nhé
            dispatch(getAllEventsAction({ jwt }));
        }
    }, [dispatch, jwt]);

    return (
        <div className='pb-10 flex flex-col items-center'>
            <h1 className='text-2xl text-center py-7 font-bold text-gray-300 tracking-wider'>
                SỰ KIỆN & KHUYẾN MÃI ĐANG DIỄN RA
            </h1>

            <div className='flex flex-wrap items-center justify-center gap-6 px-5 w-full lg:w-4/5'>
                {restaurant.events?.length > 0 ? (
                    restaurant.events.map((item) => (
                        <Card key={item.id} sx={{ width: 345, bgcolor: '#111827', border: '1px solid #1f2937' }} className='hover:scale-105 transition-transform duration-300'>
                            <CardMedia
                                sx={{ height: 160 }}
                                image={item.image || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"}
                                title={item.name}
                            />
                            <CardContent className='text-white'>
                                <Typography gutterBottom variant="h5" component="div" className='font-bold text-pink-500'>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" className='text-gray-400'>
                                    <span className='font-semibold text-gray-300'>Nơi áp dụng:</span> {item.location}
                                </Typography>
                                <div className='mt-4 pt-3 border-t border-gray-800 text-xs text-gray-500 space-y-1'>
                                    <p>📅 Bắt đầu: {item.startedAt}</p>
                                    <p>⌛ Kết thúc: {item.endsAt}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className='text-gray-500 mt-5 text-lg'>Hiện tại chưa có sự kiện hoặc mã giảm giá nào diễn ra.</p>
                )}
            </div>
        </div>
    );
};
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const Events = () => {
    return (
        <div className='text-white w-full px-5 lg:px-20 flex flex-col items-center'>
            <h1 className='text-xl text-center py-7 font-semibold'>Sự Kiện & Khuyến Mãi</h1>
            <div className='flex flex-wrap gap-5 justify-center w-full'>
                {[1, 1].map((item, index) => (
                    <Card key={index} className='w-[20rem] bg-gray-800 text-white'>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="Khuyến mãi"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">Giảm giá 50%</Typography>
                            <Typography variant="body2" color="gray">
                                Áp dụng cho toàn bộ menu pizza vào ngày thứ 4 hàng tuần.
                            </Typography>
                            <p className='text-sm text-pink-500 mt-2'>Bắt đầu: 24/05/2026</p>
                            <p className='text-sm text-pink-500'>Kết thúc: 31/05/2026</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
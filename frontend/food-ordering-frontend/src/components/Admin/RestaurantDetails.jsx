import React from 'react';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../State/Restaurant/Action';

export const RestaurantDetails = () => {
    const dispatch = useDispatch();
    const { usersRestaurant } = useSelector(store => store.restaurant);
    const jwt = localStorage.getItem("jwt");

    const handleUpdateStatus = () => {
        dispatch(updateRestaurantStatus({ restaurantId: usersRestaurant?.id, jwt }));
    };

    return (
        <div className='lg:px-20 px-5 pb-10'>
            <div className='py-5 flex justify-center items-center gap-5'>
                <h1 className='text-2xl lg:text-5xl text-center font-bold'>
                    {usersRestaurant?.name}
                </h1>
                <Button
                    onClick={handleUpdateStatus}
                    variant='contained'
                    color={usersRestaurant?.open ? "success" : "error"}
                    sx={{ py: 1.5, px: 4 }}
                >
                    {usersRestaurant?.open ? "ĐANG MỞ CỬA" : "ĐANG ĐÓNG CỬA"}
                </Button>
            </div>

            <div className='w-full'>
                <Card className='bg-gray-800 text-white'>
                    <CardHeader title="Thông Tin Chi Tiết" />
                    <CardContent className='space-y-4'>
                        <p><span className='font-semibold'>Chủ quán:</span> {usersRestaurant?.owner?.fullName}</p>
                        <p><span className='font-semibold'>Loại ẩm thực:</span> {usersRestaurant?.cuisineType}</p>
                        <p><span className='font-semibold'>Giờ mở cửa:</span> {usersRestaurant?.openingHours}</p>
                        <p><span className='font-semibold'>Địa chỉ:</span> {usersRestaurant?.address?.streetAddress}, {usersRestaurant?.address?.city}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
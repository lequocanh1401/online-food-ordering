import React from 'react';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../State/Restaurant/Action';

export const RestaurantDetails = () => {
    // 1. Mở kho Redux để lấy dữ liệu restaurant và jwt
    const { restaurant } = useSelector(store => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleRestaurantStatus = () => {
        // Nối API đổi trạng thái đóng/mở cửa của Zosh
        dispatch(updateRestaurantStatus({
            restaurantId: restaurant.usersRestaurant?.id,
            jwt: jwt
        }));
    };

    return (
        <div className='px-2 lg:px-20 pb-10 text-white'>
            <div className='py-5 flex justify-between items-center m-2'>
                <h1 className='text-2xl lg:text-5xl font-bold'>
                    {/* Dữ liệu thật: Tên nhà hàng */}
                    {restaurant.usersRestaurant?.name}
                </h1>
                <div>
                    <Button
                        color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
                        className='py-[1rem] px-[2rem]'
                        variant='contained'
                        onClick={handleRestaurantStatus}
                        size='large'
                    >
                        {restaurant.usersRestaurant?.open ? "Close Restaurant" : "Open Restaurant"}
                    </Button>
                </div>
            </div>
            <Grid container spacing={2} className='px-2'>
                <Grid item="true" xs={12}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Details</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Owner</p>
                                    <p>{restaurant.usersRestaurant?.owner?.fullName}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Restaurant Name</p>
                                    <p>{restaurant.usersRestaurant?.name}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Cuisine Type</p>
                                    <p>{restaurant.usersRestaurant?.cuisineType}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Opening Hours</p>
                                    <p>{restaurant.usersRestaurant?.openingHours}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Status</p>
                                    <p>
                                        {restaurant.usersRestaurant?.open ? (
                                            <span className='px-5 py-1.5 rounded-full bg-green-400 text-gray-950 font-semibold'>Open</span>
                                        ) : (
                                            <span className='px-5 py-1.5 rounded-full bg-red-400 text-white font-semibold'>Closed</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item="true" xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Address</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Country</p>
                                    <p>{restaurant.usersRestaurant?.address?.country}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>City</p>
                                    <p>{restaurant.usersRestaurant?.address?.city}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Postal Code</p>
                                    <p>{restaurant.usersRestaurant?.address?.postalCode}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Street Address</p>
                                    <p>{restaurant.usersRestaurant?.address?.streetAddress}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item="true" xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Contact Info</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Email</p>
                                    <p>{restaurant.usersRestaurant?.contactInformation?.email}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Mobile</p>
                                    <p>{restaurant.usersRestaurant?.contactInformation?.mobile}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Instagram</p>
                                    <p>{restaurant.usersRestaurant?.contactInformation?.instagram}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Twitter</p>
                                    <p>{restaurant.usersRestaurant?.contactInformation?.twitter}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
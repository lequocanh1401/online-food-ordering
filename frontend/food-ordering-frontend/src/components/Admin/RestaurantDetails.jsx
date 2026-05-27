import React from 'react';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';

export const RestaurantDetails = () => {
    const handleRestaurantStatus = () => {
        // Sẽ nối API đổi trạng thái đóng/mở cửa sau
    };

    return (
        <div className='px-2 lg:px-20 pb-10 text-white'>
            <div className='py-5 flex justify-between items-center m-2'>
                <h1 className='text-2xl lg:text-5xl font-bold'>Tiệm Cơm Tấm Sài Gòn</h1>
                <div>
                    <Button
                        color={true ? "error" : "primary"}
                        className='py-[1rem] px-[2rem]'
                        variant='contained'
                        onClick={handleRestaurantStatus}
                        size='large'
                    >
                        {true ? "Close Restaurant" : "Open Restaurant"}
                    </Button>
                </div>
            </div>
            <Grid container spacing={2} className='px-2'>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Details</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Owner</p>
                                    <p>Lê Quốc Anh</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Restaurant Name</p>
                                    <p>Tiệm Cơm Tấm Sài Gòn</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Cuisine Type</p>
                                    <p>Vietnamese</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Opening Hours</p>
                                    <p>08:00 - 22:00</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Status</p>
                                    <p>
                                        <span className='px-5 py-1.5 rounded-full bg-green-400 text-gray-950 font-semibold'>Open</span>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Address</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Country</p>
                                    <p>Vietnam</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>City</p>
                                    <p>Hà Nội</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Postal Code</p>
                                    <p>100000</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Street Address</p>
                                    <p>Số 1, Phố Chùa Láng</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Contact Info</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Email</p>
                                    <p>comtam@gmail.com</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Mobile</p>
                                    <p>0987654321</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Instagram</p>
                                    <p>comtam_hn</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 font-semibold text-gray-400'>Twitter</p>
                                    <p>comtam_hn</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
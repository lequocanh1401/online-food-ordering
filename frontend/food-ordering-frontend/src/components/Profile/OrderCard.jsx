import React from 'react';
import { Button, Card } from '@mui/material';

export const OrderCard = ({ item, orderStatus }) => {
    return (
        <Card className='flex justify-between items-center p-5 bg-gray-900 text-white border border-gray-800 shadow-md'>
            <div className='flex items-center space-x-5'>
                <img
                    className='h-16 w-16 object-cover rounded'
                    src={item.food?.images?.[0] || "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"}
                    alt={item.food?.name}
                />
                <div>
                    <p className='text-xl font-semibold'>{item.food?.name}</p>
                    <p className='text-gray-400'>{(item.totalPrice)}đ</p>
                </div>
            </div>
            <div>
                <Button
                    variant='contained'
                    disabled
                    sx={{
                        color: orderStatus === 'COMPLETED' || orderStatus === 'DELIVERED' ? '#4caf50' : '#ff9800',
                        backgroundColor: 'transparent !important',
                        fontWeight: 'bold',
                        border: '1px solid',
                        borderColor: orderStatus === 'COMPLETED' || orderStatus === 'DELIVERED' ? '#4caf50' : '#ff9800'
                    }}
                >
                    {orderStatus}
                </Button>
            </div>
        </Card>
    );
};
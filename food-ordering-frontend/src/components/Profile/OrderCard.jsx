import React from 'react';
import { Button, Card } from '@mui/material';
import { useDispatch } from 'react-redux';
import { cancelOrder } from '../../State/Order/Action';

export const OrderCard = ({ item, order }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const isUnpaid = order?.orderStatus === 'PENDING';
    const statusText = order?.orderStatus === 'PENDING' ? 'Chưa thanh toán' :
                       order?.orderStatus === 'PAID' ? 'Đã thanh toán' :
                       order?.orderStatus === 'OUT_FOR_DELIVERY' ? 'Đang giao hàng' :
                       order?.orderStatus === 'DELIVERED' ? 'Đã giao hàng' :
                       order?.orderStatus === 'COMPLETED' ? 'Hoàn thành' : order?.orderStatus || 'PENDING';

    const getStatusColor = () => {
        if (order?.orderStatus === 'PENDING') return '#f43f5e'; // Red
        if (order?.orderStatus === 'PAID') return '#10b981'; // Green
        if (order?.orderStatus === 'OUT_FOR_DELIVERY') return '#3b82f6'; // Blue
        return '#10b981'; // Green
    };

    const handleCancelOrder = () => {
        if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${order.id} không?`)) {
            if (jwt && order?.id) {
                dispatch(cancelOrder({ orderId: order.id, jwt }));
            }
        }
    };

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
            <div className='flex items-center space-x-3'>
                <Button
                    variant='outlined'
                    disabled
                    sx={{
                        color: `${getStatusColor()} !important`,
                        borderColor: `${getStatusColor()} !important`,
                        backgroundColor: 'transparent !important',
                        fontWeight: 'bold',
                        borderRadius: '20px',
                        px: 2
                    }}
                >
                    {statusText}
                </Button>
                {isUnpaid && (
                    <Button
                        variant='contained'
                        onClick={handleCancelOrder}
                        sx={{
                            bgcolor: '#dc2626',
                            '&:hover': { bgcolor: '#b91c1c' },
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '20px',
                            px: 2
                        }}
                    >
                        Hủy đơn
                    </Button>
                )}
            </div>
        </Card>
    );
};
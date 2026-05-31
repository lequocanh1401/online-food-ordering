import React, { useState } from 'react';
import { Button, Card, Divider, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { cancelOrder } from '../../State/Order/Action';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export const OrderCard = ({ order }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [openConfirm, setOpenConfirm] = useState(false);

    if (!order) return null;

    const isUnpaid = order.orderStatus === 'PENDING';
    const statusText = order.orderStatus === 'PENDING' ? 'Chờ thanh toán' :
                       order.orderStatus === 'PAID' ? 'Đã thanh toán' :
                       order.orderStatus === 'OUT_FOR_DELIVERY' ? 'Đang giao hàng' :
                       order.orderStatus === 'DELIVERED' ? 'Đã giao hàng' :
                       order.orderStatus === 'COMPLETED' ? 'Hoàn thành' : order.orderStatus || 'PENDING';

    const getStatusColor = () => {
        if (order.orderStatus === 'PENDING') return '#f43f5e'; // Red-pink
        if (order.orderStatus === 'PAID') return '#10b981'; // Green
        if (order.orderStatus === 'OUT_FOR_DELIVERY') return '#3b82f6'; // Blue
        if (order.orderStatus === 'DELIVERED' || order.orderStatus === 'COMPLETED') return '#10b981';
        return '#9ca3af'; // Gray
    };

    const handleCancelClick = () => {
        setOpenConfirm(true);
    };

    const handleConfirmCancel = () => {
        if (jwt && order.id) {
            dispatch(cancelOrder({ orderId: order.id, jwt }));
        }
        setOpenConfirm(false);
    };

    // Tính tạm tính trước giảm giá
    const subtotal = order.items?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;

    return (
        <Card className='p-6 bg-gray-900 text-white border border-gray-800 shadow-xl rounded-xl space-y-4 hover:border-gray-700 transition duration-300'>
            {/* Header đơn hàng */}
            <div className='flex justify-between items-start'>
                <div>
                    <Typography variant='h6' className='font-bold text-gray-200'>
                        Đơn hàng #{order.id}
                    </Typography>
                    <Typography variant='caption' className='text-gray-400 block mt-0.5'>
                        Nhà hàng: <span className='font-semibold text-gray-300'>{order.restaurant?.name || "Hệ thống"}</span>
                    </Typography>
                    <Typography variant='caption' className='text-gray-400 block mt-0.5'>
                        Ngày đặt: {order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN') : 'N/A'}
                    </Typography>
                </div>
                
                <Chip 
                    label={statusText} 
                    sx={{
                        color: 'white',
                        bgcolor: getStatusColor(),
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        borderRadius: '6px'
                    }}
                />
            </div>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />

            {/* Danh sách món ăn trong đơn */}
            <div className='space-y-3'>
                {order.items?.map((item) => (
                    <div key={item.id} className='flex items-center justify-between text-sm text-gray-300'>
                        <div className='flex items-center gap-3'>
                            <img
                                className='h-10 w-10 object-cover rounded'
                                src={item.food?.images?.[0] || "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"}
                                alt={item.food?.name}
                            />
                            <div>
                                <span className='font-medium text-gray-200'>{item.food?.name}</span>
                                <span className='text-gray-500 ml-2'>x{item.quantity}</span>
                            </div>
                        </div>
                        <span className='font-semibold text-gray-400'>{(item.totalPrice)?.toLocaleString()} đ</span>
                    </div>
                ))}
            </div>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />

            {/* Chi tiết thanh toán & mã giảm giá */}
            <div className='space-y-1.5 text-xs text-gray-400 pl-1'>
                <div className='flex justify-between'>
                    <span>Tạm tính:</span>
                    <span>{subtotal.toLocaleString()} đ</span>
                </div>
                
                {order.couponCode && (
                    <div className='flex justify-between text-emerald-400 items-center'>
                        <span className='flex items-center gap-1'>
                            <LocalOfferIcon sx={{ fontSize: 12 }} />
                            Khuyến mãi ({order.couponCode}):
                        </span>
                        <span>-{order.discountAmount?.toLocaleString()} đ</span>
                    </div>
                )}

                <div className='flex justify-between text-sm font-bold text-white pt-1.5'>
                    <span>Tổng thanh toán:</span>
                    <span className='text-pink-500 text-base'>{(order.totalPrice || order.totalAmount)?.toLocaleString()} đ</span>
                </div>
            </div>

            {/* Nút hủy đơn nếu chưa thanh toán */}
            {isUnpaid && (
                <div className='flex justify-end pt-2'>
                    <Button
                        variant='contained'
                        onClick={handleCancelClick}
                        sx={{
                            bgcolor: '#dc2626',
                            '&:hover': { bgcolor: '#b91c1c' },
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            px: 3,
                            fontSize: '0.8rem',
                            textTransform: 'none'
                        }}
                    >
                        Hủy đơn hàng
                    </Button>
                </div>
            )}

            {/* Dialog xác nhận hủy đơn hàng đẹp */}
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                PaperProps={{
                    style: { backgroundColor: '#111827', color: 'white', border: '1px solid #1f2937', borderRadius: '12px' }
                }}
            >
                <DialogTitle className='border-b border-gray-800 text-pink-500 font-bold'>Xác nhận hủy đơn hàng?</DialogTitle>
                <DialogContent className='mt-4'>
                    <DialogContentText style={{ color: '#d1d5db' }}>
                        Bạn có chắc chắn muốn hủy đơn hàng #{order.id} không? Hành động này sẽ xóa đơn và không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='p-4 border-t border-gray-800 gap-2'>
                    <Button onClick={() => setOpenConfirm(false)} style={{ color: '#9ca3af', fontWeight: 'bold' }}>
                        Hủy bỏ
                    </Button>
                    <Button 
                        onClick={handleConfirmCancel} 
                        variant='contained' 
                        sx={{ 
                            bgcolor: '#dc2626', 
                            '&:hover': { bgcolor: '#b91c1c' },
                            fontWeight: 'bold',
                            borderRadius: '8px'
                        }}
                    >
                        Đồng Ý Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};
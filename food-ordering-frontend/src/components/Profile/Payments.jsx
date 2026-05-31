import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders, cancelOrder } from '../../State/Order/Action';
import { Box, Card, Button, Typography, Divider, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { api } from '../../config/api';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const Payments = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const order = useSelector(store => store.order);
    const [loadingOrderId, setLoadingOrderId] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    // Kéo lịch sử đơn hàng về
    useEffect(() => {
        if (jwt) {
            dispatch(getUsersOrders(jwt));
        }
    }, [dispatch, jwt]);

    // Lọc ra các đơn hàng CHƯA THANH TOÁN (PENDING)
    const unpaidOrders = order.orders?.filter(o => o.orderStatus === 'PENDING') || [];

    const handlePayNow = async (orderId) => {
        setLoadingOrderId(orderId);
        try {
            const { data } = await api.post(`/api/order/${orderId}/payment-link`, {}, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            if (data.payment_url) {
                window.location.href = data.payment_url;
            }
        } catch (error) {
            console.error("Lỗi tạo link thanh toán:", error);
        } finally {
            setLoadingOrderId(null);
        }
    };

    const handleCancelClick = (orderId) => {
        setSelectedOrderId(orderId);
        setOpenConfirm(true);
    };

    const handleConfirmCancel = () => {
        if (jwt && selectedOrderId) {
            dispatch(cancelOrder({ orderId: selectedOrderId, jwt }));
        }
        setOpenConfirm(false);
        setSelectedOrderId(null);
    };

    return (
        <div className="pb-10 flex flex-col items-center">
            <h1 className="text-2xl text-center py-7 font-bold text-gray-300 tracking-wider flex items-center gap-2">
                <AccountBalanceWalletIcon className="text-pink-500" />
                HÓA ĐƠN CHỜ THANH TOÁN
            </h1>

            <div className="space-y-5 w-full lg:w-3/5 px-5">
                {unpaidOrders.length > 0 ? (
                    unpaidOrders.map((unpaidOrder) => (
                        <Card key={unpaidOrder.id} className="p-6 bg-gray-900 text-white border border-gray-800 shadow-xl rounded-xl space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <Typography variant="h6" className="font-bold text-gray-200">
                                        Đơn hàng #{unpaidOrder.id}
                                    </Typography>
                                    <Typography variant="caption" className="text-gray-400">
                                        Ngày đặt: {new Date(unpaidOrder.createdAt).toLocaleString('vi-VN')}
                                    </Typography>
                                </div>
                                <Typography className="text-lg font-bold text-pink-500">
                                    {unpaidOrder.totalPrice?.toLocaleString()} đ
                                </Typography>
                            </div>
                            
                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />

                            <div className="space-y-2 text-sm text-gray-300">
                                <p><span className="text-gray-500">Nhà hàng:</span> <span className="font-semibold">{unpaidOrder.restaurant?.name}</span></p>
                                <div>
                                    <span className="text-gray-500">Món ăn:</span>
                                    <div className="pl-4 mt-1 space-y-1">
                                        {unpaidOrder.items?.map((item) => (
                                            <p key={item.id} className="text-gray-400">
                                                - {item.food?.name} x {item.quantity} ({item.totalPrice?.toLocaleString()} đ)
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outlined"
                                    onClick={() => handleCancelClick(unpaidOrder.id)}
                                    sx={{
                                        color: '#ef4444',
                                        borderColor: '#ef4444',
                                        '&:hover': {
                                            borderColor: '#dc2626',
                                            bgcolor: 'rgba(239, 68, 68, 0.08)'
                                        },
                                        fontWeight: 'bold',
                                        borderRadius: 2,
                                        px: 3
                                    }}
                                >
                                    Hủy đơn hàng
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handlePayNow(unpaidOrder.id)}
                                    disabled={loadingOrderId !== null}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 font-bold px-6 py-2"
                                    sx={{ borderRadius: 2 }}
                                >
                                    {loadingOrderId === unpaidOrder.id ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Thanh toán ngay (Stripe)"
                                    )}
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-10 bg-gray-900/40 rounded-xl border border-gray-800/80">
                        <Typography className="text-gray-500 text-lg">
                            Tuyệt vời! Bạn không có hóa đơn nào chờ thanh toán.
                        </Typography>
                    </div>
                )}
            </div>

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
                        Bạn có chắc chắn muốn hủy đơn hàng #{selectedOrderId} không? Hành động này sẽ xóa đơn và không thể hoàn tác.
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
        </div>
    );
};

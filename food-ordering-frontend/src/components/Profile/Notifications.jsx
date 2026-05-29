import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Divider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../../State/Order/Action';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';

export const Notifications = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const order = useSelector(store => store.order);

    // Lưu các id thông báo đã đọc vào LocalStorage để ẩn đi
    const [readIds, setReadIds] = useState(() => {
        try {
            const saved = localStorage.getItem("read_notifications");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Kéo lịch sử đơn hàng mới nhất về
    useEffect(() => {
        if (jwt) {
            dispatch(getUsersOrders(jwt));
        }
    }, [dispatch, jwt]);

    const handleMarkAsRead = (id) => {
        const updated = [...readIds, id];
        setReadIds(updated);
        localStorage.setItem("read_notifications", JSON.stringify(updated));
    };

    // Tạo danh sách thông báo động từ lịch sử đơn hàng
    const notifications = [];

    // Thêm thông báo chào mừng mặc định
    notifications.push({
        id: "system-welcome",
        title: "Chào mừng bạn đến với Online Food Ordering!",
        content: "Cảm ơn bạn đã lựa chọn Online Food Ordering làm người bạn đồng hành ẩm thực. Chúc bạn có những bữa ăn thật ngon miệng và trọn vẹn niềm vui!",
        time: "Hệ thống",
        timestamp: 0,
        type: 'WELCOME'
    });

    if (order.orders && order.orders.length > 0) {
        order.orders.forEach((orderItem) => {
            const formattedTime = new Date(orderItem.createdAt).toLocaleString('vi-VN');
            const orderTimeMs = new Date(orderItem.createdAt).getTime();

            // 1. Thông báo đặt hàng thành công
            notifications.push({
                id: `placed-${orderItem.id}`,
                title: `Đơn hàng #${orderItem.id} đã được đặt`,
                content: `Bạn đã đặt đơn hàng thành công tại nhà hàng "${orderItem.restaurant?.name || 'Nhà hàng'}". Tổng cộng: ${orderItem.totalPrice?.toLocaleString()} đ.`,
                time: formattedTime,
                timestamp: orderTimeMs,
                type: 'PLACED'
            });

            // 2. Thông báo thanh toán thành công (nếu không ở trạng thái PENDING)
            const isPaid = ['PAID', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'].includes(orderItem.orderStatus);
            if (isPaid) {
                notifications.push({
                    id: `paid-${orderItem.id}`,
                    title: `Thanh toán thành công đơn hàng #${orderItem.id}`,
                    content: `Đơn hàng trị giá ${orderItem.totalPrice?.toLocaleString()} đ tại nhà hàng "${orderItem.restaurant?.name || 'Nhà hàng'}" đã được thanh toán thành công qua Stripe.`,
                    time: formattedTime,
                    timestamp: orderTimeMs + 1000,
                    type: 'PAID'
                });
            }

            // 3. Thông báo cập nhật trạng thái đơn hàng (nếu đang đi giao hoặc đã giao/hoàn thành)
            const isUpdated = ['OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'].includes(orderItem.orderStatus);
            if (isUpdated) {
                let statusText = '';
                let title = `Đơn hàng #${orderItem.id} thay đổi trạng thái`;
                if (orderItem.orderStatus === 'OUT_FOR_DELIVERY') {
                    title = `Đơn hàng #${orderItem.id} đang được giao`;
                    statusText = 'Đang giao hàng (Tài xế đang trên đường giao món ăn đến địa chỉ của bạn).';
                } else if (orderItem.orderStatus === 'DELIVERED') {
                    title = `Đơn hàng #${orderItem.id} đã giao thành công`;
                    statusText = 'Đã giao hàng (Món ăn đã được giao đến tay bạn).';
                } else if (orderItem.orderStatus === 'COMPLETED') {
                    title = `Đơn hàng #${orderItem.id} đã hoàn thành`;
                    statusText = 'Hoàn thành (Đơn hàng đã kết thúc thành công).';
                }

                notifications.push({
                    id: `status-${orderItem.id}`,
                    title: title,
                    content: `Đơn hàng tại nhà hàng "${orderItem.restaurant?.name || 'Nhà hàng'}" đã được cập nhật trạng thái mới: ${statusText}`,
                    time: formattedTime,
                    timestamp: orderTimeMs + 2000,
                    type: 'STATUS'
                });
            }
        });
    }

    // Sắp xếp các thông báo mới nhất lên trên đầu
    notifications.sort((a, b) => b.timestamp - a.timestamp);

    // Lọc bỏ những thông báo đã được nhấn Đã đọc
    const visibleNotifications = notifications.filter(notif => !readIds.includes(notif.id));

    const getIcon = (type) => {
        switch (type) {
            case 'PLACED':
                return <ShoppingBagIcon fontSize="small" />;
            case 'PAID':
                return <CheckCircleIcon fontSize="small" />;
            case 'STATUS':
                return <LocalShippingIcon fontSize="small" />;
            default:
                return <InfoIcon fontSize="small" />;
        }
    };

    const getIconColorClass = (type) => {
        switch (type) {
            case 'PLACED':
                return 'bg-blue-500/10 border-blue-500/20 text-blue-500';
            case 'PAID':
                return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500';
            case 'STATUS':
                return 'bg-amber-500/10 border-amber-500/20 text-amber-500';
            default:
                return 'bg-pink-500/10 border-pink-500/20 text-pink-500';
        }
    };

    return (
        <div className="pb-10 flex flex-col items-center">
            <h1 className="text-2xl text-center py-7 font-bold text-gray-300 tracking-wider flex items-center gap-2">
                <NotificationsActiveIcon className="text-pink-500" />
                THÔNG BÁO CỦA BẠN
            </h1>

            <div className="space-y-4 w-full lg:w-3/5 px-5">
                {visibleNotifications.length === 0 ? (
                    <Card className="bg-gray-900 text-white border border-gray-800 shadow-xl rounded-xl">
                        <CardContent className="p-6 text-center text-gray-400">
                            Không có thông báo mới nào.
                        </CardContent>
                    </Card>
                ) : (
                    visibleNotifications.map((notif) => (
                        <Card key={notif.id} className="bg-gray-900 text-white border border-gray-800 shadow-xl rounded-xl hover:border-gray-700 transition-colors">
                            <CardContent className="p-6 space-y-3">
                                <Box className="flex justify-between items-start gap-4">
                                    <Box className="flex items-center gap-3">
                                        <Box className={`${getIconColorClass(notif.type)} p-2 rounded-lg border`}>
                                            {getIcon(notif.type)}
                                        </Box>
                                        <Typography variant="h6" className="font-bold text-gray-200 text-base md:text-lg">
                                            {notif.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" className="text-gray-500 font-medium whitespace-nowrap">
                                        {notif.time}
                                    </Typography>
                                </Box>

                                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />

                                <Box className="flex justify-between items-center gap-4">
                                    <Typography className="text-sm text-gray-400 leading-relaxed pl-1 flex-1">
                                        {notif.content}
                                    </Typography>
                                    <Button 
                                        size="small" 
                                        variant="outlined" 
                                        onClick={() => handleMarkAsRead(notif.id)}
                                        sx={{ 
                                            color: '#f87171', 
                                            borderColor: 'rgba(248, 113, 113, 0.3)', 
                                            textTransform: 'none', 
                                            whiteSpace: 'nowrap',
                                            fontSize: '0.75rem',
                                            py: 0.5,
                                            '&:hover': { 
                                                borderColor: '#f87171', 
                                                bgcolor: 'rgba(248, 113, 113, 0.08)' 
                                            } 
                                        }}
                                    >
                                        Đã đọc
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

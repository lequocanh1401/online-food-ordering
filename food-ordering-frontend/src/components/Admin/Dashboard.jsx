import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid, Card, CardContent, Typography, Box, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, 
    Switch, Chip 
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import KitchenIcon from '@mui/icons-material/Kitchen';
import { updateRestaurantStatus } from '../../State/Restaurant/Action';
import { fetchRestaurantsOrder } from '../../State/RestaurantOrder/Action';
import { getIngredientsOfRestaurant } from '../../State/Ingredients/Action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    
    const { restaurant, restaurantOrder, menu, ingredients } = useSelector(store => store);
    const usersRestaurant = restaurant.usersRestaurant;

    useEffect(() => {
        if (usersRestaurant?.id) {
            dispatch(fetchRestaurantsOrder({
                restaurantId: usersRestaurant.id,
                orderStatus: "",
                jwt: jwt
            }));
            dispatch(getIngredientsOfRestaurant({ 
                id: usersRestaurant.id, 
                jwt 
            }));
            dispatch(getMenuItemsByRestaurantId({
                jwt,
                restaurantId: usersRestaurant.id,
                vegetarian: false,
                nonveg: false,
                seasonal: false,
                foodCategory: ""
            }));
        }
    }, [dispatch, jwt, usersRestaurant?.id]);

    const handleToggleOpenStatus = () => {
        if (usersRestaurant?.id) {
            dispatch(updateRestaurantStatus({ restaurantId: usersRestaurant.id, jwt }));
        }
    };

    if (!usersRestaurant) {
        return (
            <div className="flex items-center justify-center min-h-[80vh] text-gray-400 font-medium">
                Không tìm thấy thông tin nhà hàng...
            </div>
        );
    }

    // Tính toán số liệu thống kê
    const orders = restaurantOrder.orders || [];
    const completedOrders = orders.filter(o => o.orderStatus === "COMPLETED" || o.orderStatus === "DELIVERED");
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const pendingOrdersCount = orders.filter(o => o.orderStatus === "PENDING").length;

    const stats = [
        {
            title: "Doanh Thu (Hoàn thành/Đã giao)",
            value: `${totalRevenue.toLocaleString()} đ`,
            icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
            color: "from-emerald-500 to-green-600",
            subtitle: `Đã thanh toán cho ${completedOrders.length} đơn hàng`
        },
        {
            title: "Tổng Đơn Hàng",
            value: orders.length,
            icon: <ShoppingBagIcon sx={{ fontSize: 40 }} />,
            color: "from-blue-500 to-indigo-600",
            subtitle: `${pendingOrdersCount} đơn đang chờ xử lý`
        },
        {
            title: "Món Ăn Trong Thực Đơn",
            value: menu.menuItems?.length || 0,
            icon: <RestaurantMenuIcon sx={{ fontSize: 40 }} />,
            color: "from-amber-500 to-orange-600",
            subtitle: "Đang phục vụ khách hàng"
        },
        {
            title: "Tổng Số Nguyên Liệu",
            value: ingredients.ingredients?.length || 0,
            icon: <KitchenIcon sx={{ fontSize: 40 }} />,
            color: "from-pink-500 to-rose-600",
            subtitle: "Quản lý trong kho bếp"
        }
    ];

    return (
        <div className="p-6 space-y-6 text-gray-100">
            {/* Header Dashboard */}
            <Card sx={{ bgcolor: '#111827', border: '1px solid #1f2937', borderRadius: 2 }} className="p-6">
                <Box className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <Box>
                        <Typography variant="h4" className="font-bold text-gray-50 flex items-center gap-2">
                            Chào mừng trở lại, <span className="text-pink-500">{usersRestaurant.name}</span>!
                        </Typography>
                        <Typography variant="body2" className="text-gray-400 mt-1">
                            Tổng quan hoạt động kinh doanh của quán ăn hôm nay.
                        </Typography>
                    </Box>
                    <Box className="flex items-center gap-3 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
                        <Typography className="font-semibold text-sm">
                            Trạng thái quán:
                        </Typography>
                        <Chip 
                            label={usersRestaurant.open ? "Đang mở cửa" : "Đang đóng cửa"} 
                            color={usersRestaurant.open ? "success" : "error"} 
                            variant="outlined" 
                            size="small"
                            className="font-bold"
                        />
                        <Switch
                            checked={usersRestaurant.open}
                            onChange={handleToggleOpenStatus}
                            color="success"
                        />
                    </Box>
                </Box>
            </Card>

            {/* Grid 4 thẻ thống kê */}
            <Grid container spacing={3}>
                {stats.map((item, idx) => (
                    <Grid item xs={12} sm={6} lg={3} key={idx}>
                        <Card sx={{ height: '100%', bgcolor: '#111827', border: '1px solid #1f2937', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                            <Box className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${item.color}`} />
                            <CardContent className="p-6">
                                <Box className="flex justify-between items-start">
                                    <Box className="space-y-2">
                                        <Typography variant="body2" className="text-gray-400 font-medium uppercase tracking-wider">{item.title}</Typography>
                                        <Typography variant="h4" className="font-bold text-gray-50">{item.value}</Typography>
                                    </Box>
                                    <Box className="text-gray-400 bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                                        {item.icon}
                                    </Box>
                                </Box>
                                <Typography variant="caption" className="text-gray-400 block mt-4 font-medium">
                                    {item.subtitle}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Bảng đơn hàng gần đây và Tóm tắt món ăn */}
            <Grid container spacing={3}>
                {/* Đơn hàng gần đây */}
                <Grid item xs={12} lg={8}>
                    <Card sx={{ bgcolor: '#111827', border: '1px solid #1f2937', borderRadius: 2 }} className="p-6">
                        <Box className="flex justify-between items-center mb-4">
                            <Typography variant="h6" className="font-bold text-gray-50">Đơn Hàng Gần Đây</Typography>
                            <Typography variant="caption" className="text-gray-400">Hiển thị tối đa 5 đơn mới nhất</Typography>
                        </Box>
                        <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                            <Table sx={{ minWidth: 600 }}>
                                <TableHead>
                                    <TableRow sx={{ '& th': { color: '#9ca3af', borderBottom: '1px solid #374151', fontWeight: 600 } }}>
                                        <TableCell>Mã ĐH</TableCell>
                                        <TableCell>Khách hàng</TableCell>
                                        <TableCell>Món ăn</TableCell>
                                        <TableCell align="right">Tổng tiền</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.slice(0, 5).map((order) => (
                                        <TableRow key={order.id} sx={{ '& td': { color: '#f3f4f6', borderBottom: '1px solid #1f2937' }, '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                                            <TableCell className="font-mono">#{order.id}</TableCell>
                                            <TableCell>{order.customer?.fullName}</TableCell>
                                            <TableCell>
                                                <div className="max-w-[200px] truncate">
                                                    {order.items.map(item => item.food?.name).join(", ")}
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" className="font-semibold">{order.totalPrice.toLocaleString()} đ</TableCell>
                                            <TableCell align="center">
                                                <Chip 
                                                    label={order.orderStatus} 
                                                    size="small" 
                                                    color={
                                                        order.orderStatus === "PENDING" ? "warning" : 
                                                        order.orderStatus === "COMPLETED" || order.orderStatus === "DELIVERED" ? "success" : 
                                                        "info"
                                                    }
                                                    className="font-bold text-xs"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {orders.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center" className="text-gray-500 py-6">
                                                Chưa có đơn hàng nào được ghi nhận.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>

                {/* Món ăn nổi bật / Thực đơn thu nhỏ */}
                <Grid item xs={12} lg={4}>
                    <Card sx={{ bgcolor: '#111827', border: '1px solid #1f2937', borderRadius: 2 }} className="p-6">
                        <Typography variant="h6" className="font-bold text-gray-50 mb-4">Danh sách Món ăn mới</Typography>
                        <Box className="space-y-4">
                            {menu.menuItems?.slice(0, 4).map((food) => (
                                <Box key={food.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-800/40 border border-gray-700/60">
                                    <Box className="flex items-center gap-3">
                                        <Avatar src={food.images[0]} variant="rounded" sx={{ width: 45, height: 45 }} />
                                        <Box>
                                            <Typography className="font-semibold text-sm text-gray-200">{food.name}</Typography>
                                            <Typography variant="caption" className="text-gray-400">{food.price.toLocaleString()}đ</Typography>
                                        </Box>
                                    </Box>
                                    <Chip 
                                        label={food.available ? "Có sẵn" : "Hết món"} 
                                        size="small" 
                                        variant="outlined"
                                        color={food.available ? "success" : "error"}
                                        className="text-xs"
                                    />
                                </Box>
                            ))}
                            {(!menu.menuItems || menu.menuItems.length === 0) && (
                                <Typography className="text-center text-gray-500 py-6 text-sm">Chưa có món ăn trong thực đơn.</Typography>
                            )}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
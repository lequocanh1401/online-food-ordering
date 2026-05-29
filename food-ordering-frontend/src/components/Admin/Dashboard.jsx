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
import { 
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
    CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const COLORS = ['#e91e63', '#ff9800', '#3b82f6', '#8b5cf6', '#06b6d4'];

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

    // 1. Biểu đồ Doanh thu (7 ngày qua)
    const getLast7Days = () => {
        const dates = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            dates.push({
                dateString: d.toISOString().split('T')[0], // YYYY-MM-DD
                label: d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) // DD/MM
            });
        }
        return dates;
    };

    const last7DaysList = getLast7Days();
    const revenueChartData = last7DaysList.map(day => {
        const totalForDay = completedOrders
            .filter(order => {
                if (!order.createdAt) return false;
                const orderDate = new Date(order.createdAt);
                return orderDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) === day.label;
            })
            .reduce((sum, order) => sum + (order.totalPrice || 0), 0);
        
        return {
            name: day.label,
            "Doanh thu": totalForDay
        };
    });

    // 2. Tỷ lệ các món ăn bán chạy nhất (Top 5)
    const dishCounts = {};
    completedOrders.forEach(order => {
        order.items?.forEach(item => {
            if (item.food?.name) {
                const name = item.food.name;
                const qty = item.quantity || 1;
                dishCounts[name] = (dishCounts[name] || 0) + qty;
            }
        });
    });

    const topDishesData = Object.entries(dishCounts)
        .map(([name, count]) => ({ name, value: count }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    // 3. Số lượng đơn hàng thành công / thất bại (Order Status Distribution)
    const successCount = orders.filter(o => o.orderStatus === "COMPLETED" || o.orderStatus === "DELIVERED").length;
    const pendingCount = orders.filter(o => o.orderStatus === "PENDING").length;
    const deliveryCount = orders.filter(o => o.orderStatus === "OUT_FOR_DELIVERY").length;
    const failedCount = orders.filter(o => !["COMPLETED", "DELIVERED", "PENDING", "OUT_FOR_DELIVERY"].includes(o.orderStatus)).length;

    const orderStatusData = [
        { name: "Thành công", value: successCount, color: "#10b981" },
        { name: "Đang chờ duyệt", value: pendingCount, color: "#f59e0b" },
        { name: "Đang giao hàng", value: deliveryCount, color: "#3b82f6" }
    ];
    if (failedCount > 0) {
        orderStatusData.push({ name: "Đã hủy/Thất bại", value: failedCount, color: "#ef4444" });
    }
    const activeStatusData = orderStatusData.filter(d => d.value > 0);

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

            {/* Khu vực Biểu đồ Thống kê */}
            <Grid container spacing={3}>
                {/* 1. Biểu đồ doanh thu 7 ngày gần đây */}
                <Grid item xs={12} lg={6}>
                    <Card sx={{ bgcolor: '#111827', border: '1px solid #1f2937', borderRadius: 2 }} className="p-6">
                        <Typography variant="h6" className="font-bold text-gray-50 mb-4">
                            Biểu Đồ Doanh Thu (7 ngày qua)
                        </Typography>
                        <Box sx={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={revenueChartData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                                    <XAxis 
                                        dataKey="name" 
                                        stroke="#9ca3af"
                                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                                    />
                                    <YAxis 
                                        stroke="#9ca3af"
                                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                                        tickFormatter={(value) => `${(value / 1000).toLocaleString()}k`}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#1f2937', 
                                            borderColor: '#374151', 
                                            color: '#f3f4f6', 
                                            borderRadius: '8px' 
                                        }}
                                        formatter={(value) => [`${value.toLocaleString()} đ`, "Doanh thu"]}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="Doanh thu" 
                                        stroke="#10b981" 
                                        strokeWidth={2}
                                        fillOpacity={1} 
                                        fill="url(#colorRevenue)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Card>
                </Grid>

                {/* 2. Biểu đồ tròn Món ăn bán chạy nhất */}
                <Grid item xs={12} sm={6} lg={3}>
                    <Card sx={{ bgcolor: '#111827', border: '1px solid #1f2937', borderRadius: 2 }} className="p-6 flex flex-col justify-between" style={{ height: '100%' }}>
                        <Box>
                            <Typography variant="h6" className="font-bold text-gray-50 mb-1">
                                Món Ăn Bán Chạy
                            </Typography>
                            <Typography variant="caption" className="text-gray-400 block mb-4">
                                Tỷ lệ 5 món bán nhiều nhất
                            </Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: 220 }} className="flex items-center justify-center relative">
                            {topDishesData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={topDishesData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {topDishesData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1f2937', 
                                                borderColor: '#374151', 
                                                color: '#f3f4f6', 
                                                borderRadius: '8px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value) => [`${value} phần`, "Số lượng"]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <Typography className="text-gray-500 text-sm text-center">Chưa có dữ liệu bán hàng</Typography>
                            )}
                        </Box>
                        {topDishesData.length > 0 && (
                            <Box className="mt-2 space-y-1">
                                {topDishesData.map((item, index) => (
                                    <Box key={item.name} className="flex justify-between items-center text-xs">
                                        <Box className="flex items-center gap-1.5 truncate mr-2">
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length] }} />
                                            <span className="text-gray-300 truncate max-w-[120px]">{item.name}</span>
                                        </Box>
                                        <span className="text-gray-400 font-semibold">{item.value}</span>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Card>
                </Grid>

                {/* 3. Biểu đồ tròn Trạng thái đơn hàng */}
                <Grid item xs={12} sm={6} lg={3}>
                    <Card sx={{ bgcolor: '#111827', border: '1px solid #1f2937', borderRadius: 2 }} className="p-6 flex flex-col justify-between" style={{ height: '100%' }}>
                        <Box>
                            <Typography variant="h6" className="font-bold text-gray-50 mb-1">
                                Trạng Thái Đơn Hàng
                            </Typography>
                            <Typography variant="caption" className="text-gray-400 block mb-4">
                                Cơ cấu phân loại đơn hàng
                            </Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: 220 }} className="flex items-center justify-center relative">
                            {activeStatusData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={activeStatusData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            dataKey="value"
                                            labelLine={false}
                                        >
                                            {activeStatusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1f2937', 
                                                borderColor: '#374151', 
                                                color: '#f3f4f6', 
                                                borderRadius: '8px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value) => [`${value} đơn`, "Số lượng"]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <Typography className="text-gray-500 text-sm text-center">Chưa có đơn hàng nào</Typography>
                            )}
                        </Box>
                        {activeStatusData.length > 0 && (
                            <Box className="mt-2 space-y-1">
                                {activeStatusData.map((item) => (
                                    <Box key={item.name} className="flex justify-between items-center text-xs">
                                        <Box className="flex items-center gap-1.5">
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                                            <span className="text-gray-300">{item.name}</span>
                                        </Box>
                                        <span className="text-gray-400 font-semibold">{item.value}</span>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Card>
                </Grid>
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
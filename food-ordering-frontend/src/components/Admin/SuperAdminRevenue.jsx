import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../../State/Restaurant/Action';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    Button, Typography, Card, Box, Chip, MenuItem, Select, FormControl, InputLabel,
    CircularProgress
} from '@mui/material';
import { 
    MonetizationOn as MonetizationOnIcon, 
    ShoppingBag as ShoppingBagIcon,
    Storefront as StorefrontIcon
} from '@mui/icons-material';
import axios from 'axios';
import { API_URL } from '../../config/api';

export const SuperAdminRevenue = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);

    const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        if (jwt) {
            dispatch(getAllRestaurantsAction(jwt));
        }
    }, [jwt, dispatch]);

    const handleRestaurantChange = (e) => {
        const id = e.target.value;
        setSelectedRestaurantId(id);
        setStatusFilter('ALL');
        if (id) {
            setLoadingOrders(true);
            axios.get(`${API_URL}/api/admin/order/restaurant/${id}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            .then(res => {
                setOrders(res.data || []);
                setLoadingOrders(false);
            })
            .catch(err => {
                console.error("Lỗi tải đơn hàng của nhà hàng:", err);
                setLoadingOrders(false);
            });
        } else {
            setOrders([]);
        }
    };

    // Tìm thông tin nhà hàng đang được chọn từ Redux Store
    const selectedRestaurant = restaurant.restaurants?.find(r => r.id === selectedRestaurantId);

    // Tổng doanh thu toàn sàn
    const totalPlatformRevenue = restaurant.restaurants?.reduce((sum, r) => sum + (r.totalRevenue || 0), 0) || 0;

    // Tính toán số liệu thống kê cho nhà hàng được chọn
    const completedOrders = orders.filter(o => o.orderStatus === "COMPLETED" || o.orderStatus === "DELIVERED");
    const selectedRestaurantRevenue = completedOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const pendingOrdersCount = orders.filter(o => o.orderStatus === "PENDING").length;

    // Lọc đơn hàng hiển thị
    const filteredOrders = orders.filter(o => {
        if (statusFilter === 'ALL') return true;
        return o.orderStatus === statusFilter;
    });

    return (
        <Box className='p-6 space-y-6 text-gray-100'>
            {/* Header Trang */}
            <Box className='flex justify-between items-center mb-6'>
                <Box>
                    <Typography variant='h4' className='font-bold flex items-center gap-2 text-white'>
                        <MonetizationOnIcon fontSize='large' className='text-green-500' />
                        Thống Kê Doanh Thu Hệ Thống
                    </Typography>
                    <Typography variant='body2' className='text-gray-400 mt-1'>
                        Theo dõi tổng doanh số luân chuyển và chi tiết dòng tiền của từng đối tác nhà hàng.
                    </Typography>
                </Box>
                <Card className='p-4 bg-gray-900 border border-gray-800 flex flex-col items-center min-w-[200px] shadow-2xl rounded-xl relative overflow-hidden'>
                    <Box className='absolute top-0 left-0 w-full h-1 bg-green-500' />
                    <Typography variant='h6' className='text-green-400 font-bold'>
                        {totalPlatformRevenue.toLocaleString()} đ
                    </Typography>
                    <Typography variant='caption' className='text-gray-500 font-medium'>
                        Tổng Doanh Thu Toàn Hệ Thống
                    </Typography>
                </Card>
            </Box>

            {/* Dropdown chọn nhà hàng */}
            <Card className='p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-xl'>
                <FormControl fullWidth className='bg-gray-950 border-gray-800 text-white rounded'>
                    <InputLabel id="restaurant-select-label" style={{ color: '#9ca3af' }}>Chọn nhà hàng cần xem doanh thu</InputLabel>
                    <Select
                        labelId="restaurant-select-label"
                        id="restaurant-select"
                        value={selectedRestaurantId}
                        label="Chọn nhà hàng cần xem doanh thu"
                        onChange={handleRestaurantChange}
                        sx={{
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1f2937',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e91e63',
                            },
                            '.MuiSvgIcon-root': {
                                color: '#9ca3af',
                            }
                        }}
                    >
                        <MenuItem value="">
                            <em>-- Vui lòng chọn một nhà hàng --</em>
                        </MenuItem>
                        {restaurant.restaurants && restaurant.restaurants.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name} (ID: {item.id}) - Doanh thu tích lũy: {item.totalRevenue ? item.totalRevenue.toLocaleString() : 0}đ
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Card>

            {/* Hiển thị chi tiết khi đã chọn nhà hàng */}
            {selectedRestaurantId ? (
                <Box className="space-y-6">
                    {loadingOrders ? (
                        <Box className='flex justify-center p-12'>
                            <CircularProgress color="secondary" />
                        </Box>
                    ) : (
                        <Box className="space-y-6">
                            {/* KPI Cards cho nhà hàng được chọn */}
                            <Box className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <Card className='p-6 bg-gray-900 border border-gray-800 flex flex-col justify-between rounded-xl relative overflow-hidden shadow-xl'>
                                    <Box className='absolute top-0 left-0 w-2 h-full bg-emerald-500' />
                                    <Box className='flex justify-between items-start'>
                                        <Box className='space-y-2'>
                                            <Typography variant="caption" className="text-gray-400 font-medium uppercase tracking-wider">Doanh Thu Tích Lũy</Typography>
                                            <Typography variant="h4" className="font-bold text-green-400">
                                                {selectedRestaurantRevenue.toLocaleString()} đ
                                            </Typography>
                                        </Box>
                                        <Box className="text-emerald-500 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                                            <MonetizationOnIcon sx={{ fontSize: 32 }} />
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" className="text-gray-500 block mt-4">
                                        Tính từ {completedOrders.length} đơn hàng đã giao/hoàn thành
                                    </Typography>
                                </Card>

                                <Card className='p-6 bg-gray-900 border border-gray-800 flex flex-col justify-between rounded-xl relative overflow-hidden shadow-xl'>
                                    <Box className='absolute top-0 left-0 w-2 h-full bg-blue-500' />
                                    <Box className='flex justify-between items-start'>
                                        <Box className='space-y-2'>
                                            <Typography variant="caption" className="text-gray-400 font-medium uppercase tracking-wider">Tổng Đơn Hàng</Typography>
                                            <Typography variant="h4" className="font-bold text-blue-400">{orders.length} đơn</Typography>
                                        </Box>
                                        <Box className="text-blue-500 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                            <ShoppingBagIcon sx={{ fontSize: 32 }} />
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" className="text-gray-500 block mt-4">
                                        Gồm tất cả trạng thái đơn hàng của đối tác
                                    </Typography>
                                </Card>

                                <Card className='p-6 bg-gray-900 border border-gray-800 flex flex-col justify-between rounded-xl relative overflow-hidden shadow-xl'>
                                    <Box className='absolute top-0 left-0 w-2 h-full bg-amber-500' />
                                    <Box className='flex justify-between items-start'>
                                        <Box className='space-y-2'>
                                            <Typography variant="caption" className="text-gray-400 font-medium uppercase tracking-wider">Đơn hàng chờ duyệt</Typography>
                                            <Typography variant="h4" className="font-bold text-amber-400">{pendingOrdersCount} đơn</Typography>
                                        </Box>
                                        <Box className="text-amber-500 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                                            <ShoppingBagIcon sx={{ fontSize: 32 }} />
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" className="text-gray-500 block mt-4">
                                        Đang chờ nhà hàng chuẩn bị hoặc xử lý
                                    </Typography>
                                </Card>
                            </Box>

                            {/* Bảng đơn hàng chi tiết */}
                            <Card className='p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-xl'>
                                <Box className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
                                    <Box>
                                        <Typography variant='h6' className='font-bold text-white'>
                                            Chi tiết đơn hàng: <span className='text-pink-500'>{selectedRestaurant?.name}</span>
                                        </Typography>
                                        <Typography variant='caption' className='text-gray-400 mt-1'>
                                            Chủ sở hữu: {selectedRestaurant?.owner?.fullName} ({selectedRestaurant?.owner?.email}) | Loại ẩm thực: {selectedRestaurant?.cuisineType}
                                        </Typography>
                                    </Box>
                                    
                                    <FormControl sx={{ minWidth: 200 }} size="small">
                                        <InputLabel id="status-filter-label" sx={{ color: 'gray.400' }}>Bộ lọc trạng thái</InputLabel>
                                        <Select
                                            labelId="status-filter-label"
                                            id="status-filter"
                                            value={statusFilter}
                                            label="Bộ lọc trạng thái"
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            sx={{
                                                color: 'white',
                                                '.MuiOutlinedInput-notchedOutline': { borderColor: 'gray.700' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'gray.500' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'pink.500' },
                                            }}
                                        >
                                            <MenuItem value="ALL">Tất cả đơn hàng</MenuItem>
                                            <MenuItem value="PENDING">Chờ xử lý (Pending)</MenuItem>
                                            <MenuItem value="PAID">Đã thanh toán (Paid)</MenuItem>
                                            <MenuItem value="OUT_FOR_DELIVERY">Đang giao hàng (Out for delivery)</MenuItem>
                                            <MenuItem value="COMPLETED">Hoàn thành (Completed)</MenuItem>
                                            <MenuItem value="DELIVERED">Đã giao (Delivered)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <TableContainer component={Paper} className='bg-gray-850 border border-gray-800 rounded-lg overflow-hidden shadow-inner'>
                                    <Table sx={{ minWidth: 650 }}>
                                        <TableHead className='bg-gray-950 border-b border-gray-800'>
                                            <TableRow>
                                                <TableCell className='text-gray-400 font-bold'>Mã ĐH</TableCell>
                                                <TableCell className='text-gray-400 font-bold'>Khách hàng</TableCell>
                                                <TableCell className='text-gray-400 font-bold'>Món ăn đã đặt</TableCell>
                                                <TableCell className='text-gray-400 font-bold'>Ngày đặt</TableCell>
                                                <TableCell className='text-gray-400 font-bold text-right'>Giá trị đơn</TableCell>
                                                <TableCell className='text-gray-400 font-bold' align='center'>Trạng thái</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredOrders.length > 0 ? (
                                                filteredOrders.map((row) => (
                                                    <TableRow key={row.id} className='hover:bg-gray-800/30 transition border-b border-gray-800/40'>
                                                        <TableCell className='text-gray-300 font-mono'>#{row.id}</TableCell>
                                                        <TableCell className='text-white font-medium'>
                                                            <div>{row.customer?.fullName}</div>
                                                            <div className='text-xs text-gray-500 font-mono'>{row.customer?.email}</div>
                                                        </TableCell>
                                                        <TableCell className='text-gray-300 max-w-[250px]'>
                                                            <div className="truncate" title={row.items?.map(item => `${item.food?.name} (x${item.quantity})`).join(", ")}>
                                                                {row.items?.map(item => `${item.food?.name} (x${item.quantity})`).join(", ")}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className='text-gray-400 text-xs'>
                                                            {row.createdAt ? new Date(row.createdAt).toLocaleString('vi-VN') : "N/A"}
                                                        </TableCell>
                                                        <TableCell className='text-white font-semibold text-right'>
                                                            {row.totalPrice?.toLocaleString()} đ
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Chip 
                                                                label={row.orderStatus} 
                                                                size="small" 
                                                                color={
                                                                    row.orderStatus === "PENDING" ? "warning" : 
                                                                    row.orderStatus === "COMPLETED" || row.orderStatus === "DELIVERED" ? "success" : 
                                                                    "info"
                                                                }
                                                                className="font-bold text-xs"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} align='center' className='text-gray-500 py-12'>
                                                        Không có đơn hàng nào thuộc trạng thái lọc hiện tại.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>
                    )}
                </Box>
            ) : (
                <Card className='p-12 bg-gray-900 border border-gray-800 text-center rounded-xl shadow-xl'>
                    <StorefrontIcon sx={{ fontSize: 60, color: 'gray.600', mb: 2 }} />
                    <Typography className='text-gray-400 font-medium'>
                        Vui lòng chọn một nhà hàng từ danh mục phía trên để phân tích và xem báo cáo doanh thu chi tiết.
                    </Typography>
                </Card>
            )}
        </Box>
    );
};

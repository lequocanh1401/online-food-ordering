import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../State/RestaurantOrder/Action';

// Các trạng thái chuẩn của hệ thống Zosh
const orderStatuses = [
    { label: "Đang chờ (Pending)", value: "PENDING" },
    { label: "Đã xong (Completed)", value: "COMPLETED" },
    { label: "Đang giao (Out For Delivery)", value: "OUT_FOR_DELIVERY" },
    { label: "Đã nhận (Delivered)", value: "DELIVERED" }
];

export const Orders = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);
    const restaurantOrder = useSelector(store => store.restaurantOrder);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    // Lấy danh sách đơn hàng của Quán này khi vừa vào trang
    useEffect(() => {
        if (jwt && restaurant.usersRestaurant?.id) {
            dispatch(fetchRestaurantsOrder({
                restaurantId: restaurant.usersRestaurant.id,
                orderStatus: "", // Chuỗi rỗng để lấy toàn bộ đơn
                jwt
            }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    // Bật Menu chọn Trạng thái
    const handleUpdateStatusClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrderId(orderId);
    };
    const handleClose = () => setAnchorEl(null);

    // Gửi API cập nhật
    const handleUpdateOrder = (status) => {
        dispatch(updateOrderStatus({ orderId: selectedOrderId, orderStatus: status, jwt }));
        handleClose();
    };

    return (
        <Card className="mt-2 bg-gray-800 text-white px-2">
            <CardHeader title="QUẢN LÝ ĐƠN HÀNG" />
            <TableContainer component={Paper} className="bg-gray-800 text-white">
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mã Đơn</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Khách hàng</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Món ăn</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tổng tiền</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Trạng thái</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cập nhật</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(restaurantOrder.orders) && restaurantOrder.orders.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ color: "gray" }}>{row.id}</TableCell>
                                <TableCell sx={{ color: "gray" }}>{row.customer?.fullName}</TableCell>
                                <TableCell sx={{ color: "gray" }}>
                                    {row.items?.map((item, index) => <p key={index}>- {item.food?.name} (x{item.quantity})</p>)}
                                </TableCell>
                                <TableCell sx={{ color: "gray" }}>{row.totalAmount} đ</TableCell>
                                <TableCell sx={{ color: "gray" }}>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white 
                                        ${row.orderStatus === 'DELIVERED' ? 'bg-green-600' :
                                            row.orderStatus === 'PENDING' ? 'bg-gray-500' : 'bg-yellow-500'}`}>
                                        {row.orderStatus}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={(e) => handleUpdateStatusClick(e, row.id)} sx={{ backgroundColor: "#e91e63" }}>
                                        Trạng thái
                                    </Button>
                                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                        {orderStatuses.map((status) => (
                                            <MenuItem key={status.value} onClick={() => handleUpdateOrder(status.value)}>
                                                {status.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};
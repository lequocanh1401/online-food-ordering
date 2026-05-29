import React, { useEffect, useState } from 'react';
import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, AvatarGroup, Button, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../State/RestaurantOrder/Action'; // Chú ý: Kiểm tra đường dẫn thư mục này trong máy bạn

const orderStatusList = [
    { label: "Pending (Đang chờ)", value: "PENDING" },
    { label: "Completed (Hoàn thành)", value: "COMPLETED" },
    { label: "Out For Delivery (Đang giao)", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered (Đã giao)", value: "DELIVERED" }
];

export const OrderTable = ({ filterValue }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    // Rút kho Redux
    const restaurant = useSelector(store => store.restaurant);
    const restaurantOrder = useSelector(store => store.restaurantOrder); // Tên store này có thể khác tùy file store.js của bạn

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const open = Boolean(anchorEl);

    // Kéo đơn hàng từ Java lên khi vào trang hoặc khi đổi bộ lọc
    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(fetchRestaurantsOrder({
                restaurantId: restaurant.usersRestaurant.id,
                orderStatus: filterValue === "ALL" ? "" : filterValue,
                jwt: jwt
            }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id, filterValue]);

    const handleUpdateStatusClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrderId(orderId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleUpdateOrder = (orderStatus) => {
        // Bắn API cập nhật trạng thái
        dispatch(updateOrderStatus({ orderId: selectedOrderId, orderStatus, jwt }));
        handleCloseMenu();
    };

    return (
        <Box className="mt-5">
            <Card className='mt-1'>
                <CardHeader title={"Tất Cả Đơn Hàng"} sx={{ pt: 2, alignItems: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã ĐH</TableCell>
                                <TableCell align="right">Hình ảnh</TableCell>
                                <TableCell align="right">Khách hàng</TableCell>
                                <TableCell align="right">Giá tiền</TableCell>
                                <TableCell align="right">Món ăn</TableCell>
                                <TableCell align="right">Trạng thái</TableCell>
                                <TableCell align="right">Cập nhật</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantOrder.orders?.map((item) => (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="right">
                                        <AvatarGroup max={4} sx={{ justifyContent: 'flex-end' }}>
                                            {item.items.map((orderItem) => (
                                                <Avatar key={orderItem.id} src={orderItem.food?.images[0]} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell align="right">{item.customer?.fullName}</TableCell>
                                    <TableCell align="right">{item.totalPrice}đ</TableCell>
                                    <TableCell align="right">
                                        {item.items.map((orderItem) => <p key={orderItem.id}>{orderItem.food?.name}</p>)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${item.orderStatus === 'PENDING' ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'}`}>
                                            {item.orderStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button onClick={(e) => handleUpdateStatusClick(e, item.id)}>Cập nhật</Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={open && selectedOrderId === item.id}
                                            onClose={handleCloseMenu}
                                        >
                                            {orderStatusList.map((status) => (
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
        </Box>
    );
};
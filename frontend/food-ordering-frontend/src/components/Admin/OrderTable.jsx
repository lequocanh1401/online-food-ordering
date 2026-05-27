import React, { useState } from 'react';
import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, AvatarGroup, Button, Menu, MenuItem } from '@mui/material';

// Dữ liệu giả để vẽ giao diện (Lát nối API sẽ xóa đi)
const fakeOrders = [1, 2, 3];

const orderStatuses = ["PENDING", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"];

export const OrderTable = () => {
    // Trạng thái mở/đóng menu chọn cập nhật trạng thái đơn hàng
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Tất Cả Đơn Hàng"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Hình ảnh</TableCell>
                                <TableCell>Khách hàng</TableCell>
                                <TableCell>Giá tiền</TableCell>
                                <TableCell>Tên món</TableCell>
                                <TableCell>Thành phần</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Cập nhật</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fakeOrders.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <AvatarGroup max={4} sx={{ justifyContent: 'start' }}>
                                            <Avatar alt="food" src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" />
                                            <Avatar alt="food" src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" />
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell>Lê Quốc Anh</TableCell>
                                    <TableCell>150,000đ</TableCell>
                                    <TableCell>Cơm Sườn Bì Chả</TableCell>
                                    <TableCell>Cơm, Sườn nướng, Chả trứng</TableCell>
                                    <TableCell>PENDING</TableCell>
                                    <TableCell>
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            variant="outlined"
                                        >
                                            Cập nhật
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            {orderStatuses.map((status) => (
                                                <MenuItem key={status} onClick={handleClose}>
                                                    {status}
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
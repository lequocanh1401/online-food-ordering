import React, { useEffect } from 'react';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../State/Menu/Action';

export const MenuTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    // Kéo kho menu ra (Nhớ check xem trong root reducer tên là menu hay menuItem nhé, chuẩn Zosh thường là menu)
    // const { restaurant, menu } = useSelector(store => store);
    const restaurant = useSelector(store => store.restaurant);
    const menu = useSelector(store => store.menu);

    // Kéo danh sách món ăn khi load trang
    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getMenuItemsByRestaurantId({
                jwt,
                restaurantId: restaurant.usersRestaurant.id,
                vegetarian: false,
                nonveg: false,
                seasonal: false,
                foodCategory: ""
            }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const handleDeleteFood = (foodId) => {
        dispatch(deleteFoodAction({ foodId, jwt }));
    };

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    action={
                        // Nút cộng này sẽ chuyển hướng bạn sang trang CreateMenuForm (nếu bạn muốn)
                        <IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                    title={"Thực Đơn (Menu)"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Hình ảnh</TableCell>
                                <TableCell align="right">Tên món</TableCell>
                                <TableCell align="right">Nguyên liệu</TableCell>
                                <TableCell align="right">Giá</TableCell>
                                <TableCell align="right">Tình trạng</TableCell>
                                <TableCell align="right">Xóa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Duyệt mảng menu thật */}
                            {menu.menuItems?.map((item) => (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Avatar src={item.images[0]} alt={item.name} />
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">
                                        {item.ingredients?.map((ing) => ing.name).join(", ")}
                                    </TableCell>
                                    <TableCell align="right">{item.price}đ</TableCell>
                                    <TableCell align="right">{item.available ? "Có sẵn" : "Hết hàng"}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => handleDeleteFood(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
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
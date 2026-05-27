import React, { useEffect } from 'react';
import { Card, CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId, updateMenuItemsAvailability } from '../../State/Menu/Action';

export const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);
    const menu = useSelector(store => store.menu);

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getMenuItemsByRestaurantId({
                jwt,
                restaurantId: restaurant.usersRestaurant.id,
                vegetarian: false, nonveg: false, seasonal: false, foodCategory: ""
            }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const handleDeleteFood = (foodId) => {
        dispatch(deleteFoodAction({ foodId, jwt }));
    };

    return (
        <Card className="mt-2 bg-gray-800 text-white">
            <CardHeader
                title="THỰC ĐƠN MÓN ĂN"
                action={<IconButton onClick={() => navigate("/admin/restaurant/add-menu")} sx={{ backgroundColor: "#e91e63", color: "white" }}><AddIcon /></IconButton>}
            />
            <TableContainer component={Paper} className="bg-gray-800 text-white">
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Ảnh</TableCell>
                            <TableCell sx={{ color: "white" }}>Tên món</TableCell>
                            <TableCell sx={{ color: "white" }}>Danh mục</TableCell>
                            <TableCell sx={{ color: "white" }}>Giá</TableCell>
                            <TableCell sx={{ color: "white" }}>Trạng thái</TableCell>
                            <TableCell sx={{ color: "white" }}>Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(menu.menuItems) && menu.menuItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell><Avatar src={item.images[0]} /></TableCell>
                                <TableCell sx={{ color: "gray" }}>{item.name}</TableCell>
                                <TableCell sx={{ color: "gray" }}>{item.foodCategory?.name}</TableCell>
                                <TableCell sx={{ color: "gray" }}>{item.price} đ</TableCell>
                                <TableCell>
                                    <Button onClick={() => dispatch(updateMenuItemsAvailability({ foodId: item.id, jwt }))} color={item.available ? "success" : "error"}>
                                        {item.available ? "Còn hàng" : "Hết hàng"}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteFood(item.id)} color="error"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};
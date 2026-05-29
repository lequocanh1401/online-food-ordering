import React, { useEffect, useState } from 'react';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { CreateFoodCategoryForm } from './CreateFoodCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../State/Restaurant/Action'; // Cấu hình đường dẫn Action của Zosh

export const FoodCategory = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);

    // Tự động gọi API lấy danh mục món ăn của quán khi tải trang
    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantsCategory({
                restaurantId: restaurant.usersRestaurant?.id,
                jwt
            }));
        }
    }, [restaurant.usersRestaurant?.id, dispatch, jwt]);

    return (
        <div className='px-2'>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                        action={
                            <IconButton onClick={handleOpen} aria-label="settings">
                                <CreateIcon />
                            </IconButton>
                        }
                        title={"Food Category"}
                        sx={{ pt: 2, alignItems: "center" }}
                    />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Duyệt qua mảng danh mục thật trả về từ Redux Store */}
                                {restaurant.categories?.map((item, index) => (
                                    <TableRow key={item.id || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{item.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box>

            <CreateFoodCategoryForm open={open} handleClose={handleClose} />
        </div>
    );
};
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, getRestaurantsCategory } from '../../State/Restaurant/Action';

const style = {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)', width: 400,
    bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
};

export const Category = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);

    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        if (jwt && restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantsCategory({ jwt, restaurantId: restaurant.usersRestaurant.id }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCategoryName("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: categoryName,
            restaurantId: restaurant.usersRestaurant?.id
        };
        dispatch(createCategoryAction({ reqData: data, jwt }));
        handleClose();
    };

    return (
        <div>
            <Card className="mt-2 bg-gray-800 text-white">
                <CardHeader
                    title="DANH MỤC MÓN ĂN"
                    action={
                        <IconButton onClick={handleOpen} sx={{ backgroundColor: "#e91e63", color: "white", '&:hover': { backgroundColor: "#c2185b" } }}>
                            <AddIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper} className="bg-gray-800 text-white">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tên Danh Mục</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(restaurant.categories) && restaurant.categories.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" sx={{ color: "gray" }}>{row.id}</TableCell>
                                    <TableCell sx={{ color: "gray" }}>{row.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <h2 className="text-xl font-semibold mb-5 text-gray-800 text-center">Tạo Danh Mục Mới</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField label="Tên danh mục (vd: Đồ uống...)" fullWidth variant="outlined" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
                        <Button fullWidth variant="contained" type="submit" sx={{ py: 1.5, backgroundColor: "#e91e63", '&:hover': { backgroundColor: "#c2185b" } }}>
                            Tạo mới
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};
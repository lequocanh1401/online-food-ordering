import React, { useEffect, useState } from 'react';
import { Card, CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, getRestaurantsCategory, deleteCategoryAction, updateCategoryAction } from '../../State/Restaurant/Action';

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
    const [editMode, setEditMode] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);

    useEffect(() => {
        if (jwt && restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantsCategory({ jwt, restaurantId: restaurant.usersRestaurant.id }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCategoryName("");
        setEditMode(false);
        setEditCategoryId(null);
    };

    const handleEditClick = (category) => {
        setEditMode(true);
        setEditCategoryId(category.id);
        setCategoryName(category.name);
        setOpen(true);
    };

    const handleDeleteCategory = (categoryId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
            dispatch(deleteCategoryAction({ categoryId, jwt, restaurantId: restaurant.usersRestaurant?.id }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: categoryName,
            restaurantId: restaurant.usersRestaurant?.id
        };
        if (editMode) {
            dispatch(updateCategoryAction({ categoryId: editCategoryId, data, jwt, restaurantId: restaurant.usersRestaurant?.id }));
        } else {
            dispatch(createCategoryAction({ reqData: data, jwt }));
        }
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
                                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(restaurant.categories) && restaurant.categories.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" sx={{ color: "gray" }}>{row.id}</TableCell>
                                    <TableCell sx={{ color: "gray" }}>{row.name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleEditClick(row)}
                                            sx={{ color: '#60a5fa', mr: 1, '&:hover': { bgcolor: 'rgba(96, 165, 250, 0.1)' } }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleDeleteCategory(row.id)}
                                            sx={{ color: '#f87171', '&:hover': { bgcolor: 'rgba(248, 113, 113, 0.1)' } }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <h2 className="text-xl font-semibold mb-5 text-gray-800 text-center">{editMode ? "Cập Nhật Danh Mục" : "Tạo Danh Mục Mới"}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField label="Tên danh mục (vd: Đồ uống...)" fullWidth variant="outlined" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
                        <Button fullWidth variant="contained" type="submit" sx={{ py: 1.5, backgroundColor: "#e91e63", '&:hover': { backgroundColor: "#c2185b" } }}>
                            {editMode ? "Cập nhật" : "Tạo mới"}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};
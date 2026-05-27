import React, { useEffect, useState } from 'react';
import { Card, CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, createIngredientCategory, getIngredientCategory, getIngredientsOfRestaurant, updateStockOfIngredient } from '../../State/Ingredients/Action';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 };

export const Ingredients = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);
    const ingredients = useSelector(store => store.ingredients);

    const [openIngredient, setOpenIngredient] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);

    const [ingredientData, setIngredientData] = useState({ name: "", categoryId: "" });
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        if (jwt && restaurant.usersRestaurant?.id) {
            dispatch(getIngredientsOfRestaurant({ id: restaurant.usersRestaurant.id, jwt }));
            dispatch(getIngredientCategory({ id: restaurant.usersRestaurant.id, jwt }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const handleCloseIngredient = () => {
        setOpenIngredient(false);
        setIngredientData({ name: "", categoryId: "" });
    };

    const handleCloseCategory = () => {
        setOpenCategory(false);
        setCategoryName("");
    };

    const handleCreateIngredient = (e) => {
        e.preventDefault();

        const data = {
            name: ingredientData.name,
            // Ép kiểu chuẩn xác sang số (Long) để Java không báo lỗi
            categoryId: Number(ingredientData.categoryId),
            restaurantId: restaurant.usersRestaurant?.id
        };

        dispatch(createIngredient({ data, jwt }));
        handleCloseIngredient();
    };

    const handleCreateCategory = (e) => {
        e.preventDefault();
        dispatch(createIngredientCategory({ data: { name: categoryName, restaurantId: restaurant.usersRestaurant?.id }, jwt }));
        handleCloseCategory();
    };

    const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredient({ id, jwt }));
    };

    return (
        <div className="px-2">
            <div className="lg:flex gap-5 space-y-5 lg:space-y-0">
                <div className="lg:w-[65%] w-full">
                    <Card className="bg-gray-800 text-white">
                        <CardHeader title="KHO NGUYÊN LIỆU" action={<IconButton onClick={() => setOpenIngredient(true)} sx={{ backgroundColor: "#e91e63", color: "white" }}><AddIcon /></IconButton>} />
                        <TableContainer component={Paper} sx={{ maxHeight: 500, backgroundColor: '#1f2937' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ backgroundColor: '#1f2937', color: "white", fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ backgroundColor: '#1f2937', color: "white", fontWeight: "bold" }}>Tên</TableCell>
                                        <TableCell sx={{ backgroundColor: '#1f2937', color: "white", fontWeight: "bold" }}>Nhóm</TableCell>
                                        <TableCell sx={{ backgroundColor: '#1f2937', color: "white", fontWeight: "bold" }}>Còn hàng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.isArray(ingredients.ingredients) && [...ingredients.ingredients].reverse().map((row, index) => (
                                        <TableRow key={row.id || `ingredient-${index}`}>
                                            <TableCell sx={{ color: "gray" }}>{row.id}</TableCell>
                                            <TableCell sx={{ color: "gray" }}>{row.name}</TableCell>
                                            <TableCell sx={{ color: "gray" }}>{row.category?.name}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleUpdateStock(row.id)} variant="outlined" color={row.inStoke ? "success" : "error"}>
                                                    {row.inStoke ? "Còn hàng" : "Hết hàng"}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </div>

                <div className="lg:w-[35%] w-full">
                    <Card className="bg-gray-800 text-white">
                        <CardHeader title="NHÓM NGUYÊN LIỆU" action={<IconButton onClick={() => setOpenCategory(true)} sx={{ backgroundColor: "#e91e63", color: "white" }}><AddIcon /></IconButton>} />
                        <TableContainer component={Paper} sx={{ maxHeight: 500, backgroundColor: '#1f2937' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ backgroundColor: '#1f2937', color: "white", fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ backgroundColor: '#1f2937', color: "white", fontWeight: "bold" }}>Tên Nhóm</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.isArray(ingredients.category) && [...ingredients.category].reverse().map((row, index) => (
                                        <TableRow key={row.id || `category-${index}`}>
                                            <TableCell sx={{ color: "gray" }}>{row.id}</TableCell>
                                            <TableCell sx={{ color: "gray" }}>{row.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </div>
            </div>

            <Modal open={openIngredient} onClose={handleCloseIngredient}>
                <Box sx={style}>
                    <h2 className="text-xl font-semibold mb-5 text-center text-gray-800">Thêm Nguyên Liệu</h2>
                    <form onSubmit={handleCreateIngredient} className="space-y-4">
                        <TextField
                            label="Tên (vd: Trân châu đen)" fullWidth variant="outlined" required
                            value={ingredientData.name} onChange={(e) => setIngredientData({ ...ingredientData, name: e.target.value })}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Chọn nhóm nguyên liệu</InputLabel>
                            <Select
                                value={ingredientData.categoryId || ""} label="Chọn nhóm nguyên liệu" required
                                onChange={(e) => setIngredientData({ ...ingredientData, categoryId: e.target.value })}
                            >
                                {Array.isArray(ingredients.category) && ingredients.category.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button fullWidth variant="contained" type="submit" sx={{ backgroundColor: "#e91e63" }}>Tạo mới</Button>
                    </form>
                </Box>
            </Modal>

            <Modal open={openCategory} onClose={handleCloseCategory}>
                <Box sx={style}>
                    <h2 className="text-xl font-semibold mb-5 text-center text-gray-800">Tạo Nhóm Nguyên Liệu</h2>
                    <form onSubmit={handleCreateCategory} className="space-y-4">
                        <TextField
                            label="Tên (vd: Topping...)" fullWidth variant="outlined" required
                            value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <Button fullWidth variant="contained" type="submit" sx={{ backgroundColor: "#e91e63" }}>Tạo mới</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};
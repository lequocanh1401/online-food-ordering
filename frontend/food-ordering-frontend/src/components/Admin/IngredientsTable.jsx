import React, { useState } from 'react';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { CreateIngredientForm } from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateStockOfIngredient } from '../../State/Ingredients/Action';

export const IngredientsTable = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { ingredients } = useSelector(store => store);

    // Bắn API chuyển đổi trạng thái Còn hàng <-> Hết hàng
    const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredient({ id, jwt }));
    };

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader action={<IconButton onClick={handleOpen}><CreateIcon /></IconButton>} title={"Ingredients"} sx={{ pt: 2, alignItems: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Tên nguyên liệu</TableCell>
                                <TableCell align="right">Thuộc Danh mục</TableCell>
                                <TableCell align="right">Trạng thái (Bấm để đổi)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Đổ list nguyên liệu thật ra */}
                            {ingredients.ingredients?.map((item) => (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.category?.name}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleUpdateStock(item.id)} color={item.inStoke ? "success" : "error"}>
                                            {item.inStoke ? "In Stock" : "Out of Stock"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <CreateIngredientForm open={open} handleClose={handleClose} />
        </Box>
    );
};
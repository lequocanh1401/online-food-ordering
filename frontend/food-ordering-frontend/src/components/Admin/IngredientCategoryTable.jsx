import React, { useState } from 'react';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { CreateIngredientCategoryForm } from './CreateIngredientCategoryForm';
import { useSelector } from 'react-redux';

export const IngredientCategoryTable = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Rút kho chứa nguyên liệu ra để hiển thị
    const { ingredients } = useSelector(store => store);

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader action={<IconButton onClick={handleOpen}><CreateIcon /></IconButton>} title={"Ingredient Category"} sx={{ pt: 2, alignItems: "center" }} />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Duyệt qua mảng danh mục thật từ Java */}
                            {ingredients.category?.map((item) => (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <CreateIngredientCategoryForm open={open} handleClose={handleClose} />
        </Box>
    );
};
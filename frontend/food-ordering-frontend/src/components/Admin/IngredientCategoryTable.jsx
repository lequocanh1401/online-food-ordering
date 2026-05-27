import React, { useState } from 'react';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { CreateIngredientCategoryForm } from './CreateIngredientCategoryForm';

const category = [1, 1, 1]; // Dữ liệu giả

export const IngredientCategoryTable = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                            {category.map((row, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="left">{"Vegetable"}</TableCell>
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
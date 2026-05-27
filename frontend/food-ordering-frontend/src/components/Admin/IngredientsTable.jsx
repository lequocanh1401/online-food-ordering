import React, { useState } from 'react';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { CreateIngredientForm } from './CreateIngredientForm';

const orders = [1, 1, 1]; // Dữ liệu giả

export const IngredientsTable = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader action={<IconButton onClick={handleOpen}><CreateIcon /></IconButton>} title={"Ingredients"} sx={{ pt: 2, alignItems: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Availability</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="right">{"Tomato"}</TableCell>
                                    <TableCell align="right">{"Vegetable"}</TableCell>
                                    <TableCell align="right">{"In Stock"}</TableCell>
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
import React, { useState } from 'react';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { CreateFoodCategoryForm } from './CreateFoodCategoryForm'; // Import cái popup vào

const categories = [1, 1, 1]; // Dữ liệu giả

export const FoodCategory = () => {
    // State để quản lý việc ẩn/hiện popup
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='px-2'>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                        action={
                            // Bấm vào nút này sẽ gọi hàm handleOpen để bật Popup
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
                                {categories.map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{"Món Chính"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box>

            {/* Nhúng cái Popup vào đây, truyền biến open và hàm handleClose xuống cho nó */}
            <CreateFoodCategoryForm open={open} handleClose={handleClose} />
        </div>
    );
};
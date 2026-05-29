import React, { useState } from 'react';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { CreateIngredientForm } from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateStockOfIngredient, deleteIngredientAction, updateIngredientAction } from '../../State/Ingredients/Action';

export const IngredientsTable = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);
    const { ingredients } = useSelector(store => store);

    const [editOpen, setEditOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editName, setEditName] = useState("");
    const [editCategoryId, setEditCategoryId] = useState("");

    // Custom confirm delete modal states
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteIngredientId, setDeleteIngredientId] = useState(null);

    const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredient({ id, jwt }));
    };

    const handleEditClick = (item) => {
        setEditItem(item);
        setEditName(item.name);
        setEditCategoryId(item.category?.id || "");
        setEditOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteIngredientId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteIngredientId) {
            dispatch(deleteIngredientAction({ id: deleteIngredientId, jwt, restaurantId: restaurant.usersRestaurant?.id }));
        }
        setConfirmOpen(false);
        setDeleteIngredientId(null);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: editName,
            categoryId: editCategoryId,
            restaurantId: restaurant.usersRestaurant?.id
        };
        dispatch(updateIngredientAction({ id: editItem.id, data, jwt, restaurantId: restaurant.usersRestaurant?.id }));
        setEditOpen(false);
        setEditItem(null);
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
                                <TableCell align="right">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
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
                                    <TableCell align="right">
                                        <Box className="flex justify-end gap-1">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleEditClick(item)}
                                                sx={{ color: '#60a5fa', '&:hover': { bgcolor: 'rgba(96, 165, 250, 0.1)' } }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleDeleteClick(item.id)}
                                                sx={{ color: '#f87171', '&:hover': { bgcolor: 'rgba(248, 113, 113, 0.1)' } }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <CreateIngredientForm open={open} handleClose={handleClose} />

            <Modal open={editOpen} onClose={() => setEditOpen(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', outline: 'none', boxShadow: 24, p: 4, borderRadius: '8px' }}>
                    <form onSubmit={handleEditSubmit}>
                        <h1 className='text-gray-800 font-bold text-center text-xl pb-6'>CẬP NHẬT NGUYÊN LIỆU</h1>
                        <TextField fullWidth label="Tên nguyên liệu" variant="outlined" value={editName} onChange={(e) => setEditName(e.target.value)} sx={{ mb: 3 }} required />
                        <FormControl fullWidth>
                            <InputLabel id="edit-category-label">Danh mục</InputLabel>
                            <Select labelId="edit-category-label" value={editCategoryId} label="Danh mục" onChange={(e) => setEditCategoryId(e.target.value)} required>
                                {ingredients.category?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }} fullWidth size='large'>Cập nhật</Button>
                    </form>
                </Box>
            </Modal>

            {/* Custom confirm delete Dialog */}
            <Dialog 
                open={confirmOpen} 
                onClose={() => setConfirmOpen(false)}
                PaperProps={{
                    sx: {
                        bgcolor: '#1f2937',
                        color: 'white',
                        borderRadius: '12px',
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold' }}>
                    <WarningIcon sx={{ color: '#f87171' }} />
                    Xác Nhận Xóa Nguyên Liệu
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#d1d5db' }}>
                        Bạn có chắc chắn muốn xóa nguyên liệu này không? Các công thức chứa nguyên liệu này sẽ bị ảnh hưởng.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button 
                        onClick={() => setConfirmOpen(false)} 
                        sx={{ color: '#9ca3af', '&:hover': { bgcolor: 'rgba(156, 163, 175, 0.1)' } }}
                    >
                        Hủy bỏ
                    </Button>
                    <Button 
                        onClick={handleConfirmDelete} 
                        variant="contained" 
                        color="error"
                        sx={{ borderRadius: '6px', fontWeight: 'bold' }}
                    >
                        Xác nhận xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
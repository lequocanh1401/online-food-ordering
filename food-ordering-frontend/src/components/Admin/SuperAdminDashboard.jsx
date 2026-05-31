import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../../State/Restaurant/Action';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, Chip, Typography, Card, Box 
} from '@mui/material';
import { Delete as DeleteIcon, Storefront as StorefrontIcon } from '@mui/icons-material';
import axios from 'axios';
import { API_URL } from '../../config/api';

export const SuperAdminDashboard = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (jwt) {
            dispatch(getAllRestaurantsAction(jwt));
        }
    }, [jwt, dispatch]);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setOpenConfirm(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}/api/admin/restaurants/${selectedId}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            // Refresh list
            dispatch(getAllRestaurantsAction(jwt));
            setOpenConfirm(false);
            setSelectedId(null);
        } catch (error) {
            console.error("Lỗi khi xóa nhà hàng:", error);
            alert("Không thể xóa nhà hàng: " + (error.response?.data?.message || error.message));
            setOpenConfirm(false);
        }
    };

    return (
        <Box className='p-6'>
            <Box className='flex justify-between items-center mb-6'>
                <Box>
                    <Typography variant='h4' className='font-bold flex items-center gap-2 text-white'>
                        <StorefrontIcon fontSize='large' className='text-pink-500' />
                        Quản Lý Nhà Hàng Toàn Sàn
                    </Typography>
                    <Typography variant='body2' className='text-gray-400 mt-1'>
                        Danh sách tất cả các đối tác nhà hàng đã đăng ký trên hệ thống.
                    </Typography>
                </Box>
                <Card className='p-4 bg-gray-800 border border-gray-700 flex flex-col items-center min-w-[150px]'>
                    <Typography variant='h6' className='text-pink-500 font-bold'>
                        {restaurant.restaurants?.length || 0}
                    </Typography>
                    <Typography variant='caption' className='text-gray-400'>
                        Tổng số nhà hàng
                    </Typography>
                </Card>
            </Box>

            <TableContainer component={Paper} className='bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden'>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead className='bg-gray-900 border-b border-gray-700'>
                        <TableRow>
                            <TableCell className='text-gray-300 font-bold'>ID</TableCell>
                            <TableCell className='text-gray-300 font-bold'>Tên nhà hàng</TableCell>
                            <TableCell className='text-gray-300 font-bold'>Chủ sở hữu</TableCell>
                            <TableCell className='text-gray-300 font-bold'>Email liên hệ</TableCell>
                            <TableCell className='text-gray-300 font-bold'>Loại ẩm thực</TableCell>
                            <TableCell className='text-gray-300 font-bold'>Địa chỉ</TableCell>
                            <TableCell className='text-gray-300 font-bold'>Trạng thái</TableCell>
                            <TableCell align='right' className='text-gray-300 font-bold'>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurant.restaurants && restaurant.restaurants.length > 0 ? (
                            restaurant.restaurants.map((row) => (
                                <TableRow key={row.id} className='hover:bg-gray-700/30 transition border-b border-gray-700/50'>
                                    <TableCell className='text-gray-300'>{row.id}</TableCell>
                                    <TableCell className='text-white font-medium'>{row.name}</TableCell>
                                    <TableCell className='text-gray-300'>{row.owner?.fullName || "N/A"}</TableCell>
                                    <TableCell className='text-gray-300'>{row.owner?.email || "N/A"}</TableCell>
                                    <TableCell className='text-gray-300'>{row.cuisineType}</TableCell>
                                    <TableCell className='text-gray-400 max-w-[200px] truncate'>
                                        {row.address ? `${row.address.streetAddress}, ${row.address.city}` : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={row.open ? "Mở Cửa" : "Đóng Cửa"} 
                                            color={row.open ? "success" : "error"} 
                                            size="small" 
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align='right'>
                                        <IconButton 
                                            onClick={() => handleDeleteClick(row.id)}
                                            className='text-red-500 hover:bg-red-500/10'
                                            title='Xóa nhà hàng'
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align='center' className='text-gray-500 p-8'>
                                    Chưa có nhà hàng nào được tạo hoặc đăng ký trên sàn.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog xác nhận xóa */}
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                PaperProps={{
                    style: { backgroundColor: '#1f2937', color: 'white' }
                }}
            >
                <DialogTitle className='border-b border-gray-700'>Xác nhận xóa nhà hàng?</DialogTitle>
                <DialogContent className='mt-4'>
                    <DialogContentText style={{ color: '#d1d5db' }}>
                        Hành động này sẽ xóa hoàn toàn nhà hàng khỏi hệ thống và không thể hoàn tác. Bạn có chắc chắn muốn xóa không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='p-4 border-t border-gray-700'>
                    <Button onClick={() => setOpenConfirm(false)} style={{ color: '#9ca3af' }}>
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmDelete} variant='contained' color='error'>
                        Xác Nhận Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

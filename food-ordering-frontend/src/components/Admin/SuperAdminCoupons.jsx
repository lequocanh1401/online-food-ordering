import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../../State/Restaurant/Action';
import { 
    Box, Typography, Card, TextField, MenuItem, Button, Table, 
    TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    IconButton, FormControl, InputLabel, Select, Chip, Grid, Dialog, 
    DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, 
    Alert 
} from '@mui/material';
import { Delete as DeleteIcon, LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import axios from 'axios';
import { API_URL } from '../../config/api';

export const SuperAdminCoupons = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);
    const [coupons, setCoupons] = useState([]);
    
    // Form states
    const [code, setCode] = useState("");
    const [discountType, setDiscountType] = useState("PERCENTAGE");
    const [discountValue, setDiscountValue] = useState("");
    const [minimumOrderValue, setMinimumOrderValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);

    // Snackbar states
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const showSnackbar = (message, severity = "success") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const fetchCoupons = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/coupons`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            setCoupons(data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách coupons:", error);
        }
    };

    useEffect(() => {
        if (jwt) {
            dispatch(getAllRestaurantsAction(jwt));
            fetchCoupons();
        }
    }, [jwt, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code || !discountValue) {
            showSnackbar("Vui lòng điền đầy đủ mã và giá trị giảm giá.", "error");
            return;
        }

        setLoading(true);
        try {
            const couponData = {
                code: code.trim().toUpperCase(),
                discountType,
                discountValue: parseInt(discountValue),
                minimumOrderValue: minimumOrderValue ? parseInt(minimumOrderValue) : 0,
                active: true
            };

            await axios.post(`${API_URL}/api/admin/coupons/global`, couponData, {
                headers: { Authorization: `Bearer ${jwt}` }
            });

            showSnackbar("Tạo mã giảm giá toàn sàn thành công!", "success");
            // Reset form
            setCode("");
            setDiscountValue("");
            setMinimumOrderValue("");
            fetchCoupons();
        } catch (error) {
            console.error("Lỗi khi tạo coupon:", error);
            showSnackbar("Tạo mã thất bại: " + (error.response?.data || error.message), "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setSelectedCouponId(id);
        setOpenConfirm(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}/api/admin/coupons/${selectedCouponId}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            showSnackbar("Xóa mã giảm giá thành công!", "success");
            fetchCoupons();
            setOpenConfirm(false);
            setSelectedCouponId(null);
        } catch (error) {
            console.error("Lỗi khi xóa coupon:", error);
            showSnackbar("Xóa thất bại: " + (error.response?.data || error.message), "error");
            setOpenConfirm(false);
        }
    };

    return (
        <Box className='p-6'>
            <Box className='mb-6'>
                <Typography variant='h4' className='font-bold flex items-center gap-2 text-white'>
                    <LocalOfferIcon fontSize='large' className='text-pink-500' />
                    Quản Lý Mã Giảm Giá (Coupons)
                </Typography>
                <Typography variant='body2' className='text-gray-400 mt-1'>
                    Tạo và quản lý các mã giảm giá áp dụng toàn hệ thống hoặc riêng biệt cho từng nhà hàng.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Form tạo mã */}
                <Grid item xs={12} md={4}>
                    <Card className='p-6 bg-gray-800 border border-gray-700'>
                        <Typography variant='h6' className='font-semibold mb-4 text-white'>
                            Tạo mã giảm giá mới
                        </Typography>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <TextField
                                fullWidth
                                label="Mã giảm giá (Ví dụ: COCA50)"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                variant="outlined"
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#9ca3af' } }}
                                sx={{
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e91e63' },
                                }}
                            />

                            <FormControl fullWidth>
                                <InputLabel style={{ color: '#9ca3af' }}>Loại giảm giá</InputLabel>
                                <Select
                                    value={discountType}
                                    onChange={(e) => setDiscountType(e.target.value)}
                                    label="Loại giảm giá"
                                    sx={{
                                        color: 'white',
                                        '.MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
                                        '.MuiSvgIcon-root': { color: '#9ca3af' }
                                    }}
                                >
                                    <MenuItem value="PERCENTAGE">Phần trăm (%)</MenuItem>
                                    <MenuItem value="FLAT">Số tiền trực tiếp (đ)</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label={discountType === "PERCENTAGE" ? "Giá trị giảm (%)" : "Giá trị giảm (VND)"}
                                type="number"
                                value={discountValue}
                                onChange={(e) => setDiscountValue(e.target.value)}
                                variant="outlined"
                                inputProps={{ style: { color: 'white' }, min: 1 }}
                                InputLabelProps={{ style: { color: '#9ca3af' } }}
                                sx={{
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e91e63' },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Đơn hàng tối thiểu (VND)"
                                type="number"
                                value={minimumOrderValue}
                                onChange={(e) => setMinimumOrderValue(e.target.value)}
                                variant="outlined"
                                inputProps={{ style: { color: 'white' }, min: 0 }}
                                InputLabelProps={{ style: { color: '#9ca3af' } }}
                                sx={{
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e91e63' },
                                }}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={loading}
                                className='bg-pink-600 hover:bg-pink-700 py-3 font-semibold text-white'
                            >
                                {loading ? "Đang xử lý..." : "Tạo Mã Khuyến Mãi"}
                            </Button>
                        </form>
                    </Card>
                </Grid>

                {/* Danh sách mã hiện có */}
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper} className='bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden'>
                        <Table sx={{ minWidth: 600 }}>
                            <TableHead className='bg-gray-900 border-b border-gray-700'>
                                <TableRow>
                                    <TableCell className='text-gray-300 font-bold'>ID</TableCell>
                                    <TableCell className='text-gray-300 font-bold'>Mã Code</TableCell>
                                    <TableCell className='text-gray-300 font-bold'>Loại</TableCell>
                                    <TableCell className='text-gray-300 font-bold'>Giá trị giảm</TableCell>
                                    <TableCell className='text-gray-300 font-bold'>Đơn tối thiểu</TableCell>
                                    <TableCell className='text-gray-300 font-bold'>Phạm vi áp dụng</TableCell>
                                    <TableCell className='text-gray-300 font-bold'>Trạng thái</TableCell>
                                    <TableCell align='right' className='text-gray-300 font-bold'>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {coupons.length > 0 ? (
                                    coupons.map((row) => (
                                        <TableRow key={row.id} className='hover:bg-gray-700/30 transition border-b border-gray-700/50'>
                                            <TableCell className='text-gray-300'>{row.id}</TableCell>
                                            <TableCell className='text-white font-bold'>{row.code}</TableCell>
                                            <TableCell className='text-gray-300'>
                                                {row.discountType === "PERCENTAGE" ? "Phần trăm" : "Trực tiếp"}
                                            </TableCell>
                                            <TableCell className='text-gray-300'>
                                                {row.discountType === "PERCENTAGE" 
                                                    ? `${row.discountValue}%` 
                                                    : `${row.discountValue?.toLocaleString()} đ`}
                                            </TableCell>
                                            <TableCell className='text-gray-300'>
                                                {row.minimumOrderValue ? `${row.minimumOrderValue.toLocaleString()} đ` : "0 đ"}
                                            </TableCell>
                                            <TableCell className='text-gray-300'>
                                                {row.restaurant ? (
                                                    <Chip 
                                                        label={row.restaurant.name} 
                                                        size="small" 
                                                        variant="outlined"
                                                        className='text-blue-400 border-blue-400/35'
                                                    />
                                                ) : (
                                                    <Chip 
                                                        label="Toàn sàn" 
                                                        color="secondary" 
                                                        size="small" 
                                                        variant="filled"
                                                        className='bg-pink-600'
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={row.active ? "Đang chạy" : "Tạm dừng"} 
                                                    color={row.active ? "success" : "default"} 
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align='right'>
                                                <IconButton 
                                                    onClick={() => handleDelete(row.id)}
                                                    className='text-red-500 hover:bg-red-500/10'
                                                    title='Xóa mã giảm giá'
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} align='center' className='text-gray-500 p-8'>
                                            Chưa có mã giảm giá nào được tạo.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {/* Dialog xác nhận xóa coupon */}
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                PaperProps={{
                    style: { backgroundColor: '#1f2937', color: 'white' }
                }}
            >
                <DialogTitle className='border-b border-gray-700'>Xác nhận xóa mã giảm giá?</DialogTitle>
                <DialogContent className='mt-4'>
                    <DialogContentText style={{ color: '#d1d5db' }}>
                        Bạn có chắc chắn muốn xóa mã giảm giá này không? Hành động này không thể hoàn tác.
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
            {/* Snackbar thông báo đẹp */}
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={4000} 
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={() => setSnackbarOpen(false)} 
                    severity={snackbarSeverity} 
                    sx={{ 
                        width: '100%', 
                        bgcolor: snackbarSeverity === 'success' ? '#1b5e20' : '#c62828', 
                        color: 'white',
                        '& .MuiAlert-icon': {
                            color: 'white'
                        }
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Box, Divider, TextField, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { addUserAddress, deleteUserAddress, updateUserAddress } from '../../State/Authentication/Action';

export const Address = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    
    // Rút thông tin user từ Redux store
    const auth = useSelector(store => store.auth);
    const addresses = auth.user?.addresses || [];

    // State cho chế độ sửa địa chỉ
    const [editAddressId, setEditAddressId] = useState(null);

    // State cho Form nhập địa chỉ
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: 'Vietnam'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditClick = (addr) => {
        setEditAddressId(addr.id);
        setFormData({
            streetAddress: addr.streetAddress || '',
            city: addr.city || '',
            stateProvince: addr.stateProvince || '',
            postalCode: addr.postalCode || '',
            country: addr.country || 'Vietnam'
        });
    };

    const handleDeleteClick = (addressId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
            if (jwt && addressId) {
                dispatch(deleteUserAddress({ jwt, addressId }));
                if (editAddressId === addressId) {
                    handleCancelEdit();
                }
            }
        }
    };

    const handleCancelEdit = () => {
        setEditAddressId(null);
        setFormData({
            streetAddress: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            country: 'Vietnam'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (jwt) {
            if (editAddressId) {
                dispatch(updateUserAddress({ jwt, addressId: editAddressId, addressData: formData }));
                setEditAddressId(null);
            } else {
                dispatch(addUserAddress({ jwt, addressData: formData }));
            }
            // Reset form sau khi thực hiện xong
            setFormData({
                streetAddress: '',
                city: '',
                stateProvince: '',
                postalCode: '',
                country: 'Vietnam'
            });
        }
    };

    return (
        <div className="pb-10 px-5 flex flex-col items-center">
            <h1 className="text-2xl text-center py-7 font-bold text-gray-300 tracking-wider flex items-center gap-2">
                <HomeIcon className="text-pink-500" />
                ĐỊA CHỈ NHẬN HÀNG
            </h1>

            <div className="w-full lg:w-4/5 flex flex-col lg:flex-row gap-8">
                {/* CỘT TRÁI: DANH SÁCH ĐỊA CHỈ ĐÃ LƯU */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-400 mb-4 flex items-center gap-2">
                        <RoomIcon className="text-emerald-500" />
                        Địa chỉ đã lưu ({addresses.length})
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.length > 0 ? (
                            addresses.map((addr, index) => (
                                <Card key={addr.id || index} className="bg-gray-900 text-white border border-gray-800 shadow-xl rounded-xl hover:border-gray-700 transition-colors">
                                    <CardContent className="p-5 space-y-3">
                                        <Box className="flex justify-between items-center">
                                            <Box className="flex items-center gap-2">
                                                <div className="bg-pink-500/10 p-1.5 rounded text-pink-500">
                                                    <RoomIcon fontSize="small" />
                                                </div>
                                                <Typography variant="subtitle2" className="font-bold text-gray-200">
                                                    Địa chỉ #{index + 1}
                                                </Typography>
                                            </Box>
                                            <Box className="flex gap-1">
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleEditClick(addr)}
                                                    sx={{ color: '#60a5fa', '&:hover': { bgcolor: 'rgba(96, 165, 250, 0.1)' } }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleDeleteClick(addr.id)}
                                                    sx={{ color: '#f87171', '&:hover': { bgcolor: 'rgba(248, 113, 113, 0.1)' } }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                                        <div className="space-y-1 text-xs text-gray-400">
                                            <p><span className="text-gray-500">Đường:</span> <span className="text-gray-200 font-medium">{addr.streetAddress}</span></p>
                                            <p><span className="text-gray-500">Quận/Huyện:</span> <span className="text-gray-200 font-medium">{addr.stateProvince || addr.state || "N/A"}</span></p>
                                            <p><span className="text-gray-500">Thành phố:</span> <span className="text-gray-200 font-medium">{addr.city}</span></p>
                                            <p><span className="text-gray-500">Mã bưu điện:</span> <span className="text-gray-200 font-medium">{addr.postalCode}</span></p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 bg-gray-900/40 rounded-xl border border-gray-800/80">
                                <Typography className="text-gray-500 text-sm">
                                    Bạn chưa lưu địa chỉ nào. Hãy nhập thông tin bên phải để tạo địa chỉ giao hàng đầu tiên!
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>

                {/* CỘT PHẢI: FORM THÊM HOẶC SỬA ĐỊA CHỈ */}
                <div className="w-full lg:w-[22rem]">
                    <Card className="bg-gray-900 text-white border border-gray-800 shadow-xl rounded-xl">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-300 flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <AddLocationAltIcon className="text-pink-500" />
                                    {editAddressId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
                                </span>
                                {editAddressId && (
                                    <IconButton size="small" onClick={handleCancelEdit} sx={{ color: 'gray' }}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </h2>
                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Số nhà, tên đường"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Quận / Huyện"
                                    name="stateProvince"
                                    value={formData.stateProvince}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Thành phố"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Mã bưu điện"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                                
                                <div className="flex gap-2">
                                    {editAddressId && (
                                        <Button
                                            fullWidth
                                            onClick={handleCancelEdit}
                                            variant="outlined"
                                            color="inherit"
                                            sx={{ borderRadius: 2 }}
                                        >
                                            Hủy
                                        </Button>
                                    )}
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        className="bg-pink-600 hover:bg-pink-700 font-bold py-2"
                                        sx={{ borderRadius: 2, bgcolor: "#e91e63", "&:hover": { bgcolor: "#c2185b" } }}
                                    >
                                        {editAddressId ? "Cập nhật" : "Lưu địa chỉ"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};


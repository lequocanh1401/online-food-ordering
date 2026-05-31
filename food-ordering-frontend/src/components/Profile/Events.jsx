import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Tabs, Tab, Divider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsAction } from '../../State/Restaurant/Action'; // Hoặc đường dẫn chứa action lấy sự kiện của bạn
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import { API_URL } from '../../config/api';

export const Events = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();

    // Lấy dữ liệu từ store restaurant giống như bên trang Admin
    const restaurant = useSelector(store => store.restaurant);

    // Tab control ("events" hoặc "coupons")
    const [tabValue, setTabValue] = useState("events");

    // Local Coupon management states cho khách hàng
    const [coupons, setCoupons] = useState([]);
    const [copiedCode, setCopiedCode] = useState("");

    // Tự động kéo toàn bộ sự kiện trên hệ thống về khi khách mở tab
    useEffect(() => {
        if (jwt) {
            dispatch(getAllEventsAction({ jwt }));
        }
    }, [dispatch, jwt]);

    // Lấy danh sách mã giảm giá từ backend
    const fetchCoupons = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/coupons`, {
                headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
            });
            setCoupons(data);
        } catch (err) {
            console.error("Lỗi lấy danh sách mã giảm giá:", err);
        }
    };

    useEffect(() => {
        if (tabValue === "coupons") {
            fetchCoupons();
        }
    }, [tabValue, jwt]);

    const handleNavigateToRestaurant = (eventItem) => {
        if (eventItem.restaurant?.id) {
            const city = eventItem.restaurant.address?.city || "vietnam";
            const name = eventItem.restaurant.name || "restaurant";
            const id = eventItem.restaurant.id;
            navigate(`/restaurant/${city}/${name}/${id}`);
        }
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(""), 2000);
    };

    return (
        <div className='w-full pb-10 flex flex-col items-center'>
            {/* Thanh Tab điều hướng giống trang Admin */}
            <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.08)', width: '100%', px: 5, pt: 3 }}>
                <Tabs 
                    value={tabValue} 
                    onChange={(e, nv) => setTabValue(nv)} 
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{
                        '& .MuiTab-root': {
                            color: 'gray',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '1rem',
                        },
                        '& .Mui-selected': {
                            color: '#e91e63 !important',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#e91e63',
                        }
                    }}
                >
                    <Tab label="Sự kiện & Khuyến mãi" value="events" />
                    <Tab label="Mã giảm giá (Coupons)" value="coupons" />
                </Tabs>
            </Box>

            {tabValue === "events" && (
                <div className='w-full flex flex-col items-center'>
                    <h1 className='text-2xl text-center py-7 font-bold text-gray-300 tracking-wider'>
                        SỰ KIỆN & KHUYẾN MÃI ĐANG DIỄN RA
                    </h1>

                    <div className='flex flex-wrap items-center justify-center gap-6 px-5 w-full lg:w-4/5'>
                        {restaurant.events?.length > 0 ? (
                            restaurant.events.map((item) => (
                                <Card 
                                    key={item.id} 
                                    sx={{ width: 345, bgcolor: '#111827', border: '1px solid #1f2937' }} 
                                    className='hover:scale-105 transition-transform duration-300 cursor-pointer hover:border-pink-500'
                                    onClick={() => handleNavigateToRestaurant(item)}
                                >
                                    <CardMedia
                                        sx={{ height: 160 }}
                                        image={item.image || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"}
                                        title={item.name}
                                    />
                                    <CardContent className='text-white'>
                                        <Typography gutterBottom variant="h5" component="div" className='font-bold text-pink-500'>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" className='text-gray-400'>
                                            <span className='font-semibold text-gray-300'>Nhà hàng:</span> {item.restaurant?.name || "Hệ thống"}
                                        </Typography>
                                        <Typography variant="body2" className='text-gray-400 mt-1'>
                                            <span className='font-semibold text-gray-300'>Nơi áp dụng:</span> {item.location}
                                        </Typography>
                                        <div className='mt-4 pt-3 border-t border-gray-800 text-xs text-gray-500 space-y-1'>
                                            <p>📅 Bắt đầu: {item.startedAt}</p>
                                            <p>⌛ Kết thúc: {item.endsAt}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className='text-gray-500 mt-5 text-lg'>Hiện tại chưa có sự kiện hoặc khuyến mãi nào diễn ra.</p>
                        )}
                    </div>
                </div>
            )}

            {tabValue === "coupons" && (
                <div className='w-full flex flex-col items-center'>
                    <h1 className='text-2xl text-center py-7 font-bold text-gray-300 tracking-wider'>
                        MÃ GIẢM GIÁ (COUPONS) KHUYẾN MÃI
                    </h1>

                    <div className='flex flex-wrap items-center justify-center gap-6 px-5 w-full lg:w-4/5'>
                        {coupons.length > 0 ? (
                            coupons.map((item) => (
                                <Card 
                                    key={item.id} 
                                    sx={{ width: 300, bgcolor: '#111827', border: '1px solid #1f2937', color: 'white', borderRadius: '12px' }}
                                    className="hover:border-pink-500 transition-colors duration-300 shadow-md"
                                >
                                    <CardContent className="space-y-3 p-5">
                                        <div className="flex justify-between items-center">
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e91e63', bgcolor: 'rgba(233, 30, 99, 0.1)', px: 2, py: 0.5, borderRadius: '8px', border: '1px dashed #e91e63' }}>
                                                {item.code}
                                            </Typography>
                                            
                                            <Button
                                                size="small"
                                                onClick={() => handleCopyCode(item.code)}
                                                variant="outlined"
                                                sx={{ 
                                                    borderColor: copiedCode === item.code ? '#10b981' : 'rgba(233,30,99,0.3)',
                                                    color: copiedCode === item.code ? '#10b981' : '#e91e63',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        borderColor: copiedCode === item.code ? '#10b981' : '#e91e63',
                                                        bgcolor: 'rgba(233,30,99,0.05)'
                                                    }
                                                }}
                                                startIcon={copiedCode === item.code ? null : <ContentCopyIcon sx={{ fontSize: 14 }} />}
                                            >
                                                {copiedCode === item.code ? "Đã sao chép" : "Lấy mã"}
                                            </Button>
                                        </div>
                                        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                                        <Typography variant="body2" sx={{ color: '#9ca3af' }} className="truncate">
                                            <strong>Nhà hàng:</strong> {item.restaurant?.name || 'Hệ thống'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                                            <strong>Loại giảm giá:</strong> {item.discountType === "PERCENTAGE" ? "Giảm theo %" : "Giảm tiền mặt"}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                                            <strong>Đơn tối thiểu:</strong> {item.minimumOrderValue ? `${item.minimumOrderValue.toLocaleString()} đ` : "0 đ"}
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                                            {item.discountType === "PERCENTAGE" ? `${item.discountValue}%` : `${item.discountValue?.toLocaleString()} đ`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className='text-gray-500 mt-5 text-lg'>Chưa có mã giảm giá nào được tạo trên hệ thống.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
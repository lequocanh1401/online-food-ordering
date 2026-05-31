import React, { useEffect, useState } from 'react';
import { OrderCard } from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../../State/Order/Action';
import { Box, Tab, Tabs } from '@mui/material';

export const Orders = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const order = useSelector(store => store.order); // Rút kho chứa đơn hàng ra

    const [filterValue, setFilterValue] = useState("ALL");

    // Tự động gọi API kéo danh sách đơn hàng khi vừa vào trang
    useEffect(() => {
        if (jwt) {
            dispatch(getUsersOrders(jwt));
        }
    }, [dispatch, jwt]);

    const handleFilterChange = (event, newValue) => {
        setFilterValue(newValue);
    };

    const filteredOrders = order.orders?.filter((item) => {
        if (filterValue === "ALL") return true;
        if (filterValue === "PENDING") return item.orderStatus === "PENDING" || item.orderStatus === "PAID";
        if (filterValue === "OUT_FOR_DELIVERY") return item.orderStatus === "OUT_FOR_DELIVERY";
        if (filterValue === "COMPLETED") return item.orderStatus === "COMPLETED" || item.orderStatus === "DELIVERED";
        return item.orderStatus === filterValue;
    }) || [];

    return (
        <div className='flex items-center flex-col px-5'>
            <h1 className='text-2xl text-center py-7 font-bold text-gray-300 tracking-wider'>
                Lịch Sử Đơn Hàng
            </h1>

            {/* Bộ lọc Tab thiết kế hiện đại */}
            <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.08)', width: '100%', mb: 4, display: 'flex', justifyContent: 'center' }}>
                <Tabs 
                    value={filterValue} 
                    onChange={handleFilterChange} 
                    textColor="secondary"
                    indicatorColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': {
                            color: 'gray',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '0.9rem',
                            px: 3,
                        },
                        '& .Mui-selected': {
                            color: '#e91e63 !important',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#e91e63',
                        }
                    }}
                >
                    <Tab label="Tất cả" value="ALL" />
                    <Tab label="Đang chuẩn bị" value="PENDING" />
                    <Tab label="Đang giao" value="OUT_FOR_DELIVERY" />
                    <Tab label="Hoàn thành" value="COMPLETED" />
                </Tabs>
            </Box>

            <div className='space-y-5 w-full lg:w-1/2 pb-10'>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((orderItem) => (
                        <OrderCard key={orderItem.id} order={orderItem} />
                    ))
                ) : (
                    <p className='text-center text-gray-400 mt-10'>
                        Không tìm thấy đơn hàng nào ở trạng thái này.
                    </p>
                )}
            </div>
        </div>
    );
};
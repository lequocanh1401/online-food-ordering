import React, { useEffect } from 'react';
import { OrderCard } from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../../State/Order/Action';

export const Orders = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { order } = useSelector(store => store); // Rút kho chứa đơn hàng ra

    // Tự động gọi API kéo danh sách đơn hàng khi vừa vào trang
    useEffect(() => {
        if (jwt) {
            dispatch(getUsersOrders(jwt));
        }
    }, [dispatch, jwt]);

    return (
        <div className='flex items-center flex-col'>
            <h1 className='text-xl text-center py-7 font-semibold'>Lịch Sử Đơn Hàng</h1>
            <div className='space-y-5 w-full lg:w-1/2'>
                {order.orders && order.orders.length > 0 ? (
                    order.orders.map((orderItem) =>
                        orderItem.items.map((item) => (
                            <OrderCard key={item.id} item={item} order={orderItem} />
                        ))
                    )
                ) : (
                    <p className='text-center text-gray-400 mt-10'>
                        Bạn chưa có đơn hàng nào hoặc dữ liệu đang được tải...
                    </p>
                )}
            </div>
        </div>
    );
};
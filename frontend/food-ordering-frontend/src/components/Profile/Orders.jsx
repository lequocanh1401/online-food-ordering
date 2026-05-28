import React, { useEffect } from 'react';
import { OrderCard } from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../../State/Order/Action';

export const Orders = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const order = useSelector(store => store.order);

    // Tự động kéo lịch sử mua hàng khi vừa mở tab
    useEffect(() => {
        if (jwt) {
            dispatch(getUsersOrders(jwt));
        }
    }, [dispatch, jwt]);

    return (
        <div className='flex items-center flex-col pb-10'>
            <h1 className='text-2xl text-center py-7 font-bold text-gray-300 tracking-wider'>
                LỊCH SỬ ĐƠN HÀNG
            </h1>
            <div className='space-y-5 w-full lg:w-2/3 px-5 lg:px-0'>
                {order.orders?.map((orderItem) =>
                    orderItem.items?.map((item) => (
                        <OrderCard key={item.id} item={item} orderStatus={orderItem.orderStatus} />
                    ))
                )}

                {(!order.orders || order.orders.length === 0) && (
                    <p className='text-center text-gray-500'>Bạn chưa có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
};
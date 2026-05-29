import React from 'react';
import { IconButton, Chip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../State/Cart/Action';

export const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    // Hàm tăng giảm số lượng
    const handleUpdateCartItem = (value) => {
        if (value === -1 && item.quantity === 1) {
            handleRemoveCartItem();
        } else {
            const data = { cartItemId: item.id, quantity: item.quantity + value };
            dispatch(updateCartItem({ data, jwt }));
        }
    };

    // Hàm xóa món khỏi giỏ
    const handleRemoveCartItem = () => {
        dispatch(removeCartItem({ cartItemId: item.id, jwt }));
    };

    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img
                        className='w-[5rem] h-[5rem] object-cover rounded-md'
                        src={item.food?.images?.[0] || "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg"}
                        alt="Food"
                    />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p className='font-semibold'>{item.food?.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)} color="primary">
                                    <RemoveCircleIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-sm flex items-center justify-center font-semibold text-white'>
                                    {item.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)} color="primary">
                                    <AddCircleIcon />
                                </IconButton>
                            </div>
                            <p className='text-white font-semibold'>{item.totalPrice} đ</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-3 space-x-2'>
                {/* Hiển thị các topping/nguyên liệu mà khách đã tick chọn */}
                {item.ingredients?.map((ingredient, index) => (
                    <Chip key={index} label={ingredient} className="bg-gray-800 text-gray-300" size="small" />
                ))}
            </div>
        </div>
    )
}
import React from 'react';
import { IconButton, Chip } from '@mui/material';
// Đổi sang dùng icon nét đặc (không có chữ Outline)
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const CartItem = () => {
    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover' src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Food" />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p className='font-semibold'>Pizza Thập Cẩm</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton color="primary">
                                    <RemoveCircleIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-sm flex items-center justify-center font-semibold text-white'>
                                    2
                                </div>
                                <IconButton color="primary">
                                    <AddCircleIcon />
                                </IconButton>
                            </div>
                            <p className='text-white font-semibold'>150,000 đ</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-3 space-x-2'>
                {/* Hiển thị giả lập topping đã chọn */}
                {[1, 1].map((item, index) => <Chip key={index} label="Phô mai" className="bg-gray-800 text-gray-300" size="small" />)}
            </div>
        </div>
    )
}
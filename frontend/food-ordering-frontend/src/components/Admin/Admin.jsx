import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminSideBar } from './AdminSideBar';

export const Admin = () => {
    return (
        <div className='lg:flex justify-between min-h-screen text-white bg-gray-900'>
            {/* Cột trái: Thanh Menu */}
            <div className='lg:w-[20%]'>
                <AdminSideBar handleClose={() => { }} />
            </div>

            {/* Cột phải: Vùng nội dung sẽ thay đổi khi click menu */}
            <div className='lg:w-[80%] pt-5 pb-10'>
                <Routes>
                    <Route path='/' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Trang Tổng Quan (Đang xây dựng)</h2>} />
                    <Route path='/orders' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Quản lý Đơn hàng (Đang xây dựng)</h2>} />
                    <Route path='/menu' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Quản lý Thực đơn (Đang xây dựng)</h2>} />
                    <Route path='/category' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Danh mục Món ăn (Đang xây dựng)</h2>} />
                    <Route path='/ingredients' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Kho Nguyên liệu (Đang xây dựng)</h2>} />
                    <Route path='/details' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Thông tin Nhà hàng (Đang xây dựng)</h2>} />
                </Routes>
            </div>
        </div>
    );
};
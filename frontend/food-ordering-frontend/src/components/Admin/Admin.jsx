import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Dashboard } from './Dashboard';
import { Orders } from './Orders';
import { Menu } from './Menu';
import { RestaurantDetails } from './RestaurantDetails';
import { Ingredients } from './Ingredients';
import { FoodCategory } from './FoodCategory';
import { Events } from './Events';

export const Admin = () => {
    const handleClose = () => {
        // Hàm đóng sidebar trên điện thoại
    };

    return (
        <div className='lg:flex justify-between min-h-[80vh]'>
            {/* Cột trái: Sidebar (Chiếm 20% màn hình) */}
            <div className='lg:w-[20%]'>
                <AdminSidebar handleClose={handleClose} />
            </div>

            {/* Cột phải: Nội dung chính (Chiếm 80% màn hình) */}
            <div className='lg:w-[80%] pb-10'>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/menu' element={<Menu />} />
                    <Route path='/ingredients' element={<Ingredients />} />
                    <Route path='/category' element={<FoodCategory />} />
                    <Route path='/event' element={<Events />} />
                    <Route path='/details' element={<RestaurantDetails />} />
                </Routes>
            </div>
        </div>
    );
};
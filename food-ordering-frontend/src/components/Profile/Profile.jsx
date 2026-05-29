import React, { useState } from 'react';
import { ProfileNavigation } from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import { Orders } from './Orders';
import { Favorites } from './Favorites';
import { Events } from './Events'; // 👈 Đã mở khóa import trang Events khách hàng

export const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(false);

    return (
        <div className='lg:flex justify-between min-h-screen bg-black text-white'>
            {/* Sidebar điều hướng */}
            <div className='sticky h-[80vh] lg:w-[20%]'>
                <ProfileNavigation open={openSideBar} handleClose={() => setOpenSideBar(false)} />
            </div>

            {/* Ruột thay đổi theo URL */}
            <div className='lg:w-[80%] mt-5 lg:mt-0'>
                <Routes>
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/events' element={<Events />} /> {/* 👈 Đã mở khóa route */}
                </Routes>
            </div>
        </div>
    );
};
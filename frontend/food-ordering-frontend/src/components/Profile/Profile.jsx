import React, { useState } from 'react';
import { ProfileNavigation } from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import { Orders } from './Orders';
import { Favorites } from './Favorites'; // 👈 Đã mở khóa import

// import { UserAddress } from './UserAddress';

export const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(false);

    return (
        <div className='lg:flex justify-between min-h-screen bg-black text-white'>
            <div className='sticky h-[80vh] lg:w-[20%]'>
                <ProfileNavigation open={openSideBar} handleClose={() => setOpenSideBar(false)} />
            </div>

            <div className='lg:w-[80%] mt-5 lg:mt-0'>
                <Routes>
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/favorites' element={<Favorites />} /> {/* 👈 Đã mở khóa route */}

                    {/* <Route path='/address' element={<UserAddress />} /> */}
                </Routes>
            </div>
        </div>
    );
};
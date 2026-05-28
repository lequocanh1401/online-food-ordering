import React, { useState } from 'react';
import { ProfileNavigation } from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
// Tạm thời comment các trang con lại, lát nữa làm tới đâu mở tới đó
// import { Orders } from './Orders';
// import { Favorites } from './Favorites';
// import { UserAddress } from './UserAddress';

export const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(false);

    return (
        <div className='lg:flex justify-between min-h-screen bg-black text-white'>
            {/* Thanh Sidebar bên trái */}
            <div className='sticky h-[80vh] lg:w-[20%]'>
                <ProfileNavigation open={openSideBar} handleClose={() => setOpenSideBar(false)} />
            </div>

            {/* Nội dung thay đổi bên phải */}
            <div className='lg:w-[80%] mt-5 lg:mt-0'>
                <Routes>
                    {/* <Route path='/orders' element={<Orders />} /> */}
                    {/* <Route path='/favorites' element={<Favorites />} /> */}
                    {/* <Route path='/address' element={<UserAddress />} /> */}
                </Routes>
            </div>
        </div>
    );
};
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Home } from '../components/Home/Home';
import { RestaurantDetails } from '../components/Restaurant/RestaurantDetails'; // 👈 Bỏ comment

// import { Cart } from '../components/Cart/Cart';
// import { Profile } from '../components/Profile/Profile';

export const CustomerRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                {/* 👈 Bỏ comment dòng này */}
                <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />

                {/* <Route path='/cart' element={<Cart />} /> */}
                {/* <Route path='/my-profile/*' element={<Profile />} /> */}
            </Routes>
        </div>
    );
};
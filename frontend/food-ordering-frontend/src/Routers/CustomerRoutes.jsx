import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Home } from '../components/Home/Home';
import { RestaurantDetails } from '../components/Restaurant/RestaurantDetails';
import { Cart } from '../components/Cart/Cart';
import { Profile } from '../components/Profile/Profile'; // 👈 Bỏ comment dòng này

export const CustomerRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/my-profile/*' element={<Profile />} /> {/* 👈 Bỏ comment dòng này */}
            </Routes>
        </div>
    );
};
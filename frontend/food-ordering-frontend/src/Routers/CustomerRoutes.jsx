import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Home } from '../components/Home/Home'; // Bỏ comment dòng này

// import { RestaurantDetails } from '../components/Restaurant/RestaurantDetails';
// import { Cart } from '../components/Cart/Cart';
// import { Profile } from '../components/Profile/Profile';

export const CustomerRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                {/* Bỏ comment dòng Route của Home */}
                <Route path='/' element={<Home />} />

                {/* <Route path='/account/:register' element={<Home />} /> */}
                {/* <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} /> */}
                {/* <Route path='/cart' element={<Cart />} /> */}
                {/* <Route path='/my-profile/*' element={<Profile />} /> */}
            </Routes>
        </div>
    );
};
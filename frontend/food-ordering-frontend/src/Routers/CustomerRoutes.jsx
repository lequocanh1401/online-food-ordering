import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Home } from '../components/Home/Home';
import { RestaurantDetails } from '../components/Restaurant/RestaurantDetails';
import { Cart } from '../components/Cart/Cart';
import { Profile } from '../components/Profile/Profile';
import { PaymentSuccess } from '../components/PaymentSuccess/PaymentSuccess'; // 👈 Import trang thành công vào đây

export const CustomerRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/my-profile/*' element={<Profile />} />

                {/* 👈 Cấu hình đường dẫn hứng link trả về từ Stripe */}
                <Route path='/payment/success' element={<PaymentSuccess />} />
            </Routes>
        </div>
    );
};
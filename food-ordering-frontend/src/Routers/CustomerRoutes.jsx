import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from '../components/Navbar/Navbar';
import { Home } from '../components/Home/Home';
import { RestaurantDetails } from '../components/Restaurant/RestaurantDetails';
import { Cart } from '../components/Cart/Cart';
import { Profile } from '../components/Profile/Profile';
import { PaymentSuccess } from '../components/PaymentSuccess/PaymentSuccess'; // 👈 Import trang thành công vào đây
import { PaymentFail } from '../components/PaymentFail/PaymentFail';
import { SearchPage } from '../components/Search/SearchPage';

export const CustomerRoutes = () => {
    const navigate = useNavigate();
    const auth = useSelector(store => store.auth);

    // Chuyển hướng chủ nhà hàng và admin ra khỏi các trang mua hàng của khách
    useEffect(() => {
        if (auth.user && (auth.user.role === "ROLE_RESTAURANT_OWNER" || auth.user.role === "ROLE_ADMIN")) {
            navigate("/admin/restaurant");
        }
    }, [auth.user, navigate]);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/my-profile/*' element={<Profile />} />
                <Route path='/search' element={<SearchPage />} />

                {/* 👈 Cấu hình đường dẫn hứng link trả về từ Stripe */}
                <Route path='/payment/success/:id' element={<PaymentSuccess />} />
                <Route path='/payment/success' element={<PaymentSuccess />} />
                <Route path='/payment/fail' element={<PaymentFail />} />
            </Routes>
        </div>
    );
};
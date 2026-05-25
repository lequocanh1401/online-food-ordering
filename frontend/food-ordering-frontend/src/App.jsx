import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { RestaurantDetails } from './components/Restaurant/RestaurantDetails';
import { Cart } from './components/Cart/Cart';
import { Profile } from './components/Profile/Profile';
import { AuthModal } from './components/Auth/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './State/Authentication/Action';
import { findCart } from './State/Cart/Action';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // Sửa lỗi cảnh báo: Chỉ gọi đích danh ngăn auth
  const auth = useSelector(store => store.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(findCart(jwt));
    }
  }, [auth.jwt, dispatch, jwt]);

  return (
    <BrowserRouter>
      <div className='bg-gray-900 min-h-screen text-white'>
        <Navbar />
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-profile/*' element={<Profile />} />
        </Routes>
        <AuthModal />
      </div>
    </BrowserRouter>
  )
}

export default App;
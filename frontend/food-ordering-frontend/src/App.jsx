import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { RestaurantDetails } from './components/Restaurant/RestaurantDetails';
import { Cart } from './components/Cart/Cart';
import { Profile } from './components/Profile/Profile';
import { AuthModal } from './components/Auth/AuthModal';

function App() {
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

        {/* Lắng nghe luồng đăng nhập toàn hệ thống */}
        <AuthModal />
      </div>
    </BrowserRouter>
  )
}

export default App;
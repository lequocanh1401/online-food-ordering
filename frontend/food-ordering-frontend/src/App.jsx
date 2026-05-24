import { Navbar } from './components/Navbar/Navbar';
// import { Home } from './components/Home/Home';
// import { RestaurantDetails } from './components/Restaurant/RestaurantDetails';
import { Cart } from './components/Cart/Cart';

function App() {
  return (
    <div className='bg-gray-900 min-h-screen text-white'>
      <Navbar />

      {/* Hiển thị trang Giỏ hàng lên để ngắm */}
      <Cart />
    </div>
  )
}

export default App;
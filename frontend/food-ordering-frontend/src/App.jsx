import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { RestaurantDetails } from './components/Restaurant/RestaurantDetails';

function App() {
  return (
    <div className='bg-gray-900 min-h-screen text-white'>
      <Navbar />
      {/* <Home /> */}
      <RestaurantDetails />
    </div>
  )
}

export default App;
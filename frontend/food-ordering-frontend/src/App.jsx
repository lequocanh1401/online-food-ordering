import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';

function App() {
  return (
    <div className='bg-gray-900 min-h-screen'>
      <Navbar />
      <Home />
    </div>
  )
}

export default App;
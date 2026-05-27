import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './State/Authentication/Action';
import { findCart } from './State/Cart/Action';
import { AuthModal } from './components/Auth/AuthModal';
import { CustomerRoutes } from './Routers/CustomerRoutes';
import { Admin } from './components/Admin/Admin'; // (Zosh sẽ chuyển cái này sang AdminRoutes ở Video 4)

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
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
        <Routes>
          <Route path='/*' element={<CustomerRoutes />} />
          <Route path='/admin/restaurant/*' element={<Admin />} />
        </Routes>
        <AuthModal />
      </div>
    </BrowserRouter>
  )
}

export default App;
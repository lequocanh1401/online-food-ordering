import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminSideBar } from './AdminSideBar';
import { CreateRestaurantForm } from './CreateRestaurantForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByUserId } from '../../State/Restaurant/Action';
import { Category } from './Category';
import { Ingredients } from './Ingredients';
import { Menu } from './Menu';
import { CreateMenuForm } from './CreateMenuForm';

export const Admin = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);

    useEffect(() => {
        if (jwt) {
            dispatch(getRestaurantByUserId(jwt));
        }
    }, [dispatch, jwt]);

    const hasRestaurant = restaurant.usersRestaurant !== null;

    return (
        <div className='min-h-screen text-white bg-gray-900'>
            {!hasRestaurant ? (
                <CreateRestaurantForm />
            ) : (
                <div className='lg:flex justify-between w-full'>
                    <div className='lg:w-[20%]'>
                        <AdminSideBar handleClose={() => { }} />
                    </div>

                    <div className='lg:w-[80%] pt-5 pb-10 px-5'>
                        <Routes>
                            <Route path='/' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Dashboard</h2>} />
                            <Route path='/orders' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Quản lý Đơn hàng</h2>} />
                            <Route path='/menu' element={<Menu />} />
                            <Route path='/add-menu' element={<CreateMenuForm />} />
                            <Route path='/category' element={<Category />} />
                            <Route path='/ingredients' element={<Ingredients />} />
                            <Route path='/details' element={<h2 className="text-center mt-10 text-2xl text-gray-400">Thông tin Quán</h2>} />
                        </Routes>
                    </div>
                </div>
            )}
        </div>
    );
};
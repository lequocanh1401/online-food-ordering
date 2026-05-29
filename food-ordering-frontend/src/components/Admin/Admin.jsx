import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Dashboard } from './Dashboard';
import { Orders } from './Orders';
import { Menu } from './Menu';
import { RestaurantDetails } from './RestaurantDetails';
import { AdminIngredients } from './Ingredients';
import { FoodCategory } from './FoodCategory';
import { Events } from './Events';
import { CreateRestaurantForm } from './CreateRestaurantForm';
import { CreateMenuForm } from './CreateMenuForm'; // Import form thêm món ăn
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByUserId } from '../../State/Restaurant/Action';

export const Admin = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);
    const handleClose = () => { };

    useEffect(() => {
        if (jwt) {
            dispatch(getRestaurantByUserId(jwt));
        }
    }, [jwt, dispatch]);

    if (!restaurant?.usersRestaurant || !restaurant?.usersRestaurant?.id) {
        return (
            <div className="pt-5 pb-20">
                <CreateRestaurantForm />
            </div>
        );
    }

    return (
        <div className='lg:flex justify-between min-h-[80vh]'>
            <div className='lg:w-[20%]'>
                <AdminSidebar handleClose={handleClose} />
            </div>
            <div className='lg:w-[80%] pb-10'>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/menu' element={<Menu />} />
                    <Route path='/add-menu' element={<CreateMenuForm />} /> {/* Đường dẫn gọi form */}
                    <Route path='/ingredients' element={<AdminIngredients />} />
                    <Route path='/category' element={<FoodCategory />} />
                    <Route path='/event' element={<Events />} />
                    <Route path='/details' element={<RestaurantDetails />} />
                </Routes>
            </div>
        </div>
    );
};
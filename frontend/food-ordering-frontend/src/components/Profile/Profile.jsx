import React from 'react';
import { ProfileNavigation } from './ProfileNavigation';
import { Routes, Route } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { Orders } from './Orders';
import { Favorites } from './Favorites';
import { Events } from './Events';
import { AddressCard } from '../Cart/AddressCard';

export const Profile = () => {
    return (
        <div className='lg:flex justify-between'>
            <div className='sticky top-0 lg:w-[20vw]'>
                <ProfileNavigation />
            </div>
            <div className='lg:w-[80vw] min-h-[80vh] bg-gray-900 pb-10'>
                <Routes>
                    <Route path='/' element={<UserProfile />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/address' element={<div className='flex flex-wrap gap-5 justify-center pt-10'><AddressCard showButton={false} /></div>} />
                    <Route path='/events' element={<Events />} />
                </Routes>
            </div>
        </div>
    );
};
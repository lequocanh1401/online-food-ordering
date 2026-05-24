import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorites", icon: <FavoriteIcon /> },
    { title: "Address", icon: <HomeIcon /> },
    { title: "Payments", icon: <AccountBalanceWalletIcon /> },
    { title: "Notification", icon: <NotificationsIcon /> },
    { title: "Events", icon: <EventIcon /> },
    { title: "Logout", icon: <LogoutIcon /> }
];

export const ProfileNavigation = () => {
    const navigate = useNavigate();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            navigate("/");
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }
    };

    return (
        <div className='w-full lg:w-[20vw] flex flex-col justify-center text-xl gap-8 h-[90vh] pt-16 bg-gray-800 text-white px-5'>
            {menu.map((item, index) => (
                <React.Fragment key={index}>
                    <div onClick={() => handleNavigate(item)} className='flex items-center space-x-5 cursor-pointer hover:text-pink-500 transition-all'>
                        {item.icon}
                        <span>{item.title}</span>
                    </div>
                    {index !== menu.length - 1 && <Divider className='bg-gray-700' />}
                </React.Fragment>
            ))}
        </div>
    );
};
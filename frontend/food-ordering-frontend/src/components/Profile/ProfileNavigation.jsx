import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Authentication/Action'; // Đảm bảo bạn có hàm logout ở đây

const menu = [
    { title: "Đơn hàng", icon: <ShoppingBagIcon /> },
    { title: "Yêu thích", icon: <FavoriteIcon /> },
    { title: "Địa chỉ", icon: <HomeIcon /> },
    { title: "Thanh toán", icon: <AccountBalanceWalletIcon /> },
    { title: "Thông báo", icon: <NotificationsActiveIcon /> },
    { title: "Sự kiện", icon: <EventIcon /> },
    { title: "Đăng xuất", icon: <LogoutIcon /> }
];

export const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Đăng xuất") {
            dispatch(logout());
            navigate("/");
        } else {
            // Chuyển đổi tên menu sang đường dẫn URL tương ứng
            const pathMap = {
                "Đơn hàng": "orders",
                "Yêu thích": "favorites",
                "Địa chỉ": "address",
                "Thanh toán": "payments",
                "Thông báo": "notifications",
                "Sự kiện": "events"
            };
            navigate(`/my-profile/${pathMap[item.title]}`);
        }
    };

    return (
        <div>
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={handleClose}
                open={isSmallScreen ? open : true}
                anchor='left'
                sx={{ zIndex: 1, position: "sticky" }}
            >
                <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16 bg-gray-900 text-white'>
                    {menu.map((item, i) => (
                        <React.Fragment key={i}>
                            <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer hover:text-pink-500 transition-colors'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider sx={{ bgcolor: "gray" }} />}
                        </React.Fragment>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};
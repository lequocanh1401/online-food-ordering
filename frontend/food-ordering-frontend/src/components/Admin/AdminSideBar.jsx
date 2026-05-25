import React from 'react';
import { Dashboard, ShoppingBag, ShopTwo, Category, Fastfood, Event, AdminPanelSettings, Logout } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Authentication/Action';

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Đơn hàng", icon: <ShoppingBag />, path: "/orders" },
    { title: "Thực đơn", icon: <ShopTwo />, path: "/menu" },
    { title: "Danh mục món", icon: <Category />, path: "/category" },
    { title: "Nguyên liệu", icon: <Fastfood />, path: "/ingredients" },
    { title: "Sự kiện", icon: <Event />, path: "/events" },
    { title: "Chi tiết Quán", icon: <AdminPanelSettings />, path: "/details" },
    { title: "Đăng xuất", icon: <Logout />, path: "/" }
];

export const AdminSideBar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        navigate(`/admin/restaurant${item.path}`);
        if (item.title === "Đăng xuất") {
            dispatch(logout());
            navigate("/");
            handleClose();
        }
    };

    return (
        <div>
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={handleClose}
                open={true}
                anchor='left'
                sx={{ zIndex: 1 }}
            >
                <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem] pt-16 lg:pt-0 bg-gray-900 text-white'>
                    {menu.map((item, i) => (
                        <React.Fragment key={i}>
                            <div onClick={() => handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer hover:text-pink-500 transition-colors'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider className="bg-gray-700" />}
                        </React.Fragment>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};
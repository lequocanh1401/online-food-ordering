import React from 'react';
import { Card, CardContent, IconButton, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../../State/Authentication/Action';

export const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    // Lấy thông tin xác thực từ store
    const auth = useSelector(store => store.auth);
    const isFavorite = auth.favorites?.some(fav => fav.id === item.id);

    const name = item.name || item.title || "Nhà hàng";
    const city = item.address?.city || "vietnam";
    const isOpen = item.open !== undefined ? item.open : true;

    const handleNavigateToRestaurant = () => {
        if (isOpen) {
            navigate(`/restaurant/${city}/${name}/${item.id}`);
        }
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        if (jwt) {
            dispatch(addToFavorites({ jwt, restaurantId: item.id }));
        }
    };

    return (
        <Card className='m-5 w-[18rem] bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl border border-gray-800 relative group'>
            <div
                className={`${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'} relative h-[12rem] overflow-hidden`}
                onClick={handleNavigateToRestaurant}
            >
                <img
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    src={item.images?.[0] || "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"}
                    alt={name}
                />
                <div className='absolute top-2 left-2'>
                    {item.open !== undefined ? (
                        <Chip
                            size="small"
                            className='font-semibold'
                            color={item.open ? "success" : "error"}
                            label={item.open ? "Open" : "Closed"}
                        />
                    ) : (
                        <Chip
                            size="small"
                            className='font-semibold'
                            color="primary"
                            label="Yêu thích"
                        />
                    )}
                </div>
            </div>

            <CardContent className='p-4'>
                <div className='flex justify-between items-start'>
                    <div className='space-y-1 cursor-pointer' onClick={handleNavigateToRestaurant}>
                        <h1 className='font-semibold text-lg text-gray-100 truncate w-[12rem]'>{name}</h1>
                        <p className='text-gray-400 text-sm truncate w-[14rem]'>{item.description || "Món ăn thơm ngon, chuẩn vị sạch sẽ!"}</p>
                    </div>
                    <div>
                        <IconButton onClick={handleToggleFavorite}>
                            {isFavorite ? (
                                <FavoriteIcon className='text-red-500' />
                            ) : (
                                <FavoriteBorderIcon className='text-red-500' />
                            )}
                        </IconButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
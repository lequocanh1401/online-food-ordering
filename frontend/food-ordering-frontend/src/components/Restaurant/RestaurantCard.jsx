import React from 'react';
import { Card, CardContent, IconButton, Chip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

export const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();

    const handleNavigateToRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address?.city}/${item.name}/${item.id}`);
        }
    };

    return (
        <Card className='m-5 w-[18rem] bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl border border-gray-800 relative group'>
            <div
                className={`${item.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative h-[12rem] overflow-hidden`}
                onClick={handleNavigateToRestaurant}
            >
                <img
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    src={item.images?.[0] || "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"}
                    alt={item.name}
                />
                <div className='absolute top-2 left-2'>
                    <Chip
                        size="small"
                        className='font-semibold'
                        color={item.open ? "success" : "error"}
                        label={item.open ? "Open" : "Closed"}
                    />
                </div>
            </div>

            <CardContent className='p-4'>
                <div className='flex justify-between items-start'>
                    <div className='space-y-1 cursor-pointer' onClick={handleNavigateToRestaurant}>
                        <h1 className='font-semibold text-lg text-gray-100 truncate w-[12rem]'>{item.name}</h1>
                        <p className='text-gray-400 text-sm truncate w-[14rem]'>{item.description || "Món ăn thơm ngon, chuẩn vị sạch sẽ!"}</p>
                    </div>
                    <div>
                        <IconButton>
                            <FavoriteBorderIcon className='text-red-500' />
                        </IconButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
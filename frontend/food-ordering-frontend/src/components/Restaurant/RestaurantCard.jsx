import React from 'react';
import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const RestaurantCard = () => {
    return (
        <Card className='w-[18rem] transition-all cursor-pointer hover:shadow-2xl hover:shadow-gray-500'>
            <div className='relative'>
                <img
                    className='w-full h-[10rem] rounded-t-md object-cover'
                    src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="restaurant"
                />
                <Chip
                    size="small"
                    className="absolute top-2 left-2"
                    color="success"
                    label="Mở cửa"
                />
            </div>

            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p className='font-semibold text-lg'>Tiệm Cơm Tấm Sài Gòn</p>
                    <p className='text-gray-500 text-sm'>
                        Cơm sườn nướng than hoa, bì chả cực ngon.
                    </p>
                </div>
                <div>
                    <IconButton>
                        <FavoriteIcon color="error" />
                    </IconButton>
                </div>
            </div>
        </Card>
    )
}
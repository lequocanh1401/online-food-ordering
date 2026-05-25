import React from 'react';
import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

// Thêm tham số { item } để nhận dữ liệu từ Trang chủ truyền vào
export const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();

    const handleNavigateToRestaurant = () => {
        // Đường dẫn chuẩn theo định tuyến ta đã làm ở App.jsx
        if (item.open) {
            navigate(`/restaurant/${item.address?.city}/${item.name}/${item.id}`);
        }
    };

    return (
        <Card className='w-[18rem] transition-all cursor-pointer hover:shadow-2xl hover:shadow-gray-500'>
            <div className='relative' onClick={handleNavigateToRestaurant}>
                {/* Lấy ảnh đầu tiên trong mảng ảnh của nhà hàng */}
                <img
                    className='w-full h-[10rem] rounded-t-md object-cover'
                    src={item.images?.[0] || "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg"}
                    alt="restaurant"
                />
                <Chip
                    size="small"
                    className="absolute top-2 left-2"
                    color={item.open ? "success" : "error"}
                    label={item.open ? "Mở cửa" : "Đóng cửa"}
                />
            </div>

            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p className='font-semibold text-lg'>{item.name}</p>
                    <p className='text-gray-500 text-sm'>
                        {item.description}
                    </p>
                </div>
                <div>
                    <IconButton>
                        {/* Tạm thời để icon tim tĩnh, sau này nối API user ta xử lý sau */}
                        <FavoriteBorderIcon />
                    </IconButton>
                </div>
            </div>
        </Card>
    )
}
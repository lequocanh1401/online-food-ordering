import React, { useEffect, useState } from 'react';
import { Divider, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { MenuCard } from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';

const categories = ["All", "Pizza", "Burger", "Salad", "Món Việt"];
const foodTypes = [
    { label: "Tất cả", value: "all" },
    { label: "Món Chay", value: "vegetarian" },
    { label: "Món Mặn", value: "non_vegetarian" },
    { label: "Theo Mùa", value: "seasonal" }
];

export const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const [category, setCategory] = useState("All");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, city } = useParams(); // Bắt ID nhà hàng từ trên thanh URL
    const { restaurant, menu } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");

    // Lắng nghe sự thay đổi của bộ lọc (Chay/Mặn, Thể loại)
    const handleFilter = (e) => {
        if (e.target.name === "food_type") {
            setFoodType(e.target.value);
        } else {
            setCategory(e.target.value);
        }
    };

    // Khi trang vừa mở, gọi API lấy dữ liệu ngay
    useEffect(() => {
        if (jwt) {
            dispatch(getRestaurantById({ jwt, restaurantId: id }));
            dispatch(getMenuItemsByRestaurantId({
                jwt,
                restaurantId: id,
                vegetarian: foodType === "vegetarian",
                nonveg: foodType === "non_vegetarian",
                seasonal: foodType === "seasonal",
                foodCategory: category === "All" ? "" : category
            }));
        }
    }, [id, foodType, category, jwt, dispatch]);

    return (
        <div className='px-5 lg:px-20 text-white'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>
                    <span onClick={() => navigate("/")} className="cursor-pointer hover:text-white">Home</span>
                    / {restaurant.restaurant?.address?.country || "Vietnam"}
                    / {restaurant.restaurant?.name}
                </h3>
                <div>
                    <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images?.[0] || "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg"} alt="Restaurant Banner" />
                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                    <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon /> <span>{restaurant.restaurant?.address?.streetAddress}, {restaurant.restaurant?.address?.city}</span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon /> <span>{restaurant.restaurant?.openingHours || "T2 - CN: 08:00 AM - 10:00 PM"}</span>
                        </p>
                    </div>
                </div>
            </section>

            <Divider className='bg-gray-700' />

            <section className='pt-[2rem] lg:flex relative'>
                {/* Cột bộ lọc bên trái */}
                <div className='space-y-10 lg:w-[20%] filter text-gray-400'>
                    <div className='box space-y-5 lg:sticky top-28'>
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>Loại Món</Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                    {foodTypes.map((item, index) => (
                                        <FormControlLabel key={index} value={item.value} control={<Radio sx={{ color: 'gray', '&.Mui-checked': { color: '#e91e63' } }} />} label={item.label} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider className='bg-gray-700' />
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>Danh Mục</Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name="food_category" value={category}>
                                    {categories.map((item, index) => (
                                        <FormControlLabel key={index} value={item} control={<Radio sx={{ color: 'gray', '&.Mui-checked': { color: '#e91e63' } }} />} label={item} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                {/* Cột thực đơn bên phải */}
                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {menu.menuItems?.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            </section>
        </div>
    )
}
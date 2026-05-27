import React, { useEffect, useState } from 'react';
import { Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { MenuCard } from './MenuCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';

const foodTypes = [
    { label: "Tất cả", value: "all" },
    { label: "Món Chay", value: "vegetarian" },
    { label: "Món Mặn", value: "non_vegetarian" },
    { label: "Theo Mùa", value: "seasonal" }
];

export const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const [foodCategory, setFoodCategory] = useState("");

    // Rút id nhà hàng từ thanh URL (VD: /restaurant/hanoi/zosh/1)
    const { id } = useParams();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const restaurant = useSelector(store => store.restaurant);
    const menu = useSelector(store => store.menu);

    // Kéo thông tin chi tiết quán + danh mục món ăn
    useEffect(() => {
        if (id) {
            dispatch(getRestaurantById({ jwt, restaurantId: id }));
            dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
        }
    }, [dispatch, jwt, id]);

    // Kéo danh sách món ăn mỗi khi khách chọn bộ lọc
    useEffect(() => {
        if (id) {
            dispatch(getMenuItemsByRestaurantId({
                jwt,
                restaurantId: id,
                vegetarian: foodType === "vegetarian",
                nonveg: foodType === "non_vegetarian",
                seasonal: foodType === "seasonal",
                foodCategory: foodCategory
            }));
        }
    }, [dispatch, jwt, id, foodType, foodCategory]);

    return (
        <div className='px-5 lg:px-20 text-white min-h-screen'>
            {/* Header: Ảnh bìa và Thông tin */}
            <section>
                <h3 className='text-gray-500 py-2 mt-5'>Home / {restaurant.restaurant?.address?.city} / {restaurant.restaurant?.name} / {id}</h3>
                <div>
                    <img className='w-full h-[40vh] object-cover rounded-lg' src={restaurant.restaurant?.images?.[0] || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"} alt="" />
                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                    <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon /> <span>{restaurant.restaurant?.address?.streetAddress}, {restaurant.restaurant?.address?.city}</span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon /> <span>{restaurant.restaurant?.openingHours}</span>
                        </p>
                    </div>
                </div>
            </section>

            <Divider sx={{ bgcolor: "gray" }} />

            {/* Phần thân: Bộ lọc và Danh sách Món ăn */}
            <section className='pt-[2rem] lg:flex relative'>
                {/* Cột trái: Bộ lọc */}
                <div className='space-y-10 lg:w-[20%] filter '>
                    <div className='box space-y-5 lg:sticky top-28'>
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>Loại Món</Typography>
                            <FormControl className='py-2 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={(e) => setFoodType(e.target.value)} name='food_type' value={foodType}>
                                    {foodTypes.map((item) => (
                                        <FormControlLabel key={item.value} value={item.value} control={<Radio sx={{ color: "gray" }} />} label={item.label} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider sx={{ bgcolor: "gray" }} />
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>Danh Mục</Typography>
                            <FormControl className='py-2 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={(e) => setFoodCategory(e.target.value)} name='food_category' value={foodCategory}>
                                    <FormControlLabel value="" control={<Radio sx={{ color: "gray" }} />} label="Tất cả" />
                                    {/* Render danh mục thật từ quán */}
                                    {restaurant.categories?.map((item) => (
                                        <FormControlLabel key={item.id} value={item.name} control={<Radio sx={{ color: "gray" }} />} label={item.name} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                {/* Cột phải: Danh sách thực đơn */}
                <div className='space-y-5 lg:w-[80%] lg:pl-10 pb-20 mt-10 lg:mt-0'>
                    {menu.menuItems?.map((item) => <MenuCard key={item.id} item={item} />)}
                </div>
            </section>
        </div>
    );
};
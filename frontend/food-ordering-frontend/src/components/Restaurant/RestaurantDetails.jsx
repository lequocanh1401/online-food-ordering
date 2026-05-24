import React, { useState } from 'react';
import { Divider, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { MenuCard } from './MenuCard';

const categories = ["All", "Pizza", "Burger", "Salad", "Món Việt"];
const foodTypes = [
    { label: "Tất cả", value: "all" },
    { label: "Món Chay", value: "vegetarian" },
    { label: "Món Mặn", value: "non_vegetarian" },
    { label: "Theo Mùa", value: "seasonal" }
];
const menu = [1, 1, 1, 1, 1, 1]; // Mảng ảo tạo ra 6 món ăn

export const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const [category, setCategory] = useState("All");

    const handleFilter = (e) => {
        console.log(e.target.value, e.target.name);
    };

    return (
        <div className='px-5 lg:px-20 text-white'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home / Vietnam / Tiệm Cơm Tấm Sài Gòn</h3>
                <div>
                    <img className='w-full h-[40vh] object-cover' src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Restaurant Banner" />
                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>Tiệm Cơm Tấm Sài Gòn</h1>
                    <p className='text-gray-500 mt-1'>
                        Cơm sườn nướng than hoa, bì chả cực ngon.
                    </p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon /> <span>Số 1, Phố Chùa Láng, Hà Nội</span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon /> <span>T2 - CN: 08:00 AM - 10:00 PM</span>
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
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>Food Type</Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                    {foodTypes.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={item.value}
                                            control={<Radio sx={{ color: 'gray', '&.Mui-checked': { color: '#e91e63' } }} />}
                                            label={item.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider className='bg-gray-700' />
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>Food Category</Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name="food_category" value={category}>
                                    {categories.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={item}
                                            control={<Radio sx={{ color: 'gray', '&.Mui-checked': { color: '#e91e63' } }} />}
                                            label={item}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                {/* Cột thực đơn bên phải */}
                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {menu.map((item, index) => <MenuCard key={index} />)}
                </div>
            </section>
        </div>
    )
}
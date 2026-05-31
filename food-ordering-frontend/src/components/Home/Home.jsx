import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../../State/Restaurant/Action';
import { RestaurantCard } from '../Restaurant/RestaurantCard';
import { MultiItemCarousel } from './MultiItemCarousel';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/api';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");

    const restaurant = useSelector(store => store.restaurant);

    const [selectedCity, setSelectedCity] = useState("ALL");
    const [selectedCuisine, setSelectedCuisine] = useState("ALL");
    const [copiedCode, setCopiedCode] = useState("");
    const [promos, setPromos] = useState([]);

    const fetchCoupons = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/coupons`);
            // Chỉ lấy các coupon đang active
            const activeCoupons = data.filter(c => c.active);
            setPromos(activeCoupons);
        } catch (error) {
            console.error("Lỗi khi tải mã giảm giá:", error);
        }
    };

    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt));
        fetchCoupons();
    }, [dispatch, jwt]);

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(""), 2000);
    };

    const cities = [
        { label: "Tất cả", value: "ALL" },
        { label: "Hà Nội", value: "Hà Nội" },
        { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
        { label: "Quảng Nam", value: "Quảng Nam" }
    ];

    const cuisines = [
        { label: "Tất cả món", value: "ALL" },
        { label: "Phở & Bún", value: "Phở & Bún" },
        { label: "Bún & Mì", value: "Bún & Mì" },
        { label: "Pizza & Pasta", value: "Pizza & Pasta" },
        { label: "Sushi & Sashimi", value: "Sushi & Sashimi" },
        { label: "Bánh Mì & Đường Phố", value: "Bánh Mì & Đường Phố" },
        { label: "Cà Phê & Bánh", value: "Cà Phê & Bánh" },
        { label: "Dimsum & Trung Hoa", value: "Dimsum & Trung Hoa" },
        { label: "Gà Rán & Fastfood", value: "Gà Rán & Fastfood" },
        { label: "Lẩu & Nướng", value: "Lẩu & Nướng" },
        { label: "Steak & Wine", value: "Steak & Wine" }
    ];

    // Lọc nhà hàng theo bộ lọc pill
    const filteredRestaurants = restaurant.restaurants?.filter(item => {
        const matchesCity = selectedCity === "ALL" ? true : (
            item.address?.city?.toLowerCase() === selectedCity.toLowerCase() ||
            (selectedCity === "Hồ Chí Minh" && (
                item.address?.city?.toLowerCase() === "hồ chí minh" || 
                item.address?.city?.toLowerCase() === "tphcm" || 
                item.address?.city?.toLowerCase() === "hcm" ||
                item.address?.city?.toLowerCase() === "ho chi minh"
            ))
        );

        const matchesCuisine = selectedCuisine === "ALL" ? true : (
            item.cuisineType?.toLowerCase() === selectedCuisine.toLowerCase()
        );

        return matchesCity && matchesCuisine;
    });

    return (
        <div className='pb-10 bg-black min-h-screen text-white'>
            {/* Banner */}
            <section
                className='relative flex flex-col justify-center items-center'
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '60vh'
                }}
            >
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-0'></div>

                <div className='w-[90vw] lg:w-[60vw] z-10 text-center flex flex-col items-center justify-center space-y-6'>
                    <div className='space-y-3'>
                        <h1 className='text-4xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500'>
                            Online Food Ordering
                        </h1>
                        <p className='text-gray-300 text-lg lg:text-2xl font-light'>Hương vị tuyệt hảo từ những đầu bếp hàng đầu, giao ngay tận cửa!</p>
                    </div>

                    {/* Glassmorphic Search Bar */}
                    <div 
                        onClick={() => navigate("/search")}
                        className='w-full max-w-2xl bg-white/10 backdrop-blur-md p-2.5 rounded-full border border-white/20 shadow-2xl flex items-center px-5 cursor-pointer hover:bg-white/15 transition-all duration-300'
                    >
                        <SearchIcon className='text-gray-300 mr-3' />
                        <input
                            type="text"
                            placeholder="Tìm kiếm món ăn, nhà hàng, ẩm thực..."
                            readOnly
                            className='bg-transparent text-white placeholder-gray-400 border-none outline-none w-full py-1 text-lg cursor-pointer'
                        />
                    </div>
                </div>
            </section>

            {/* Carousel phần "Hôm nay ăn gì" */}
            <section className='py-12 bg-[#09090b] border-b border-gray-900'>
                <div className='max-w-[1400px] mx-auto px-5 lg:px-20'>
                    <h2 className='text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mb-2'>
                        Hôm Nay Ăn Gì?
                    </h2>
                    <p className='text-gray-500 text-sm mb-8'>Gợi ý các món ăn phổ biến được đặt nhiều nhất tuần này</p>
                    <MultiItemCarousel />
                </div>
            </section>

            {/* Khuyến Mãi Hot */}
            <section className='py-12 bg-black'>
                <div className='max-w-[1400px] mx-auto px-5 lg:px-20'>
                    <h2 className='text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 mb-2'>
                        Ưu Đãi Đặc Biệt Dành Cho Bạn
                    </h2>
                    <p className='text-gray-500 text-sm mb-8'>Nhận ngay mã giảm giá siêu hot, số lượng có hạn!</p>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {promos.length > 0 ? (
                            promos.map((promo, index) => {
                                const colors = [
                                    "from-pink-500 to-rose-500",
                                    "from-purple-500 to-indigo-500",
                                    "from-emerald-500 to-teal-500",
                                    "from-amber-500 to-orange-500"
                                ];
                                const color = colors[index % colors.length];
                                const title = promo.restaurant ? promo.restaurant.name.toUpperCase() : "ƯU ĐÃI TOÀN SÀN";
                                const discountText = promo.discountType === "PERCENTAGE" ? `GIẢM ${promo.discountValue}%` : `GIẢM ${promo.discountValue?.toLocaleString()}đ`;
                                const description = (promo.restaurant 
                                    ? `Áp dụng riêng cho các đơn hàng đặt tại nhà hàng ${promo.restaurant.name}.`
                                    : "Áp dụng cho mọi đơn hàng của bất kỳ nhà hàng nào trên toàn hệ thống.") +
                                    (promo.minimumOrderValue ? ` Đơn hàng tối thiểu từ ${promo.minimumOrderValue.toLocaleString()} đ.` : "");

                                return (
                                    <div 
                                        key={promo.id} 
                                        className='bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] group relative overflow-hidden'
                                    >
                                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500`}></div>
                                        
                                        <div>
                                            <div className='flex justify-between items-center mb-3'>
                                                <span className='text-xs font-bold text-gray-500 tracking-wider truncate max-w-[150px]' title={title}>{title}</span>
                                                <span className={`text-sm font-black bg-gradient-to-r ${color} text-transparent bg-clip-text`}>HOT</span>
                                            </div>
                                            <h3 className='text-2xl font-extrabold text-white mb-2'>{discountText}</h3>
                                            <p className='text-gray-400 text-xs leading-relaxed mb-4'>{description}</p>
                                        </div>

                                        <div className='mt-4 pt-4 border-t border-gray-800 flex items-center justify-between'>
                                            <div className='bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-pink-500 select-all'>
                                                {promo.code}
                                            </div>
                                            <Button
                                                size="small"
                                                onClick={() => handleCopyCode(promo.code)}
                                                variant="outlined"
                                                sx={{ 
                                                    borderColor: copiedCode === promo.code ? '#10b981' : 'rgba(233,30,99,0.3)',
                                                    color: copiedCode === promo.code ? '#10b981' : '#e91e63',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        borderColor: copiedCode === promo.code ? '#10b981' : '#e91e63',
                                                        bgcolor: 'rgba(233,30,99,0.05)'
                                                    }
                                                }}
                                                startIcon={copiedCode === promo.code ? null : <ContentCopyIcon sx={{ fontSize: 14 }} />}
                                            >
                                                {copiedCode === promo.code ? "Đã sao chép" : "Lấy mã"}
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='col-span-full py-8 text-center text-gray-500 bg-gray-950/20 border border-gray-900 rounded-2xl'>
                                Hiện tại chưa có mã giảm giá nào đang diễn ra. Quay lại sau bạn nhé!
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Danh sách nhà hàng khám phá */}
            <section className='py-12 bg-[#09090b] border-t border-gray-900'>
                <div className='max-w-[1400px] mx-auto px-5 lg:px-20'>
                    <div className='flex flex-col lg:flex-row lg:justify-between lg:items-end border-b border-gray-800 pb-5 mb-8 space-y-4 lg:space-y-0'>
                        <div>
                            <h2 className='text-xl lg:text-2xl font-bold text-white mb-2'>
                                Khám Phá Nhà Hàng
                            </h2>
                            <p className='text-gray-500 text-sm'>
                                {filteredRestaurants?.length || 0} nhà hàng phù hợp với lựa chọn của bạn
                            </p>
                        </div>

                        {/* Bộ lọc Thành phố */}
                        <div className='flex flex-wrap gap-2 items-center'>
                            <span className='text-gray-400 text-xs font-bold mr-2 uppercase tracking-wider'>Thành phố:</span>
                            {cities.map((city) => (
                                <button
                                    key={city.value}
                                    onClick={() => setSelectedCity(city.value)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                                        selectedCity === city.value 
                                            ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20' 
                                            : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                                    }`}
                                >
                                    {city.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bộ lọc Loại món ăn */}
                    <div className='flex flex-wrap gap-2 items-center mb-10 pb-5 border-b border-gray-900/50'>
                        <span className='text-gray-400 text-xs font-bold mr-2 uppercase tracking-wider'>Ẩm thực:</span>
                        {cuisines.map((cuisine) => (
                            <button
                                key={cuisine.value}
                                onClick={() => setSelectedCuisine(cuisine.value)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                                    selectedCuisine === cuisine.value 
                                        ? 'bg-pink-500 border-pink-500 text-white' 
                                        : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                                }`}
                            >
                                {cuisine.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid Nhà Hàng */}
                    {filteredRestaurants && filteredRestaurants.length > 0 ? (
                        <div className='flex flex-wrap items-center justify-start gap-3 mt-8'>
                            {filteredRestaurants.map((item) => (
                                <RestaurantCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className='py-20 text-center flex flex-col items-center justify-center space-y-4'>
                            <p className='text-gray-500 text-lg'>Không tìm thấy nhà hàng nào phù hợp với bộ lọc.</p>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => {
                                    setSearchKeyword("");
                                    setSelectedCity("ALL");
                                    setSelectedCuisine("ALL");
                                }}
                                sx={{ textTransform: 'none' }}
                            >
                                Thiết lập lại bộ lọc
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Dịch vụ nổi bật */}
            <section className='py-16 bg-black border-t border-gray-900'>
                <div className='max-w-[1400px] mx-auto px-5 lg:px-20'>
                    <div className='text-center max-w-xl mx-auto mb-12'>
                        <h2 className='text-xl lg:text-2xl font-bold text-white mb-3'>
                            Dịch Vụ Chất Lượng Hàng Đầu
                        </h2>
                        <p className='text-gray-500 text-sm'>
                            Chúng tôi luôn nỗ lực hết mình để đem lại những bữa ăn trọn vẹn nhất cho bạn
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='bg-gray-950/40 border border-gray-900 rounded-2xl p-6 text-center hover:border-pink-500/20 hover:bg-gray-950/60 transition-all duration-300 flex flex-col items-center space-y-4'>
                            <div className='w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mb-2'>
                                <LocalShippingIcon sx={{ fontSize: 32 }} />
                            </div>
                            <h3 className='text-lg font-bold text-white'>Giao Hàng Siêu Tốc</h3>
                            <p className='text-gray-400 text-sm leading-relaxed max-w-xs'>
                                Cam kết đồ ăn được giao nhanh chóng, nóng hổi và nguyên vẹn trong vòng 30 phút.
                            </p>
                        </div>

                        <div className='bg-gray-950/40 border border-gray-900 rounded-2xl p-6 text-center hover:border-pink-500/20 hover:bg-gray-950/60 transition-all duration-300 flex flex-col items-center space-y-4'>
                            <div className='w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mb-2'>
                                <VerifiedIcon sx={{ fontSize: 32 }} />
                            </div>
                            <h3 className='text-lg font-bold text-white'>Vệ Sinh & Chất Lượng</h3>
                            <p className='text-gray-400 text-sm leading-relaxed max-w-xs'>
                                Mọi đối tác nhà hàng đều được kiểm duyệt vệ sinh an toàn thực phẩm cực kỳ khắt khe.
                            </p>
                        </div>

                        <div className='bg-gray-950/40 border border-gray-900 rounded-2xl p-6 text-center hover:border-pink-500/20 hover:bg-gray-950/60 transition-all duration-300 flex flex-col items-center space-y-4'>
                            <div className='w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mb-2'>
                                <SupportAgentIcon sx={{ fontSize: 32 }} />
                            </div>
                            <h3 className='text-lg font-bold text-white'>Hỗ Trợ 24/7</h3>
                            <p className='text-gray-400 text-sm leading-relaxed max-w-xs'>
                                Đội ngũ chăm sóc khách hàng thân thiện luôn túc trực hỗ trợ bạn mọi lúc, mọi nơi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
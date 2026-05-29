import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../State/Cart/Action';
import { getFoodReviews, getRestaurantReviews } from '../../State/Review/Action';
import { ReviewModal } from './ReviewModal';

export const MenuCard = ({ item, restaurantId }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [openReviewModal, setOpenReviewModal] = useState(false);

    const reviewState = useSelector(store => store.review);
    const foodReviewData = reviewState.foodReviews[item.id] || { reviews: [], averageRating: 0, totalReviews: 0 };

    useEffect(() => {
        if (item.id) {
            dispatch(getFoodReviews({ foodId: item.id }));
        }
    }, [dispatch, item.id]);

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        const reqData = {
            foodId: item.id,
            quantity: 1,
            ingredients: []
        };

        dispatch(addItemToCart({ reqData, jwt }));
        console.log("Đang kích hoạt API thêm vào giỏ hàng:", reqData);
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className='lg:flex items-center justify-between w-full'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img
                            className='w-[7rem] h-[7rem] object-cover rounded-md'
                            src={item.images?.[0] || "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"}
                            alt={item.name}
                        />
                        <div className='space-y-1 lg:space-y-3 lg:max-w-2xl'>
                            <p className='font-semibold text-xl flex items-center gap-2'>
                                {item.name}
                                {foodReviewData.totalReviews > 0 && (
                                    <span className="text-xs font-semibold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                                        ⭐ {foodReviewData.averageRating} ({foodReviewData.totalReviews})
                                    </span>
                                )}
                            </p>
                            <p className='text-gray-400 font-semibold'>{item.price}đ</p>
                            <p className='text-gray-500 text-sm'>{item.description}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleAddItemToCart}>
                    <div className='pt-2'>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={!item.available}
                            type='submit'
                        >
                            {item.available ? "Thêm vào giỏ hàng" : "Hết hàng"}
                        </Button>
                    </div>
                </form>

                {/* Phần đánh giá món ăn */}
                <div className='mt-6 border-t border-gray-800 pt-4'>
                    <div className="flex justify-between items-center mb-4">
                        <Typography className="font-semibold text-gray-200" variant="subtitle1">
                            Đánh Giá Món Ăn ({foodReviewData.totalReviews} nhận xét)
                        </Typography>
                        <Button 
                            size="small"
                            variant="outlined" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenReviewModal(true);
                            }}
                            sx={{ color: '#e91e63', borderColor: '#e91e63', '&:hover': { borderColor: '#ad1457', bgcolor: 'rgba(233,30,99,0.05)' } }}
                        >
                            Đánh giá món
                        </Button>
                    </div>

                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                        {foodReviewData.reviews?.map((r) => (
                            <div key={r.id} className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg text-sm text-white">
                                <div className="flex justify-between items-start">
                                    <span className="font-semibold text-gray-300">{r.customer?.fullName}</span>
                                    <span className="text-yellow-500 font-semibold">⭐ {r.rating}</span>
                                </div>
                                <p className="text-gray-400 mt-1.5">{r.comment}</p>
                            </div>
                        ))}
                        {(!foodReviewData.reviews || foodReviewData.reviews.length === 0) && (
                            <p className="text-gray-500 text-xs text-center py-4">Chưa có đánh giá nào cho món ăn này.</p>
                        )}
                    </div>
                </div>

                <ReviewModal 
                    open={openReviewModal} 
                    handleClose={() => setOpenReviewModal(false)} 
                    restaurantId={restaurantId} 
                    foodId={item.id} 
                    foodName={item.name}
                    onSuccess={() => {
                        dispatch(getFoodReviews({ foodId: item.id }));
                        if (restaurantId) {
                            dispatch(getRestaurantReviews({ restaurantId }));
                        }
                    }}
                />
            </AccordionDetails>
        </Accordion>
    );
};
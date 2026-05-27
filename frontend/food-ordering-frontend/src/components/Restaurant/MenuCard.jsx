import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../State/Cart/Action'; // Nhớ check đường dẫn kho Cart

export const MenuCard = ({ item }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        const reqData = {
            token: jwt,
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: [] // Tạm thời nạp mảng rỗng, phần chọn nguyên liệu sẽ làm sau nếu cần
            }
        };
        dispatch(addItemToCart(reqData));
        console.log("Đã thêm vào giỏ hàng:", item.name);
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
                            <p className='font-semibold text-xl'>{item.name}</p>
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
            </AccordionDetails>
        </Accordion>
    );
};
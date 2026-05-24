import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ingredients = [
    { category: "Loại Đế", items: ["Đế Dày", "Đế Mỏng"] },
    { category: "Topping", items: ["Phô mai", "Thịt xông khói", "Dứa"] }
];

export const MenuCard = () => {
    const handleCheckBoxChange = (value) => {
        console.log("Chọn topping: ", value);
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className='lg:flex items-center justify-between'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img className='w-[7rem] h-[7rem] object-cover' src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Pizza" />
                        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                            <p className='font-semibold text-xl'>Pizza Thập Cẩm</p>
                            <p>150,000 đ</p>
                            <p className='text-gray-400'>Pizza thơm ngon với đầy đủ topping đặc biệt</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form>
                    <div className='flex gap-5 flex-wrap'>
                        {ingredients.map((item, index) => (
                            <div key={index}>
                                <p className='font-semibold'>{item.category}</p>
                                <FormGroup>
                                    {item.items.map((ingredient, i) => (
                                        <FormControlLabel
                                            key={i}
                                            control={<Checkbox onChange={() => handleCheckBoxChange(ingredient)} />}
                                            label={ingredient}
                                        />
                                    ))}
                                </FormGroup>
                            </div>
                        ))}
                    </div>
                    <div className='pt-5'>
                        <Button variant="contained" type="submit" disabled={false}>
                            {true ? "Thêm vào giỏ" : "Hết hàng"}
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}
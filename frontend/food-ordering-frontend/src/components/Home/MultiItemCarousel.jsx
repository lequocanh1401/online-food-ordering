import React from 'react'

// Ép Vite nhận diện đúng Component thay vì Object
import ReactSlick from "react-slick";
const Slider = ReactSlick.default || ReactSlick;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { topMeals } from './topMeal';
import { CarouselItem } from './CarouselItem';

export const MultiItemCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <div>
            <Slider {...settings}>
                {topMeals.map((item, index) => (
                    <CarouselItem key={index} image={item.image} title={item.title} />
                ))}
            </Slider>
        </div>
    )
}
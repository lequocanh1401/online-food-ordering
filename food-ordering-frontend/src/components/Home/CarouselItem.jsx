import React from 'react'

export const CarouselItem = ({ image, title }) => {
    return (
        <div className='flex flex-col justify-center items-center cursor-pointer group transition-transform duration-300 hover:scale-105'>
            <div className='relative w-[8rem] h-[8rem] lg:h-[12rem] lg:w-[12rem] rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-pink-500 transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(233,30,99,0.3)]'>
                <img className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500' src={image} alt={title} />
                <div className='absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300'></div>
            </div>
            <span className='py-3 font-semibold text-lg text-gray-400 group-hover:text-pink-500 transition-colors duration-300'>{title}</span>
        </div>
    )
}
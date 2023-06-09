import React, { useEffect } from 'react'
import { Carousel } from "flowbite";

const Slider = () => {
    useEffect(() => {
        const items = [
            {
                position: 0,
                el: document.getElementById('carousel-item-1')
            },
            {
                position: 1,
                el: document.getElementById('carousel-item-2')
            },
            {
                position: 2,
                el: document.getElementById('carousel-item-3')
            },
        ];

        const options = {
            defaultPosition: 1,
            interval: 3000,

            indicators: {
                activeclassNameNamees: 'bg-white dark:bg-gray-800',
                inactiveclassNameNamees: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
                items: [
                    {
                        position: 0,
                        el: document.getElementById('carousel-indicator-1')
                    },
                    {
                        position: 1,
                        el: document.getElementById('carousel-indicator-2')
                    },
                    {
                        position: 2,
                        el: document.getElementById('carousel-indicator-3')
                    },
                ]
            },

            // callback functions
            onNext: () => {
                console.log('next slider item is shown');
            },
            onPrev: () => {
                console.log('previous slider item is shown');
            },
            onChange: () => {
                console.log('new slider item has been shown');
            }
        };

        const carousel = new Carousel(items, options);

        carousel.cycle()

        // set event listeners for prev and next buttons
        const $prevButton = document.getElementById('data-carousel-prev');
        const $nextButton = document.getElementById('data-carousel-next');

        $prevButton.addEventListener('click', () => {
            carousel.prev();
        });

        $nextButton.addEventListener('click', () => {
            carousel.next();
        });
    }, [])



    return (
        <div className='w-full py-10'>
            <div className="relative w-full md:w-4/5 m-auto px-2 shadow-xl shadow-pink-400 rounded-lg py-2">
                {/* <!-- Carousel wrapper --> */}
                <div className="relative overflow-hidden rounded-sm md:h-[80vh] h-[25vh] sm:h-[50vh]">
                    {/* <!-- Item 1 --> */}
                    <div id="carousel-item-1" className="hidden duration-[1.5s] ease">
                        <img className='md:h-[80vh] h-[25vh] sm:h-[50vh]' src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/banner/1.webp" alt="..." />
                    </div>
                    {/* <!-- Item 2 --> */}
                    <div id="carousel-item-2" className="hidden duration-[1.5s] ease">
                        <img className='md:h-[80vh] h-[25vh] sm:h-[50vh]' src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/banner/2.webp" alt="..."  />
                    </div>
                    {/* <!-- Item 3 --> */}
                    <div id="carousel-item-3" className="hidden duration-[1.5s] ease">
                        <img className='md:h-[80vh] h-[25vh] sm:h-[50vh]' src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/banner/3.webp" alt="..."  />
                    </div>
                </div>
                {/* <!-- Slider indicators --> */}
                <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                    <button id="carousel-indicator-1" type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"></button>
                    <button id="carousel-indicator-2" type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"></button>
                    <button id="carousel-indicator-3" type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"></button>
                    {/* <button id="carousel-indicator-4" type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"></button> */}
                </div>
                {/* <!-- Slider controls --> */}
                <button id="data-carousel-prev" type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        <span className="hidden">Previous</span>
                    </span>
                </button>
                <button id="data-carousel-next" type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        <span className="hidden">Next</span>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Slider
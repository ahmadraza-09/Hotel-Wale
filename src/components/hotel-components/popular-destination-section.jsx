import React, { useState } from 'react';

const PopularDestinationSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    const categories = [
        { title: "Corbett", state: "Uttrakhand, India", img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/464017962.jpg?k=5e22249570708eb8628a2ff6cd60348373da2f4f8f24f25b45a432387a9e6490&o=&hp=1' }, // No image provided
        { title: "Nainital", state: "Uttrakhand, India", img: 'https://s3.india.com/wp-content/uploads/2024/06/10-Fascinating-Facts-About-Nainital.jpg' },
        { title: "Manali", state: "Himachal Pradesh, India", img: 'https://www.clubmahindra.com/blog/media/section_images/blog-topic-6530ecb63a76c89.jpg' },
        { title: "Shimla", state: "Himachal Pradesh, India", img: 'https://s7ap1.scene7.com/is/image/incredibleindia/cityscape-of-shimla-himachal-pradesh-city-1-hero?qlt=82&ts=1726730693575' },
        { title: "New Delhi", state: "Delhi, India", img: null },
        { title: "Bhubaneshwar", state: "Odisha, India", img: null },
        { title: "Puri", state: "Odisha, India", img: null },
        { title: "Cuttak", state: "Odisha, India", img: null },
    ];

    // Function to scroll horizontally
    function scrollHorizontally(direction) {
        const container = document.querySelector(".destination-container");
        const scrollAmount = direction === "prev" ? -300 : 300; // Adjust scroll amount
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    const defaultImage = "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg";

    return (
        <div
            className="relative w-full bg-white py-8 px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className="text-center sm:text-start text-xl sm:text-2xl mb-6 font-TTHovesMedium sm:ml-10">Explore stays in popular destinations</h2>
            <div className="overflow-x-auto destination-container flex gap-4 py-4 hide-scrollbar max-w-6xl m-auto">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[250px] h-[230px] rounded-2xl overflow-hidden relative cursor-pointer border-[1px]"
                    >
                        <div className='w-full h-34 overflow-hidden'>
                            <img
                                src={category.img || defaultImage}
                                alt={category.title}
                                className="w-full h-40 object-cover"
                            />
                        </div>
                        <div className="px-4 py-2 text-start absolute bottom-0 z-10 bg-white w-full">
                            <span className='font-TTHovesMedium'>{category.title}</span> <br />
                            <span className='font-TTHovesLight text-sm'>{category.state}</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* Show prev/next buttons when hovered */}
            {isHovered && (
                <>
                    <button
                        className="absolute left-8 top-56 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
                        onClick={() => scrollHorizontally("prev")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 4.293a1 1 0 00-1.414 0L7.293 8.293a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L9.414 9l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        className="absolute right-8 top-56 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
                        onClick={() => scrollHorizontally("next")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L11.707 9l-3.293 3.293a1 1 0 11-1.414-1.414L9.414 9 7.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );


};

export default PopularDestinationSection;

import React, { useState } from 'react';

const ServicesCategorySection = () => {
    const [isHovered, setIsHovered] = useState(false);

    const categories = [
        { title: "All inclusive", img: null }, // No image provided
        { title: "Spa", img: null },
        { title: "Cabin", img: null },
        { title: "Apart hotel", img: null },
        { title: "Pet friendly", img: null },
        { title: "Pet friendly", img: null },
        { title: "Pet friendly", img: null },
        { title: "Pet friendly", img: null },
    ];

    // Function to scroll horizontally
    function scrollHorizontally(direction) {
        const container = document.querySelector(".overflow-x-auto");
        const scrollAmount = direction === "prev" ? -300 : 300; // Adjust scroll amount
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    const defaultImage = "https://seaprincess.com/cdn/uploads/Deluxe-Room-12.jpg";

    return (
        <div
            className="relative w-full bg-white py-8 px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className="text-center sm:text-start text-2xl font-semibold mb-6 font-TTHovesRegular ml-10">Discover your new favourite stay</h2>
            <div className="overflow-x-auto flex gap-4 py-4 hide-scrollbar max-w-6xl m-auto">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[230px] h-[300px] rounded-2xl overflow-hidden relative cursor-pointer"
                    >
                        <img
                            src={category.img || defaultImage}
                            alt={category.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 duration-300"></div>
                        <div className="p-4 text-center font-TTHovesBold text-white absolute bottom-0">{category.title}

                        </div>
                    </div>
                ))}
            </div>
            {/* Show prev/next buttons when hovered */}
            {isHovered && (
                <>
                    <button
                        className="absolute left-8 top-64 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
                        onClick={() => scrollHorizontally("prev")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 4.293a1 1 0 00-1.414 0L7.293 8.293a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L9.414 9l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        className="absolute right-8 top-64 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
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

export default ServicesCategorySection;

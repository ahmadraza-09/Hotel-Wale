import React, { useState } from 'react';

const EcoRetreatPopularDestination = () => {
    const [isHovered, setIsHovered] = useState(false);

    const categories = [
        { title: "Eco Retreat Konark", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/konark6.1f3ae39aa5e6de64d68b.jpg' }, // No image provided
        { title: "Eco Retreat Satkosia", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/satkosia9.fc63600c297f538841fd.jpg' },
        { title: "Eco Retreat Putsil", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/putsil1.fd3edc14980b77fcdd51.jpg' },
        { title: "Eco Retreat Sonapur", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/sonapur5.71c5b51d20120affd70a.jpg' },
        { title: "Eco Retreat Daringbadi", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/daringbadi2.d007045721e085128ac3.jpg' },
        { title: "Eco Retreat Hirakud", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/hirakud1.9839b07b9cdab1d4d39e.jpg' },
        { title: "Eco Retreat Bhitarkanika", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/bhitarkanika2.3f71c0db3a3a6f11e158.jpg' },
    ];

    // Function to scroll horizontally
    function scrollHorizontally(direction) {
        const container = document.querySelector(".eco-retreat-container");
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
            <h2 className="text-center sm:text-start text-xl sm:text-2xl mb-6 font-TTHovesMedium sm:ml-10">Explore Eco Retreat Odisha in popular destinations</h2>
            <div className="overflow-x-auto eco-retreat-container flex gap-4 py-4 hide-scrollbar max-w-6xl m-auto scroll-smooth">
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
                        className="absolute left-8 top-56 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer hidden sm:inline-flex"
                        onClick={() => scrollHorizontally("prev")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 4.293a1 1 0 00-1.414 0L7.293 8.293a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L9.414 9l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        className="absolute right-8 top-56 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer hidden sm:inline-flex"
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

export default EcoRetreatPopularDestination;

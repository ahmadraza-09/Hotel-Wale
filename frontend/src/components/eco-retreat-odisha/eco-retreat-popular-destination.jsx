import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EcoRetreatPopularDestination = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const navigate = useNavigate();

    // Sync theme for icon switching, but do NOT manipulate document.documentElement here
    useEffect(() => {
        const syncTheme = () => {
            setTheme(localStorage.getItem("theme") || "light");
        };
        window.addEventListener("storage", syncTheme);
        window.addEventListener("themechange", syncTheme);
        return () => {
            window.removeEventListener("storage", syncTheme);
            window.removeEventListener("themechange", syncTheme);
        };
    }, []);

    const categories = [
        { title: "Eco Retreat Konark", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/konark6.1f3ae39aa5e6de64d68b.jpg', path: "/eco-retreat/konark" },
        { title: "Eco Retreat Satkosia", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/satkosia9.fc63600c297f538841fd.jpg', path: "/eco-retreat/satkosia" },
        { title: "Eco Retreat Putsil", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/putsil1.fd3edc14980b77fcdd51.jpg', path: "/eco-retreat/putsil" },
        { title: "Eco Retreat Sonapur", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/sonapur5.71c5b51d20120affd70a.jpg', path: "/eco-retreat/sonapur" },
        { title: "Eco Retreat Daringbadi", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/daringbadi2.d007045721e085128ac3.jpg', path: "/eco-retreat/daringbadi" },
        { title: "Eco Retreat Hirakud", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/hirakud1.9839b07b9cdab1d4d39e.jpg', path: "/eco-retreat/hirakud" },
        { title: "Eco Retreat Bhitarkanika", state: "Odisha, India", img: 'https://ecoretreatodisha.in/static/media/bhitarkanika2.3f71c0db3a3a6f11e158.jpg', path: "/eco-retreat/bhitarkanika" },
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
            className="relative w-full bg-white dark:bg-gray-900 py-8 px-4 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className="text-center sm:text-start text-xl sm:text-2xl mb-6 font-TTHovesMedium sm:ml-10 text-black dark:text-white">
                Explore Eco Retreat Odisha in popular destinations
            </h2>
            <div className="overflow-x-auto eco-retreat-container flex gap-4 py-4 hide-scrollbar max-w-6xl m-auto scroll-smooth">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(category.path)} // Navigate to the specific path on click
                        className="flex-shrink-0 w-[250px] h-[230px] rounded-2xl overflow-hidden relative cursor-pointer border-[1px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                        <div className='w-full h-34 overflow-hidden'>
                            <img
                                src={category.img || defaultImage}
                                alt={category.title}
                                className="w-full h-40 object-cover"
                            />
                        </div>
                        <div className="px-4 py-2 text-start absolute bottom-0 z-10 bg-white dark:bg-gray-900 text-black dark:text-white w-full">
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
                        className="absolute left-8 top-56 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg cursor-pointer hidden sm:inline-flex"
                        onClick={() => scrollHorizontally("prev")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 4.293a1 1 0 00-1.414 0L7.293 8.293a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L9.414 9l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        className="absolute right-8 top-56 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg cursor-pointer hidden sm:inline-flex"
                        onClick={() => scrollHorizontally("next")}
                    >
                        <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.44 12 9.3 7.82a1.08 1.08 0 0 1 0-1.52 1.05 1.05 0 0 1 1.5 0l4.88 4.93c.41.42.41 1.1 0 1.52l-4.88 4.93a1.05 1.05 0 0 1-1.5 0 1.1 1.1 0 0 1 0-1.53L13.44 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

export default EcoRetreatPopularDestination;

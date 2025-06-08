import React, { useState, useEffect } from 'react';

const ServicesCategorySection = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Sync dark mode with sidebar/global theme
    useEffect(() => {
        const syncTheme = () => {
            const storedTheme = localStorage.getItem("theme") || "light";
            setTheme(storedTheme);
            if (storedTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        };
        syncTheme();
        window.addEventListener("storage", syncTheme);
        const interval = setInterval(syncTheme, 500); // Poll every 500ms
        return () => {
            window.removeEventListener("storage", syncTheme);
            clearInterval(interval);
        };
    }, []);

    const categories = [
        { title: "Hotel", img: 'https://seaprincess.com/cdn/uploads/Deluxe-Room-12.jpg' },
        { title: "Resort", img: 'https://media.cntraveler.com/photos/53da60a46dec627b149e66f4/master/pass/hilton-moorea-lagoon-resort-spa-moorea-french-poly--110160-1.jpg' },
        { title: "Family Freindly", img: 'https://media.istockphoto.com/id/1442607457/photo/happy-family-on-a-video-call-with-grandmother.jpg?s=612x612&w=0&k=20&c=ACJ6BGFwzE_7Hy_MrbeIe5k_L9JO3c37uunZphswT-Q=' },
        { title: "Villa", img: 'https://www.zeysey.com/storage/image/blog/01J2V8NZ8KFK88H0WER7D0KTWS.jpg' },
        { title: "Houseboat", img: 'https://lakequeenhouseboats.com/wp-content/uploads/2024/11/6-Bed-Room-Ultra-Luxury-Houseboat-scaled-1.webp' },
        { title: "Apartment", img: 'https://images.ctfassets.net/pg6xj64qk0kh/14eEN8wOI3muLPnrCb3SkF/09a58cab0d0775d34870e6921eba875b/Camden-Durham-Apartments-Durham-NC-Pool-with-Grilling-Stations.jpg' },
        { title: "Pet friendly", img: 'https://imageio.forbes.com/specials-images/imageserve/6736704b67bd939a491927f1/dog-and-owner-at-a-hotel-room-with-a-doggy-bed--water-bowl-and-treats/960x0.jpg?height=473&width=711&fit=bounds' },
        { title: "Pool", img: 'https://www.parcjeandrapeau.com/medias/images/divers/complexe-aquatique/bain-libre-baignade-en-famille-piscine-recreative-complexe-aquatique-parc-jean-drapeau-montreal.jpg' },
    ];

    // Function to scroll horizontally
    function scrollHorizontally(direction) {
        const container = document.querySelector(".category-container");
        const scrollAmount = direction === "prev" ? -300 : 300; // Adjust scroll amount
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    const defaultImage = "https://seaprincess.com/cdn/uploads/Deluxe-Room-12.jpg";

    return (
        <div
            className={`relative w-full py-8 px-4 transition-colors ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className={`text-center sm:text-start text-xl sm:text-2xl mb-6 font-TTHovesMedium sm:ml-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
                Discover your new favourite stay
            </h2>
            <div className="overflow-x-auto category-container flex gap-4 py-4 hide-scrollbar max-w-6xl m-auto">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[180px] h-[250px] sm:w-[230px] sm:h-[300px] rounded-2xl overflow-hidden relative cursor-pointer"
                    >
                        <img
                            src={category.img || defaultImage}
                            alt={category.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 duration-300"></div>
                        <div className="p-4 text-center font-TTHovesBold text-white absolute bottom-0">
                            {category.title}
                        </div>
                    </div>
                ))}
            </div>
            {/* Show prev/next buttons when hovered */}
            {isHovered && (
                <>
                    <button
                        className={`absolute left-8 top-64 transform -translate-y-1/2 p-2 rounded-full shadow-lg cursor-pointer hidden sm:inline-flex ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
                        onClick={() => scrollHorizontally("prev")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 4.293a1 1 0 00-1.414 0L7.293 8.293a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L9.414 9l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        className={`absolute right-8 top-64 transform -translate-y-1/2 p-2 rounded-full shadow-lg cursor-pointer hidden sm:inline-flex ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
                        onClick={() => scrollHorizontally("next")}
                    >
                        <svg
                            className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
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

export default ServicesCategorySection;

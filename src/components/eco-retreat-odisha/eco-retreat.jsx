import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ecoRetreatData from "../../data/eco-retreats-data"; // Import the ecoRetreatData
import '../../css/eco-retreat.css'

const EcoRetreat = () => {
    // const { Konark } = ecoRetreatData; // Destructure the Konark data
    const { location } = useParams();
    // const { name, location, images, rooms, cottages, activities, howToReach, topAttractions } = Konark;
    const retreatData = ecoRetreatData[location];

    const {
        name,
        location: retreatLocation,
        images,
        rooms,
        cottages,
        activities,
        howToReach,
        topAttractions,
    } = retreatData;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Update image every 4 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const openModal = (index) => {
        setModalIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const prevSlide = () => {
        setModalIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setModalIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    if (!retreatData.images.length) {
        return <div>Location not found or no images available.</div>;
    }

    return (
        <section className="w-full h-full relative pb-10">
            {/* Hero Section */}
            <div className="relative w-full h-[250px]  sm:h-[50vh] md:h-[100vh]">
                <div
                    className="w-full h-full bg-cover bg-center absolute top-0 left-0 transition-all duration-[1s] ease-in-out z-[1]"
                    style={{
                        backgroundImage: `url(${images[currentIndex]})`, // Use the images from Konark data
                    }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center bg-black bg-opacity-50 z-[2] text-white p-[20px]">
                    <h1 className="uppercase text-[2rem] font-TTHovesBold m-0 sm:text-[3rem]">Eco Retreat <span className="text-[#ee8c26]">{location}</span></h1>
                    <h4>Experience luxury glamping in serene <span className="capitalize">{location}</span>!</h4> {/* You can replace this with a subtitle if you have one */}
                </div>
            </div>

            {/* Welcome Section */}
            <div className="flex flex-col justify-center items-center gap-[20px] py-[20px] px-0 sm:px-[50px]">
                <h4 className="uppercase text-[#ee8c26] font-TTHovesMedium">Welcome To</h4>
                <h1 className="uppercase text-[25px] sm:text-[30px] md:text-[40px] text-center font-TTHovesBold">Eco Retreat <span className="text-[#ee8c26]">{location}</span></h1>
                <p className="text-center">
                    Luxury by the beach - A serene escape for solitude lovers.
                </p>
            </div>

            {/* Rooms Section */}
            <div className="flex items-center flex-wrap justify-center gap-[20px] py-[20px] px-[0px]">
                {rooms.map((room, index) => (
                    <div className={`w-[280px] h-[400px] shadow-custom cursor-pointer relative rounded-[10px] transform hover:scale-105 transition-all duration-300 ease-in-out  eco-retreat-room-card${index + 1}`} key={index}>
                        <img src={room.images[0]} alt={room.name} className="w-full h-full absolute top-0 object-cover rounded-[10px]" />
                        <div className="absolute bottom-0 flex flex-col justify-center p-2 text-white bg-gradient-to-t from-black/80 to-black/0 w-full box-border gap-2 rounded-b-lg">
                            <h3 className="w-fit px-2.5 py-1.5 rounded bg-[#ee8c26] text-base capitalize font-TTHovesBold">{room.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cottages Section */}
            <div className="flex flex-col items-center justify-center gap-5 p-5">
                <h2 class="uppercase text-xl font-TTHovesBold sm:text-2xl md:text-4xl text-center">Discover {location} Cottages</h2>
                <div className="flex items-center justify-around">
                    {/* Displaying the Explore Image */}
                    <div className="md:flex items-start justify-center w-1/2 hidden ">
                        <img src={cottages[0].exploreImages} alt="Explore Konark Cottages" className="w-[350px] rounded-[20px] shadow-[0px_3px_8px_rgba(0,_0,_0,_0.24)]" />
                    </div>

                    <div className="md:w-1/2 w-full  flex flex-col items-center justify-center gap-5 bg-[#ee8c26] text-white p-5 rounded-[20px] shadow-[0px_3px_8px_rgba(0,_0,_0,_0.24)]">
                        {cottages.slice(1).map((cottage, index) => (
                            <div className="max-w-[500px] flex-col border-2 border-white md:b rounded-lg shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-2.5 text-center md:flex items-center justify-center gap-5" key={index}>
                                <div className="max-w-[500px] flex items-center justify-center gap-5">
                                    <img src={cottage.icon} alt={cottage.name} className="w-[100px]" />
                                </div>
                                <div className="eco-retreat-explore-cottage-container-right-box-right mt-2 ">
                                    <h4 className="font-TTHovesBold">{cottage.name}</h4>
                                    <p>{cottage.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {/* Activities Section */}
            <div className="flex flex-col items-center justify-center gap-0 p-5">
                <h4 className=" sm:text-base text-[#ee8c26]">ACTIVITIES</h4>
                <h2 className="text-[25px] font-TTHovesBold sm:text-[40px] text-center">Relish an Action-Packed Escape.</h2>
                <br />
                <div className="flex items-center justify-center gap-5 flex-wrap">
                    {activities.map((activity, index) => (
                        <div className="sm:w-[380px] w-full sm:h-[380px] h-[420px] flex flex-col items-center text-center p-2.5 gap-2.5 rounded-lg justify-center shadow-[0px_3px_8px_rgba(0,_0,_0,_0.24)] transition-all duration-300 ease-in-out hover:scale-105" key={index}>
                            <img src={activity.icon} alt={activity.name} /> {/* Display activity icon */}
                            <h3 className="text-[25px]">{activity.name}</h3>
                            <p className="text-[14px]"> {activity.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How to Reach Section */}
            <div className="flex flex-col items-center justify-center p-5">
                <h4 className="text-[#ee8c26] uppercase">Destination</h4>
                <h2 className="text-[25px] font-TTHovesBold sm:text-[30px] md:text-[40px]">How to Reach <span className="capitalize">{location}</span></h2>
                <br />
                <div className="w-full flex items-center justify-center">
                    <div className="w-1/2 hidden">
                        <img src={howToReach.destinationImage} alt="Destination" className="w-full" />
                    </div>
                    <div className="w-full">
                        <div className="travel-info">
                            {howToReach.byAir && (
                                <div className="travel-section">
                                    <h3>By Air</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Airport</th>
                                                <th>Distance</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{howToReach.byAir.airport}</td>
                                                <td>{howToReach.byAir.distance}</td>
                                                <td>{howToReach.byAir.time}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {howToReach.byRail && (
                                <div className="travel-section">
                                    <h3>By Rail</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Railway Station</th>
                                                <th>Distance</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {howToReach.byRail.map((station, index) => (
                                                <tr key={index}>
                                                    <td>{station.station}</td>
                                                    <td>{station.distance}</td>
                                                    <td>{station.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {howToReach.byRoad && (
                                <div className="travel-section">
                                    <h3>By Road</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>City</th>
                                                <th>Kilometers</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {howToReach.byRoad.map((city, index) => (
                                                <tr>
                                                    <td>{city.city}</td>
                                                    <td>{city.distance}</td>
                                                    <td>{city.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Eco Retreat Attractions */}
            <div className="flex flex-col items-center justify-center p-5">
                <h4 className="text-[#ee8c26] uppercase">Attractions</h4>
                <h2 className="text-[25px] font-TTHovesBold sm:text-[30px] md:text-[40px] text-center ">Top Attractions in <span className="capitalize">{location}</span></h2>
                <br />
                <div className="flex items-center justify-center gap-5 flex-wrap">
                    {topAttractions.map((attraction, index) => (
                        <div className="w-[320px] h-[420px] sm:w-[380px] sm:h-[480px] shadow-[0px_3px_8px_rgba(0,0,0,0.24)] relative rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" key={index}>
                            <img src={attraction.image} alt={attraction.name} className="w-full h-full absolute top-0 object-cover rounded-lg" />
                            <div className="absolute bottom-0 w-full h-fit flex flex-col justify-center p-2.5 text-white bg-gradient-to-t from-black/80 to-transparent box-border gap-2.5 rounded-bl-lg rounded-br-lg">
                                <h3 className="w-fit px-2.5 py-1.25 rounded-sm bg-[#ee8c26] text-xl uppercase font-TTHovesBold">{attraction.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="text-center text-[25px] sm:text-[30px] font-TTHovesBold">Eco Retreat <span className=" capitalize">{location}</span> Gallery</h2>

            {/* Eco Retreat Gallery */}
            <div className="flex flex-wrap gap-5 my-5 justify-center px-5 py-5">

                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Eco Retreat ${name} ${index + 1}`}
                        className="w-full h-[180px] sm:w-[300px] sm:h-[200px] md:w-[350px] md:h-[200px] object-cover cursor-pointer transition-transform duration-300 rounded-lg hover:scale-105"
                        onClick={() => openModal(index)}
                    />
                ))}
            </div>

            {/* Modal for Fullscreen Image */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-[1000]">
                    <div className="w-[80%] max-w-[900px]">
                        <button className="modal-close absolute top-[20px] right-[40px] bg-none text-white text-[30px] border-none cursor-pointer
" onClick={closeModal}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <button className="absolute top-1/2 transform -translate-y-1/2 bg-none text-white text-[40px] border-none cursor-pointer
left-[20px]" onClick={prevSlide}>
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <img
                            src={images[modalIndex]}
                            alt={`Eco Retreat ${name} Fullscreen`}
                            className="max-w-[800px] w-full h-[80%] rounded-[8px]
"
                        />
                        <button className="absolute top-1/2 transform -translate-y-1/2 bg-none text-white text-[40px] border-none cursor-pointer
right-[20px]" onClick={nextSlide}>
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
};

export default EcoRetreat;

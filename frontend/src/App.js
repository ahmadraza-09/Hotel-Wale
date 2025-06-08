import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page';
import HotelHomePage from './pages/hotel-pages/hotel-home-page';
import BusHomePage from './pages/bus-pages/bus-home-page';
import HotelListPage from './pages/hotel-pages/hotel-list-page';
import EcoRetreatPage from './pages/eco-retreat-page/eco-retreat-page';
import HotelDetailsPage from './pages/hotel-pages/hotel-details-page';
import ProfilePage from './pages/home-page/profile-page';
import { ToastContainer } from 'react-toastify';

const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hotels' element={<HotelHomePage />} />
          <Route path='/bus' element={<BusHomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/hotels/:city' element={<HotelListPage />} />
          <Route path='/hotels/:city/:hotelName' element={<HotelDetailsPage />} />
          <Route path='/eco-retreat/:location' element={<EcoRetreatPage />} />

        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

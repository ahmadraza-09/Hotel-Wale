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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/hotels' element={<HotelHomePage />} />
        <Route path='/bus' element={<BusHomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/hotels/:city' element={<HotelListPage />} />
        <Route path='/hotels/:city/:name' element={<HotelDetailsPage />} />
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
  );
}

export default App;

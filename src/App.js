import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page';
import HotelHomePage from './pages/hotel-pages/hotel-home-page';
import BusHomePage from './pages/bus-pages/bus-home-page';
import HotelListPage from './pages/hotel-pages/hotel-list-page';
import EcoRetreatPage from './pages/eco-retreat-page/eco-retreat-page';
import HotelDetailsPage from './pages/hotel-pages/hotel-details-page';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hotels' element={<HotelHomePage />} />
          <Route path='/bus' element={<BusHomePage />} />
          <Route path='/hotels/:city' element={<HotelListPage />} />
          <Route path='/hotels/:city/:hotelName' element={<HotelDetailsPage />} />
          <Route path='/eco-retreat/:location' element={<EcoRetreatPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page';
import HotelHomePage from './pages/hotel-pages/hotel-home-page';
import BusHomePage from './pages/bus-pages/bus-home-page';
import HotelListPage from './pages/hotel-pages/hotel-list-page';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hotel' element={<HotelHomePage />} />
          <Route path='/bus' element={<BusHomePage />} />
          <Route path='/hotel/:city' element={<HotelListPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import PrivateRoute from "./components/private-route";
import AdminLogin from "./components/admin-login";
import DashboardPage from "./pages/dashboard-page";
import SuperAdminPage from "./pages/super-admin";
import { ToastContainer } from 'react-toastify';
import SettingPage from "./pages/setting-page";
import ListingsPage from "./pages/listings-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/super-dashboard"
          element={
            <PrivateRoute>
              <SuperAdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;

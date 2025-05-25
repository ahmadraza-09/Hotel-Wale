import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import PrivateRoute from "./components/private-route";
import AdminLogin from "./components/admin-login";
import DashboardPage from "./pages/dashboard-page";
import SuperAdminPage from "./pages/super-admin";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
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
    </Router>
  );
}

export default App;

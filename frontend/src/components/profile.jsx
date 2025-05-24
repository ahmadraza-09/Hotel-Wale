import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router

const Profile = () => {
  const [user, setUser] = useState(null);
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getProfileData = () => {
    axios
      .get(`http://localhost:5000/auth/singleuserlist/${user_id}`)
      .then((response) => {
        const userData = response.data.message[0];
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  useEffect(() => {
    if (user_id) {
      getProfileData();
    }
  }, [user_id]);

  if (!token) {
    navigate("/hotels");
  }

  const handleLogout = () => {
    localStorage.clear(); // Clears all stored items, or use removeItem if you want selective clearing
    navigate("/hotels");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        Failed to load user profile.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xl border-2 border-gray-300">
      <div className="flex items-center space-x-6 mb-8">
        {/* <img
          src={user.profile_picture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        /> */}
        <div>
          <h2 className="text-4xl font-semibold text-blue-700">
            👤 {user.full_name}
          </h2>
          <p className="text-xl text-gray-600">
            {user.location || "Traveler's Paradise"}
          </p>
        </div>
      </div>

      <div className="space-y-4 text-lg text-gray-700">
        <div className="flex justify-between">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <strong>Mobile Number:</strong> <span>{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <strong>Favorite Destination:</strong>{" "}
          <span>{user.favorite_destination || "Not Set"}</span>
        </div>
        <div className="flex justify-between">
          <strong>Number of Trips:</strong>{" "}
          <span>{user.number_of_trips || 0}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
          Update Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

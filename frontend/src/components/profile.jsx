import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from "../assets/icons/user-icon.svg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getProfileData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/auth/singleuserlist/${user_id}`)
      .then((response) => {
        const userData = response.data.message[0];
        setUser(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setError(true);
        setLoading(false);
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
    localStorage.clear();
    navigate("/hotels");
  };

  // When user selects a file, set it and create preview URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "profile_images");
    formData.append("cloud_name", "doba6b7bx");

    try {
      // Step 1: Upload to Cloudinary
      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/doba6b7bx/image/upload",
        formData
      );

      const imageUrl = cloudinaryRes.data.url;
      console.log("Cloudinary Image URL:", imageUrl);

      // Step 2: Send image URL to backend
      const backendRes = await axios.put(
        `http://localhost:5000/auth/uploadprofile/${user_id}`,
        { profile_image: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend response:", backendRes.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        Failed to load user profile.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xl border-2 border-gray-300">
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={user.profile_image || User}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h2 className="text-4xl font-semibold text-blue-700">
            {user.full_name}
          </h2>
          <p className="text-xl text-gray-600">
            {user.location || "Traveler's Paradise"}
          </p>
        </div>
      </div>

      {/* Image upload input */}
      {user.profile_image == null && (
        <div className="mb-6 flex items-center gap-4">
          <label className="relative cursor-pointer bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition duration-200">
            <span>Upload Profile</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>

          {selectedFile && (
            <button
              onClick={handleUpload}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200 shadow-sm"
            >
              Upload
            </button>
          )}
        </div>
      )}

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

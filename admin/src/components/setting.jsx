import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const user_id = localStorage.getItem("user_id");

  const [formValues, setFormValues] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    emailNotification: false,
    smsNotification: false,
  });

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch profile data
  const getProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/admin/singleadminlist/${user_id}`
      );
      const userData = response.data.message[0];

      setUser(userData);
      setFormValues(userData); // Set form values from fetched data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_id) {
      getProfileData();
    }
  }, [user_id]);

  // Simulated save function – replace with your API call
  const handleSave = () => {
    axios
      .put(`http://localhost:5000/admin/updateadmin/${user_id}`, formValues)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Updated Successfully");
          setIsEditing(false);
          getProfileData();
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Error updating profile");
        }
      });
  };

  const handleCancel = () => {
    setFormValues(user); // Reset form values to original
    setIsEditing(false);
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Failed to load data.</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Personal Info */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="space-y-3">
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={formValues.full_name}
            readOnly={!isEditing}
            onChange={(e) =>
              setFormValues({ ...formValues, full_name: e.target.value })
            }
          />
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={formValues.phone}
            readOnly={!isEditing}
            onChange={(e) =>
              setFormValues({ ...formValues, phone: e.target.value })
            }
          />
          <input
            type="email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={formValues.email}
            readOnly={!isEditing}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </div>
      </div>

      {/* Account Security */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Security</h2>
        <div className="space-y-3">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={formValues.password}
            readOnly={!isEditing}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
          {isEditing && (
            <button
              type="button"
              className="text-sm text-blue-600 underline"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Settings</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formValues.emailNotification}
              disabled={!isEditing}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  emailNotification: e.target.checked,
                })
              }
            />
            Receive email notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formValues.smsNotification}
              disabled={!isEditing}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  smsNotification: e.target.checked,
                })
              }
            />
            Receive SMS notifications
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="text-right space-x-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-[#D4B1A4] text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#D4B1A4] text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;

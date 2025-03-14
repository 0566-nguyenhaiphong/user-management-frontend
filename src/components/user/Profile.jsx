import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updateData = { name, email };
      if (password) updateData.password = password;

      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/api/user/${user.id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Cập nhật thành công!");
      console.log("Saved Data:", response.data);
      setIsEditing(false);
      setPassword("");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error.response?.data || error.message);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-yellow-400 to-red-500">
      {user ? (
        <div className="p-10 bg-white shadow-2xl rounded-3xl text-center w-96">
          <h2 className="text-3xl font-bold mb-6">Thông tin cá nhân</h2>
          <div className="text-left space-y-4">
            <InfoField label="ID" value={user.id} disabled />
            <InfoField
              label="Tên"
              value={name}
              setValue={setName}
              isEditing={isEditing}
            />
            <InfoField
              label="Email"
              value={email}
              setValue={setEmail}
              isEditing={isEditing}
              type="email"
            />
            <InfoField
              label="Mật khẩu mới"
              value={password}
              setValue={setPassword}
              isEditing={isEditing}
              type="password"
              placeholder="Nhập mật khẩu mới..."
            />
          </div>
          <div className="mt-6">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Lưu
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Sửa
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

const InfoField = ({
  label,
  value,
  setValue,
  isEditing,
  disabled = false,
  type = "text",
  placeholder = "",
}) => (
  <label className="block">
    <strong>{label}:</strong>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue && setValue(e.target.value)}
      disabled={disabled || !isEditing}
      className={`w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "focus:ring-yellow-500"
      }`}
    />
  </label>
);

export default Profile;

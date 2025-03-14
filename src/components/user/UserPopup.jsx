const UserPopup = ({
  isOpen,
  closePopup,
  handleSubmit,
  formData,
  setFormData,
  editUser,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={closePopup}
    >
      <div
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">
          {editUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700">Tên:</span>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Mật khẩu:</span>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={
              editUser ? "Để trống nếu không đổi mật khẩu" : "Nhập mật khẩu"
            }
          />
        </label>

        <div className="flex justify-end gap-4">
          <button
            onClick={closePopup}
            className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition duration-300"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-xl ${
              loading ? "bg-gray-500" : "bg-blue-500"
            } text-white hover:bg-blue-600 transition duration-300`}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : editUser ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;

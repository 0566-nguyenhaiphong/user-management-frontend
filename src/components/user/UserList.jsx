import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import UserPopup from "./UserPopup";

const UserList = ({
  users,
  handleDelete,
  page,
  setPage,
  totalPages,
  fetchUsers,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchUsers();
  }, [page, fetchUsers]);

  const openPopup = (user = null) => {
    setEditUser(user);
    setFormData(
      user
        ? { name: user.name, email: user.email, password: "", role: user.role }
        : { name: "", email: "", password: "", role: "user" }
    );
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditUser(null);
  };

  const handleSubmit = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      (!editUser && !formData.password.trim()) ||
      !formData.role
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    const method = editUser ? "PUT" : "POST";
    const endpoint = editUser ? `/api/users/${editUser.id}` : "/api/add";
    const url = `${API_BASE_URL}${endpoint}`;

    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert(editUser ? "Cập nhật thành công!" : "Thêm thành công!");
      closePopup();
      fetchUsers();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Có lỗi xảy ra!");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
      <button
        onClick={() => openPopup()}
        className="bg-green-500 text-white py-2 px-4 rounded-3xl flex gap-3 items-center justify-center w-[120px] hover:bg-green-600 transition duration-300"
      >
        Thêm <IoMdAdd />
      </button>

      <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">ID</th>
            <th className="border p-3">Tên</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Vai trò</th>
            <th className="border p-3">Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border text-center">
              <td className="p-3">{user.id}</td>
              <td className="p-3 truncate">{user.name}</td>
              <td className="p-3 truncate">{user.email}</td>
              <td className="p-3 truncate">{user.role}</td>
              <td className="flex gap-5 items-center justify-center p-3">
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-600 transition duration-300"
                  onClick={() => handleDelete(user.id)}
                />
                <FaEdit
                  className="text-blue-500 cursor-pointer hover:text-blue-600 transition duration-300"
                  onClick={() => openPopup(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      <UserPopup
        isOpen={isPopupOpen}
        closePopup={closePopup}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editUser={editUser}
        loading={loading}
      />
    </div>
  );
};

export default UserList;

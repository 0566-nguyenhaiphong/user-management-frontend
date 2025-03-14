import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/user/Profile";
import UserList from "../components/user/UserList";

const Dashboard = ({ setUserInApp }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const profileRes = await fetch(`${API_BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!profileRes.ok) throw new Error("Unauthorized");
      const profileData = await profileRes.json();
      setUser(profileData.user);
      setUserInApp(profileData.user); // Truyền thông tin người dùng lên App

      if (profileData.user.role === "admin") {
        const usersRes = await fetch(`${API_BASE_URL}/api/users?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!usersRes.ok) throw new Error("Unauthorized");
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
        setTotalPages(usersData.total_pages || 1);
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [API_BASE_URL, page, token, navigate, setUserInApp]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá người dùng này không?"))
      return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      alert("Xoá thành công!");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch {
      alert("Xoá thất bại!");
    }
  };

  if (user === null) return <p>Loading...</p>;
  return user.role === "admin" ? (
    <UserList
      users={users}
      handleDelete={handleDelete}
      page={page}
      setPage={setPage}
      totalPages={totalPages}
    />
  ) : (
    <Profile user={user} />
  );
};

export default Dashboard;

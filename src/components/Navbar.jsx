import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white shadow-lg">
      <Link
        to="/dashboard"
        className="font-bold text-xl hover:text-gray-300 transition duration-300"
      >
        Trang Chủ
      </Link>
      <div className="flex items-center gap-4">
        {user && <span className="font-semibold">Xin chào {user.name}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          {token ? "Đăng xuất" : "Đăng nhập"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

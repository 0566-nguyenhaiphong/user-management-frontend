import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        setError(data.error || "Có lỗi xảy ra!");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white shadow-2xl rounded-3xl flex flex-col items-center gap-6 w-96"
      >
        <h2 className="text-3xl font-bold text-gray-700 mb-4 text-center">
          Đăng Ký
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          className="block border p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          name="name"
          placeholder="Tên"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="block border p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="block border p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 text-white p-4 w-full rounded-2xl hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đăng Ký"}
        </button>
      </form>
    </div>
  );
};

export default Register;

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Sai tài khoản hoặc mật khẩu!");
      }

      localStorage.setItem("token", data.token);
      alert("Đăng nhập thành công!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white shadow-2xl rounded-3xl flex flex-col items-center gap-6 w-96"
      >
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Đăng Nhập</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="block border p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="block border p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          name="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
        />
        <button className="bg-green-500 text-white p-4 w-full rounded-2xl hover:bg-green-600 transition duration-300">
          Đăng Nhập
        </button>
        <button
          className="text-blue-500 hover:underline mt-4"
          onClick={() => navigate("/register")}
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Login;

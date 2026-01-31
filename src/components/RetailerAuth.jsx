import { useState } from "react";
import { Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RetailerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;

      if (isLogin) {
        result = await login({
          email: form.email,
          password: form.password,
        });
      } else {
        result = await register(form);
      }

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Successfully logged in or registered
      navigate("/setup");
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form
        onSubmit={submit}
        className="bg-white border-2 border-gray-200 p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-black flex gap-3 items-center justify-center text-gray-900">
          <Store className="text-yellow-500" size={32} /> StockSathi
        </h1>
        <p className="text-center text-gray-600 text-sm">Manage your retail inventory smart</p>

        {!isLogin && (
          <input
            id="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            onChange={handleChange}
            required
            value={form.name}
          />
        )}

        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
          onChange={handleChange}
          required
          value={form.email}
        />

        <input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
          onChange={handleChange}
          required
          value={form.password}
        />

        {!isLogin && (
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            onChange={handleChange}
            required
            value={form.confirmPassword}
          />
        )}

        {error && <p className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>

        <p
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setForm({ name: "", email: "", password: "", confirmPassword: "" });
          }}
          className="text-sm text-center text-yellow-600 cursor-pointer hover:text-yellow-700 transition font-medium"
        >
          {isLogin ? "Create account instead" : "Already have an account?"}
        </p>
      </form>
    </div>
  );
}

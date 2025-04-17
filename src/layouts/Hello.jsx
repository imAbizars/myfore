import React, { useState } from "react";
import { useLogin } from "@/hooks/auth/uselogin";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const loginMutation = useLogin({
    onSuccess: (data) => {
      const role = data.user.role;
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/menu");
      }
    },
    onError: (error) => {
      alert("Login failed: " + error.response?.data?.message || error.message);
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(form); // <- kirim { email, password }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

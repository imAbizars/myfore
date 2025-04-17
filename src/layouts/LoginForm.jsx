import React, { useState } from "react";
import { useLogin } from "@/hooks/auth/uselogin";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { mutate: login, isPending, error } = useLogin({
    onSuccess: (data) => {
      const role = data.user?.role?.toLowerCase();
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/menu");
      }
    },
    onError: (err) => {
      console.error("Login failed:", err.response?.data || err.message);
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data dikirim:", formData)
    login(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
        {error && (
          <p className="text-red-600 mt-2">
            {error.response?.data?.message || "Login gagal"}
          </p>
        )}
      </form>
    </div>
  );
}

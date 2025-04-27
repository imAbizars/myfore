import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "@/hooks/auth/usecreateuser";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber:"",
    address:""
  });

  const navigate = useNavigate();

  const { mutate: register, isPending, error } = useCreateUser({
    onSuccess: () => {
      alert("Registrasi berhasil! Silakan login.");
      navigate("/");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Registrasi gagal");
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
    console.log("Form data yang dikirim:", formData);
    register(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nama</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="text"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1">phonenumber</label>
          <input
            type="text"
            name="phonenumber"
            className="w-full border p-2 rounded"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1">address</label>
          <input
            type="text"
            name="address"
            className="w-full border p-2 rounded"
            value={formData.address}
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
          {isPending ? "Mendaftarkan..." : "Daftar"}
        </Button>
        {error && (
          <p className="text-red-600 mt-2">
            {error.response?.data?.message || "Registrasi gagal"}
          </p>
        )}
      </form>
      
    </div>
  );
}

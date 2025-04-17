import React, { useState,useEffect } from "react";
import { Menu, X } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import ProductContent from "@/dashboard/products/products"; // Import komponen produk

export default function Dashboard() {
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pesanan");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Hamburger */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-200 bg-opacity-20 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-lg font-bold">Dashboard</span>
          <button onClick={toggleSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("pesanan")}
            className={`block w-full text-left p-2 rounded hover:bg-gray-700 ${
              activeTab === "pesanan" ? "bg-gray-700" : ""
            }`}
          >
            Pesanan User
          </button>
          <button
            onClick={() => setActiveTab("product")}
            className={`block w-full text-left p-2 rounded hover:bg-gray-700 ${
              activeTab === "product" ? "bg-gray-700" : ""
            }`}
          >
            Produk
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-4 pt-10">
        {activeTab === "pesanan" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Pesanan</h1>
            <div className="bg-white p-4 rounded shadow">
              <p>Daftar pesanan user akan muncul di sini.</p>
            </div>
          </>
        )}

        {activeTab === "product" && <ProductContent />}
      </main>
    </div>
  );
}

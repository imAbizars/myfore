import React, { useState,useEffect } from "react";
import { Menu, X,NotepadText ,Coffee} from "lucide-react";
import ProductContent from "./layouts/products/Products"; 
import PesanContent from "./layouts/pesan/Pesan";

export default function Dashboard() {
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pesanan");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-[#ACC572]">
      
      {/* Hamburger */}
      <div className="sticky top-0 p-2 w-full h-15 bg-[#ACC572] ">
        {!sidebarOpen && (
          <button
            className="md:hidden  border-2 border-white rounded-sm ml-2"
            onClick={toggleSidebar}
          >
            <Menu className="w-8 h-8 text-white  " />
          </button>
        )}
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-20 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#ACC572] text-white z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 ">
          <span className="text-lg font-bold">Dashboard</span>
          <button onClick={toggleSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => {
              setActiveTab("pesanan");
              setSidebarOpen(false);
            }}
            className={`flex w-full font-bold text-left p-2  rounded hover:bg-[#B8D575] ${
              activeTab === "pesanan" ? "bg-[#B8D575]" : ""
            }`}
          ><NotepadText className="mr-2"/>
            Pesanan User
          </button>
          <button
            onClick={() => {
              setActiveTab("product");
              setSidebarOpen(false);
            }}
            className={`flex w-full text-left p-2 rounded hover:bg-[#B8D575] ${
              activeTab === "product" ? "bg-[#B8D575]" : ""
            }`}
          ><Coffee className="mr-2"/>
            Produk
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-4 ">
        {activeTab === "pesanan" && <PesanContent/>}
        {activeTab === "product" && <ProductContent/>}
      </main>
    </div>
  );
}

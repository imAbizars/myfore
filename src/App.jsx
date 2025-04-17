import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 

import Hello from "./layouts/Hello";
import Menu from "./layouts/Menu";
import Dashboard from "./dashboard/Dashboard";
import "./App.css";
import LoginForm from "./layouts/LoginForm";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <Router>
        <div className="border border-black h-screen">
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

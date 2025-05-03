import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 

import Menu from "./pages/Menu";
import Dashboard from "./dashboard/Dashboard";
import "./App.css";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/RegisterForm";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <Router>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

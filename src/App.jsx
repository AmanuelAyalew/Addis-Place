import React from "react";
import "./index.css";
import Home from "./Componenets/Home";
import ResturantList from "./Booking/ResturantList";
import { Routes, Route } from "react-router-dom";
import Header from "./Componenets/Header";
import Footer from "./Componenets/Footer";
import AdminDashboard from "./Componenets/AdminDashboard";

// Main App Component
const App = () => {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-[calc(100vh-5rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<ResturantList />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;

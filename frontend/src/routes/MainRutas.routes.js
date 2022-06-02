import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import FormVehiculos from "../pages/FormVehiculos.pages";
import Vehiculos from "../pages/Vehiculos.pages";

const MainRutas = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Vehiculos />} />
        <Route path="/vehiculos/add" element={<FormVehiculos />} />
        <Route path="/vehiculos/edit/:id" element={<FormVehiculos />} />
      </Routes>
    </Router>
  );
};

export default MainRutas;

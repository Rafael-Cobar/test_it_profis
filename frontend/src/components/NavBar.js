import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Mi Camioncito
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse bg-dark" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 bg-dark">
            <li className="nav-item dropdown bg-dark">
              <NavLink
                className="nav-link dropdown-toggle bg-dark"
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Vehiculos
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Mostrar Todos
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/vehiculos/add">
                    Agregar Nuevo
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

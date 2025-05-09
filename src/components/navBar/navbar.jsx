import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isAdmin, onLogout, usuario }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">Charlas TIC</div>
      <ul className="navbar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Inicio</Link>
        </li>
        <li className={location.pathname === "/Profile" ? "active" : ""}>
          <Link to="/profile">Perfil</Link>
        </li>
        <li className={location.pathname === "/charlas" ? "active" : ""}>
          <Link to="/charlas">Charlas</Link>
        </li>
        {/* Mostrar opciones de admin solo si es admin */}
        {isAdmin && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </>
        )}
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about">Acerca de</Link>
        </li>
      </ul>
      {usuario && (
        <div className="navbar-user-info">
          <span>Bienvenid@, {usuario.nombre}</span>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

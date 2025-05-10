import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { React, useState, useEffect } from "react";
import Home from "./views/Home/Home";
import LoginForm from "./views/login/login";
import TalkList from "./views/talks/talkList";
import Profile from "./views/profile/profile";
import Dashboard from "./views/dashboard/dashboard";
import Navbar from "./components/navBar/navbar";
import TalkDetail from "./views/talks/talkDetail";
import Register from "./views/register/register";
import About from "./views/about/about";
import "./App.css";

// Constantes para evitar errores de escritura en localStorage
const USUARIOS_KEY = "usuariosRegistrados";
const USUARIO_ACTUAL_KEY = "usuarioActual";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(
    JSON.parse(localStorage.getItem("usuariosRegistrados")) || []
  );
  const [modo, setModo] = useState("login");
  const [cargando, setCargando] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const datosGuardados = localStorage.getItem(USUARIOS_KEY);
    const usuarioGuardado = localStorage.getItem(USUARIO_ACTUAL_KEY);

    if (datosGuardados) {
      setUsuariosRegistrados(JSON.parse(datosGuardados));
    }

    if (usuarioGuardado) {
      console.log("Usuario guardado en localStorage:", usuarioGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }

    // Configura el estado de carga como falso después de obtener los datos
    setCargando(false);
  }, []);

  const handleLogin = (usuario) => {
    console.log("Usuario logueado:", usuario);
    setUsuario(usuario);
    localStorage.setItem(USUARIO_ACTUAL_KEY, JSON.stringify(usuario));
  };

  const handleRegister = (nuevoUsuario) => {
    const yaExiste = usuariosRegistrados.some(
      (u) => u.email === nuevoUsuario.email
    );

    if (yaExiste) {
      alert("Este correo ya está registrado");
      return;
    }

    // Asignar rol según el correo
    const rol =
      nuevoUsuario.email.toLowerCase() === "admin@ejemplo.com"
        ? "admin"
        : "estudiante";

    const nuevoRegistro = { ...nuevoUsuario, rol };
    const nuevaLista = [...usuariosRegistrados, nuevoRegistro];

    setUsuariosRegistrados(nuevaLista);
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(nuevaLista));

    alert("Registro exitoso. Ahora puedes iniciar sesión");
    setModo("login");
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem(USUARIO_ACTUAL_KEY);
  };

  const isAdmin = usuario?.rol === "admin";

  // Si aún está cargando, muestra una pantalla de carga
  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar isAdmin={isAdmin} onLogout={handleLogout} usuario={usuario} />
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/login"
          element={
            usuario ? (
              <Navigate to={isAdmin ? "/dashboard" : "/charlas"} />
            ) : (
              <LoginForm
                onLogin={handleLogin}
                usuariosRegistrados={usuariosRegistrados}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            usuario ? (
              <Navigate to="/charlas" />
            ) : (
              <Register
                onRegister={handleRegister}
                goToLogin={() => setModo("login")}
              />
            )
          }
        />
        <Route path="*" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Rutas protegidas */}
        <Route
          path="/charlas"
          element={usuario ? <TalkList /> : <Navigate to="/login" />}
        />
        <Route
          path="/charla/:id"
          element={usuario ? <TalkDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            usuario ? <Profile usuario={usuario} /> : <Navigate to="/login" />
          }
        />

        {/* Rutas solo para admin */}
        <Route
          path="/dashboard"
          element={isAdmin ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;

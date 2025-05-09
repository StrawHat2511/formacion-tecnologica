import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/formWrapper/formWrapper";

const LoginForm = ({ onLogin, usuariosRegistrados, setUsuarioActual }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuariosRegistrados) {
      alert("No hay usuarios registrados.");
      return;
    }

    // Verificar si las credenciales existen
    const usuario = usuariosRegistrados.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuario) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    // Guardar el usuario actual en el estado o localStorage
    onLogin(usuario);
    //localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    // Redirigir según el rol
    if (usuario.rol === "admin") {
      navigate("/dashboard"); // Redirige al dashboard del admin
    } else {
      navigate("/home"); // Redirige al home del estudiante
    }
  };

  return (
    <FormWrapper
      title="Iniciar Sesión"
      footer={
        <p>
          ¿No tienes cuenta?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Regístrate aquí
          </span>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="form">
        <label>Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;

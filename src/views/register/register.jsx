import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/formWrapper/formWrapper";

const Register = ({ onRegister }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    onRegister({ nombre, email, password });
  };

  return (
    <FormWrapper
      title="Registro"
      footer={
        <p>
          ¿Ya tienes cuenta?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Inicia sesión
          </span>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="form">
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

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

        <label>Confirmar Contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </FormWrapper>
  );
};

export default Register;

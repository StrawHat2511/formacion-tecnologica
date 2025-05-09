import React, { useState, useEffect } from "react";
import "./profile.css"; // Asegúrate de tener un archivo CSS para estilos
const Profile = ({ usuario }) => {
  const [editMode, setEditMode] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (usuario) {
      setNewUserInfo({
        name: usuario.nombre || "",
        email: usuario.email || "",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const usuarioActualizado = { ...usuario, ...newUserInfo };
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActualizado));
    setEditMode(false);
    alert("Perfil actualizado (solo visual, no persistente en base)");
  };

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      <div className="profile-item">
        <label>Nombre:</label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={newUserInfo.name}
            onChange={handleChange}
          />
        ) : (
          <p>{newUserInfo.name}</p>
        )}
      </div>
      <div className="profile-item">
        <label>Correo electrónico:</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={newUserInfo.email}
            onChange={handleChange}
          />
        ) : (
          <p>{newUserInfo.email}</p>
        )}
      </div>

      {editMode ? (
        <button className="save-button" onClick={handleSave}>
          Guardar cambios
        </button>
      ) : (
        <button className="edit-button" onClick={() => setEditMode(true)}>
          Editar perfil
        </button>
      )}
    </div>
  );
};
export default Profile;

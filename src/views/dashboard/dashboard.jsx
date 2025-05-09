import "./dashboard.css";
import { React, useState, useEffect } from "react";
import AddTalk from "../talks/addTalk/addTalk";

const Dashboard = () => {
  const [charlas, setCharlas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showAddTalk, setShowAddTalk] = useState(false);
  const [showManageUsers, setShowManageUsers] = useState(false);

  // Cargar las charlas desde localStorage
  useEffect(() => {
    const storedCharlas = JSON.parse(localStorage.getItem("charlas"));
    if (storedCharlas) {
      setCharlas(storedCharlas);
    }
  }, []);

  // Cargar usuarios desde localStorage
  useEffect(() => {
    const storedUsuarios = JSON.parse(
      localStorage.getItem("usuariosRegistrados")
    );
    if (storedUsuarios) {
      setUsuarios(storedUsuarios);
    }
  }, []);

  // Función para agregar una charla
  const handleAddCharla = (newTalk) => {
    const updatedCharlas = [
      ...charlas,
      { ...newTalk, id: Date.now() }, // Usamos Date.now() para asegurar una ID única
    ];
    setCharlas(updatedCharlas);
    localStorage.setItem("charlas", JSON.stringify(updatedCharlas)); // Guardar en localStorage
    setShowAddTalk(false);
  };

  // Función para eliminar un solo usuario
  const handleDeleteUser = (id) => {
    // Encuentra el índice del usuario a eliminar
    const userIndex = usuarios.findIndex((usuario) => usuario.id === id);

    // Si el usuario existe, eliminamos el elemento en el índice encontrado
    if (userIndex !== -1) {
      const updatedUsuarios = [
        ...usuarios.slice(0, userIndex), // Los usuarios antes del índice
        ...usuarios.slice(userIndex + 1), // Los usuarios después del índice
      ];

      // Actualizamos el estado con los usuarios filtrados
      setUsuarios(updatedUsuarios);

      // Guardamos los usuarios actualizados en el localStorage
      localStorage.setItem(
        "usuariosRegistrados",
        JSON.stringify(updatedUsuarios)
      );
    }
  };

  // Función para eliminar una charla
  const handleDeleteCharla = (id) => {
    const updatedCharlas = charlas.filter((charla) => charla.id !== id);
    setCharlas(updatedCharlas);
    localStorage.setItem("charlas", JSON.stringify(updatedCharlas)); // Guardar en localStorage
  };

  const isAdmin = true; // Esto puede ser dinámico según el estado del usuario

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Administración</h1>
        <p>
          Bienvenido al panel de administración, aquí puedes gestionar todo.
        </p>
      </header>

      {/* Mostrar formulario de agregar charla si el admin lo solicita */}
      {showAddTalk && (
        <section className="add-talk-form">
          <AddTalk
            onAdd={handleAddCharla}
            onCancel={() => setShowAddTalk(false)}
          />
        </section>
      )}

      {/* Estadísticas Generales */}
      <section className="stats-section">
        <h2>Estadísticas Generales</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Charlas</h3>
            <p>{charlas.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Usuarios</h3>
            <p>{usuarios.length}</p>
          </div>
        </div>
      </section>

      {/* Charlas Recientes */}
      <section className="recent-talks">
        <h2>Charlas Recientes</h2>
        <div className="talks-list">
          {charlas.map((charla) => (
            <div key={charla.id} className="talk-card">
              <h3>{charla.titulo}</h3>
              <p>{charla.descripcion}</p>
              <button
                onClick={() => handleDeleteCharla(charla.id)}
                className="admin-buttonDelete"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Botones de administración si es admin */}
      {isAdmin && (
        <section className="admin-actions">
          <button
            onClick={() => setShowAddTalk(!showAddTalk)}
            className="admin-button"
          >
            {showAddTalk ? "Cancelar Agregar Charla" : "Agregar Nueva Charla"}
          </button>
          <button
            onClick={() => setShowManageUsers(!showManageUsers)}
            className="admin-button"
          >
            {showManageUsers
              ? "Cancelar Gestión de Usuarios"
              : "Gestionar Usuarios"}
          </button>
        </section>
      )}

      {/* Modal de gestión de usuarios */}
      {isAdmin && showManageUsers && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Lista de Usuarios</h2>
            <button
              className="modal-close"
              onClick={() => setShowManageUsers(false)}
            >
              &times;
            </button>
            <div className="users-list">
              {usuarios.map((usuario) => (
                <div key={usuario.id} className="user-card">
                  <div className="user-info">
                    <p>
                      <strong>Nombre:</strong> {usuario.nombre}
                    </p>
                    <p>
                      <strong>Email:</strong> {usuario.email}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(usuario.id)}
                    className="admin-buttonDelete"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

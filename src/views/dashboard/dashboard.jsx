import "./dashboard.css";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddTalk from "../talks/addTalk/addTalk";
import charlasIniciales from "../../data/charlas.js"; // Asegúrate de que la ruta sea correcta

const Dashboard = () => {
  const [charlas, setCharlas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showAddTalk, setShowAddTalk] = useState(false);
  const [showManageUsers, setShowManageUsers] = useState(false);

  // Cargar las charlas desde localStorage
  useEffect(() => {
    const storedCharlas = JSON.parse(localStorage.getItem("charlas")) || [];
    const todasCharlas = [...charlasIniciales];

    // Agrega solo las nuevas charlas (que no estén en las iniciales)
    storedCharlas.forEach((charla) => {
      if (!todasCharlas.some((c) => c.id === charla.id)) {
        todasCharlas.push(charla);
      }
    });

    setCharlas(todasCharlas);
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
    const nuevaCharla = { ...newTalk, id: Date.now().toString() };
    const updatedCharlas = [...charlas, nuevaCharla];

    // Solo guardar en localStorage las que NO estén en charlasIniciales
    const nuevasCharlasParaGuardar = updatedCharlas.filter(
      (c) => !charlasIniciales.some((ci) => ci.id === c.id)
    );

    localStorage.setItem("charlas", JSON.stringify(nuevasCharlasParaGuardar));
    setCharlas(updatedCharlas);
    setShowAddTalk(false);
  };

  // Función para eliminar un usuario
  const handleDeleteUser = (id) => {
    const updatedUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(updatedUsuarios);
    localStorage.setItem(
      "usuariosRegistrados",
      JSON.stringify(updatedUsuarios)
    );
  };

  // Función para eliminar una charla
  const handleDeleteCharla = (id) => {
    const updatedCharlas = charlas.filter((charla) => charla.id !== id);
    setCharlas(updatedCharlas);
    localStorage.setItem("charlas", JSON.stringify(updatedCharlas));
  };

  const isAdmin = true;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Administración</h1>
        <p>
          Bienvenido al panel de administración, aquí puedes gestionar todo.
        </p>
      </header>

      {showAddTalk && (
        <section className="add-talk-form">
          <AddTalk
            onAdd={handleAddCharla}
            onCancel={() => setShowAddTalk(false)}
          />
        </section>
      )}

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

      <section className="recent-talks">
        <h2>Charlas Recientes</h2>
        <div className="talks-list">
          {charlas.map((charla) => (
            <div key={charla.id} className="talk-card">
              <h3>{charla.titulo}</h3>
              <p>{charla.descripcion}</p>
              <div className="admin-actions-inline">
                <button
                  onClick={() => handleDeleteCharla(charla.id)}
                  className="admin-buttonDelete"
                >
                  Eliminar
                </button>
                <Link to={`/charla/${charla.id}`} className="admin-buttonView">
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

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

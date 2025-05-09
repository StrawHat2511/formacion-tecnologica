import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const charlas = [
    {
      id: 1,
      titulo: "Charla sobre React",
      descripcion:
        "Aprende los fundamentos de React en esta charla interactiva.",
      imagen: "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    },
    {
      id: 2,
      titulo: "Introducción a la Inteligencia Artificial",
      descripcion: "Descubre cómo funciona la IA y sus aplicaciones.",
      imagen: "https://i.ytimg.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
    },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenidos a la Plataforma de Charlas Tecnológicas</h1>
        <p>Descubre y regístrate en las mejores charlas sobre tecnología.</p>
      </header>

      <section className="featured-talks">
        <h2>Charlas Destacadas</h2>
        <div className="talks-grid">
          {charlas.map((charla) => (
            <Link
              to={`/charla/${charla.id}`}
              key={charla.id}
              className="talk-card"
            >
              <img
                src={charla.imagen}
                alt={charla.titulo}
                className="talk-image"
              />
              <div className="talk-info">
                <h3>{charla.titulo}</h3>
                <p>{charla.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="home-login-link">
        <Link to="/login" className="login-button">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default Home;

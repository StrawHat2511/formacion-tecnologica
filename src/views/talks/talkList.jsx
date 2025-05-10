import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./talkList.css";
import charlasIniciales from "../../data/charlas"; // ✅ Importa las charlas iniciales

const TalkList = () => {
  const [charlas, setCharlas] = useState([]);

  useEffect(() => {
    const storedCharlas = JSON.parse(localStorage.getItem("charlas")) || [];
    const todasCharlas = [...charlasIniciales];

    // Agrega solo las charlas nuevas que no estén repetidas
    storedCharlas.forEach((charla) => {
      if (!todasCharlas.some((c) => c.id === charla.id)) {
        todasCharlas.push(charla);
      }
    });

    setCharlas(todasCharlas);
  }, []);

  return (
    <div className="talks-container">
      <h2>Charlas Disponibles</h2>
      <div className="talks-list">
        {charlas.length === 0 ? (
          <p>No hay charlas disponibles.</p>
        ) : (
          charlas.map((charla) => (
            <div key={charla.id} className="talk-card">
              <h3>{charla.titulo}</h3>
              <p>{charla.descripcion}</p>
              <Link to={`/charla/${charla.id}`} className="view-details">
                Ver detalles
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TalkList;

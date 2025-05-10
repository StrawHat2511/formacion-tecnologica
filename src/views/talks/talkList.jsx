import { react, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./talkList.css";

const TalkList = () => {
  const [charlas, setCharlas] = useState([]);

  // Cargar las charlas desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedCharlas = JSON.parse(localStorage.getItem("charlas"));
    console.log(storedCharlas);
    if (storedCharlas) {
      setCharlas(storedCharlas);
    }
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
              <Link to={"/charla/1"} className="view-details">
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

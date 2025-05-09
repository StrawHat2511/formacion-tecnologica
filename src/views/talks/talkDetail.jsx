import React from "react";
import { useParams, Link } from "react-router-dom";
import "./talkDetail.css";

const charlas = [
  {
    id: "1",
    titulo: "Charla sobre React",
    descripcion: "Aprende los fundamentos de React en esta charla interactiva.",
    imagen: "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/bvxm389cYVI",
  },
  {
    id: "2",
    titulo: "Introducción a la Inteligencia Artificial",
    descripcion: "Descubre cómo funciona la IA y sus aplicaciones.",
    imagen: "https://i.ytimg.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
  },
];

const TalkDetail = () => {
  const { id } = useParams();
  const charla = charlas.find((c) => c.id === id);

  if (!charla) return <div>Charla no encontrada</div>;

  return (
    <div className="talk-detail-container">
      <h2>{charla.titulo}</h2>
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="400"
          src={charla.videoUrl}
          title={charla.titulo}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <p>{charla.descripcion}</p>
      <Link to="/" className="back-link">
        ← Volver al inicio
      </Link>
    </div>
  );
};

export default TalkDetail;

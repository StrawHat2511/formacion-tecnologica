import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./talkDetail.css";
import charlasIniciales from "../../data/charlas.js";

const TalkDetail = () => {
  const { id } = useParams();
  const [charla, setCharla] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  useEffect(() => {
    const storedCharlas = JSON.parse(localStorage.getItem("charlas")) || [];
    const todasCharlas = [...charlasIniciales];

    // Agregar las charlas nuevas si no están repetidas
    storedCharlas.forEach((c) => {
      if (!todasCharlas.some((ci) => ci.id === c.id)) {
        todasCharlas.push(c);
      }
    });

    // Buscar la charla por ID
    const charlaEncontrada = todasCharlas.find((c) => c.id === id);
    setCharla(charlaEncontrada);
  }, [id]);

  if (!charla) return <div>Charla no encontrada</div>;

  const handleRespuesta = (index) => {
    setRespuestaSeleccionada(index);
    setRespuestaCorrecta(index === charla.quiz.respuestaCorrecta);
  };

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

      {/* Mini Quiz */}
      <div className="quiz-container">
        <h3>Mini Quiz</h3>
        <p>
          <strong>{charla.quiz.pregunta}</strong>
        </p>
        <ul className="quiz-options">
          {charla.quiz.opciones.map((opcion, index) => (
            <li key={index}>
              <button
                className={`quiz-button ${
                  respuestaSeleccionada === index
                    ? respuestaCorrecta
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => handleRespuesta(index)}
                disabled={respuestaSeleccionada !== null}
              >
                {opcion}
              </button>
            </li>
          ))}
        </ul>
        {respuestaSeleccionada !== null && (
          <p className="quiz-feedback">
            {respuestaCorrecta
              ? "¡Correcto! 🎉"
              : "Incorrecto. Intenta repasar el contenido."}
          </p>
        )}
      </div>

      <Link to="/" className="back-link">
        ← Volver al inicio
      </Link>
    </div>
  );
};

export default TalkDetail;

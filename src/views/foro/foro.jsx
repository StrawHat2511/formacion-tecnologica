import React, { useState } from "react";
import "./foro.css";

const Foro = () => {
  const temasEjemplo = [
    {
      id: 1,
      titulo:
        "¿Qué herramientas digitales recomiendan para la enseñanza virtual?",
      contenido:
        "En este tema puedes compartir tus experiencias con herramientas como Google Classroom, Moodle, Notion, entre otras.",
    },
    {
      id: 2,
      titulo: "Experiencias usando Notion para la gestión de proyectos",
      contenido:
        "Comparte cómo usas Notion, qué plantillas te han funcionado y consejos para mantener un flujo de trabajo organizado.",
    },
    {
      id: 3,
      titulo: "Retos en la implementación de aulas virtuales",
      contenido:
        "Discute los desafíos técnicos, pedagógicos o institucionales que has enfrentado al implementar educación virtual.",
    },
  ];

  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState({}); // clave: id del tema

  const manejarSeleccionTema = (tema) => {
    setTemaSeleccionado(tema);
    setComentario(""); // Limpiar al cambiar de tema
  };

  const manejarEnvioComentario = () => {
    if (comentario.trim() === "") return;

    const nuevosComentarios = {
      ...comentarios,
      [temaSeleccionado.id]: [
        ...(comentarios[temaSeleccionado.id] || []),
        comentario.trim(),
      ],
    };
    setComentarios(nuevosComentarios);
    setComentario("");
  };

  return (
    <div className="foro">
      <div className="foro-content">
        <h1>🗣️ Foro de Discusión</h1>
        <p>
          Haz clic sobre un tema para ver su contenido y dejar tu comentario.
        </p>

        <div className="temas-lista">
          {temasEjemplo.map((tema) => (
            <div
              key={tema.id}
              onClick={() => manejarSeleccionTema(tema)}
              className="tema-card"
            >
              <h3>{tema.titulo}</h3>
            </div>
          ))}
        </div>

        {temaSeleccionado && (
          <div className="tema-detalle">
            <h2>{temaSeleccionado.titulo}</h2>
            <p>{temaSeleccionado.contenido}</p>

            <div className="comentarios-section">
              <h4>💬 Comentarios</h4>
              <ul>
                {(comentarios[temaSeleccionado.id] || []).map((c, index) => (
                  <li key={index} className="comentario-item">
                    {c}
                  </li>
                ))}
              </ul>

              <textarea
                placeholder="Escribe tu comentario..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              <button onClick={manejarEnvioComentario}>Enviar</button>
            </div>

            <button
              className="cerrar-btn"
              onClick={() => setTemaSeleccionado(null)}
            >
              Cerrar tema
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foro;

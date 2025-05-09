import React, { useState } from "react";
import "./addTalk.css";

const AddTalk = ({ onAdd, onCancel }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ titulo, descripcion, imagen });
    // Opcional: limpiar los campos
    setTitulo("");
    setDescripcion("");
    setImagen("");
  };

  return (
    <div className="add-talk-container">
      <h2>Agregar Nueva Charla</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imagen">Imagen (URL)</label>
          <input
            type="url"
            id="imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">Guardar Charla</button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTalk;

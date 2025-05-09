import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>Acerca de Charlas TIC</h2>
      <p>
        Esta plataforma fue creada para facilitar la gestión de charlas y
        usuarios en un entorno educativo. Permite registrar nuevas charlas,
        administrar participantes y llevar un control general de las actividades
        realizadas.
      </p>
      <p>
        Desarrollado como parte de un proyecto académico, este panel demuestra
        principios básicos de React, manejo de estados, almacenamiento local y
        una experiencia de usuario intuitiva.
      </p>
      <p>
        <strong>Tecnologías utilizadas:</strong> React, HTML, CSS, LocalStorage.
      </p>
      <p>
        <strong>Autor:</strong> equipo de desarrollo. grupo 13
      </p>
    </div>
  );
};

export default About;

const charlasIniciales = [
  {
    id: "1",
    titulo: "Charla sobre React",
    descripcion: "Aprende los fundamentos de React en esta charla interactiva.",
    videoUrl: "https://www.youtube.com/embed/bvxm389cYVI",
    imagen: "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    quiz: {
      pregunta: "¿Qué es un componente en React?",
      opciones: [
        "Una función que devuelve HTML",
        "Un archivo de CSS",
        "Un servidor web",
        "Un tipo de base de datos",
      ],
      respuestaCorrecta: 0, // índice de la respuesta correcta
    },
  },
  {
    id: "2",
    titulo: "Introducción a la Inteligencia Artificial",
    descripcion: "Descubre cómo funciona la IA y sus aplicaciones.",
    videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
    imagen: "https://i.ytimg.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
    quiz: {
      pregunta: "¿Cuál es una aplicación común de la IA?",
      opciones: [
        "Pintar cuadros",
        "Reconocimiento de voz",
        "Construcción de puentes",
        "Limpieza industrial",
      ],
      respuestaCorrecta: 1,
    },
  },
  {
    id: "3",
    titulo: "Desarrollo Web Moderno",
    descripcion:
      "Explora herramientas y frameworks modernos para crear sitios web.",
    videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0",
    imagen: "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    quiz: {
      pregunta:
        "¿Qué herramienta se usa frecuentemente en desarrollo web moderno?",
      opciones: ["React", "Excel", "PowerPoint", "Word"],
      respuestaCorrecta: 0,
    },
  },
  {
    id: "4",
    titulo: "Diseño de Interfaces de Usuario",
    descripcion:
      "Aprende sobre principios clave de diseño centrado en el usuario.",
    videoUrl: "https://www.youtube.com/embed/Wo5dMEP_BbI",
    imagen: "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    quiz: {
      pregunta:
        "¿Cuál es un principio clave en el diseño centrado en el usuario?",
      opciones: [
        "Complejidad visual",
        "Carga cognitiva alta",
        "Usabilidad",
        "Diseño para expertos",
      ],
      respuestaCorrecta: 2,
    },
  },
];

export default charlasIniciales;

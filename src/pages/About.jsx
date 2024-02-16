import React from 'react';

function About() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Sobre mí</h1>
      <p className="mb-4">
        ¡Hola! Soy [Tu Nombre], un apasionado desarrollador de software con experiencia en [Áreas de experiencia]. Me encanta aprender y trabajar en proyectos desafiantes que me permitan crecer profesionalmente.
      </p>
      <p className="mb-4">
        Puedes encontrarme en LinkedIn y GitHub:
      </p>
      <div className="flex">
        <a
          href="[Tu LinkedIn]"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          LinkedIn
        </a>
        <a
          href="[Tu GitHub]"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default About;

import React from 'react';
import NavBar from './NavBar';

function About() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Sobre mí</h1>
      <p className="mb-4">
        ¡Hola! Soy Jose María, un apasionado desarrollador de software con experiencia en Machine Learning y Data Science. Me encanta aprender y trabajar en proyectos desafiantes que me permitan crecer profesionalmente.
      </p>
      <p className="mb-4">
        Puedes encontrarme en LinkedIn y GitHub:
      </p>
      <div className="flex">
        <a
          href="www.linkedin.com/in/jmcordz"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/jmcord"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
      <NavBar />
    </div>
  );
}

export default About;

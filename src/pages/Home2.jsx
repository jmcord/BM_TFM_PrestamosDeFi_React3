// Prestamistas.jsx
import React from 'react';
import { AltaPrestamista } from '../components';

export default function Prestamistas() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-20 px-20">
      <h1>Gestión de Prestamistas</h1>

      <div className="flex flex-wrap justify-center gap-4">
        <AltaPrestamista />
        {/* Otros componentes relacionados con la gestión de prestamistas */}
      </div>
    </section>
  );
}

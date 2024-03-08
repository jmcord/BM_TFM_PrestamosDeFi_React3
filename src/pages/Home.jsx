import React, { useState } from 'react';
import { Owner, AltaPrestamista, AltaCliente, DepositarGarantia, SolicitarPrestamo, AprobarPrestamo, ReembolsarPrestamo, LiquidarGarantia, ObtenerPrestamosPorPrestatario, ObtenerDetalleDePrestamo } from '../components';
import About from '../components/About'; // Importa el componente About

export default function Home() {
  const [tab, setTab] = useState('home'); // Estado para gestionar la pestaña activa

  const handleTabChange = (tabName) => {
    setTab(tabName);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-20 px-20">
      <h1>Prestamos DeFi</h1>
      {/* Navegación entre pestañas */}
      <div className="flex gap-4">
        <button onClick={() => handleTabChange('home')}>Home</button>
        <button onClick={() => handleTabChange('about')}>About</button> {/* Botón para la pestaña About */}
      </div>
      {/* Contenido basado en la pestaña activa */}
      {tab === 'home' && (
        <div className="flex flex-wrap justify-center gap-4">
          <Owner />
          <AltaPrestamista />
          <AltaCliente />
          <DepositarGarantia />
          <SolicitarPrestamo />
          <AprobarPrestamo />
          <ReembolsarPrestamo />
          <LiquidarGarantia />
          <ObtenerPrestamosPorPrestatario />
          <ObtenerDetalleDePrestamo />
        </div>
      )}
      {tab === 'about' && <About />} {/* Renderiza el componente About cuando se selecciona la pestaña "About" */}
    </section>
  );
}



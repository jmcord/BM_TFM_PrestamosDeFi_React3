import React from 'react';
import { AprobarPrestamo, ObtenerPrestamosPorPrestatario, Owner, SolicitarPrestamo, ObtenerDetalleDePrestamo } from '../components';
import { AltaPrestamista, AltaCliente, DepositarGarantia, LiquidarGarantia } from '../components';
import ReembolsarPrestamo from '../components/ReembolsarPrestamo';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-20 px-20">
      <h1>Prestamos DeFi</h1>
      <Owner />
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          
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
      </div>
    </section>
  );
}


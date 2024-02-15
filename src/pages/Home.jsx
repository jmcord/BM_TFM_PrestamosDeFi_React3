import React from 'react';
import { AprobarPrestamo, ObtenerPrestamosPorPrestatario, Owner, SolicitarPrestamo } from '../components';
import { AltaPrestamista, AltaCliente, DepositarGarantia } from '../components';
import ReembolsarPrestamo from '../components/ReembolsarPrestamo';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-20 px-20">
      <section className="flex flex-col place-items-center gap-4 py-20 px-20" style={{ backgroundImage: '/public/bc.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></section>
        <h1>Prestamos DeFi</h1>

        <div className="flex flex-wrap justify-center gap-4">
          <Owner />
          <AltaPrestamista />
          <AltaCliente />
          <DepositarGarantia />
          <SolicitarPrestamo />
          <AprobarPrestamo />
          <ReembolsarPrestamo />
          <ObtenerPrestamosPorPrestatario />
        </div>

    </section>
  );
}


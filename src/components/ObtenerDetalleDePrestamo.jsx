import React, { useState } from 'react';
import { useContractRead } from 'wagmi'; 
import { Button, Title } from './ui';
import { AiFillBoxPlot } from 'react-icons/ai';
import { blockmakerTokenABI } from '../contracts/ABIs';

function ObtenerDetalleDePrestamo() {
  const [prestatario, setPrestatario] = useState('');
  const [idPrestamo, setIdPrestamo] = useState('');
  const [prestamo, setPrestamo] = useState(null);
  const [loading, setLoading] = useState(false);

  const obtenerDetalleDePrestamoCall = useContractRead({
    abi: blockmakerTokenABI, 
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS, 
    method: 'obtenerDetalleDePrestamo',
    args: [prestatario, idPrestamo],
  });

  const obtenerDetalleDePrestamo = async () => {
    setLoading(true);
    try {
      const detalle = await obtenerDetalleDePrestamoCall;
      setPrestamo(detalle);
    } catch (error) {
      console.error('Error al obtener detalle del préstamo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Prestatario"
        value={prestatario}
        onChange={(e) => setPrestatario(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID del Préstamo"
        value={idPrestamo}
        onChange={(e) => setIdPrestamo(e.target.value)}
      />
      <Button onClick={obtenerDetalleDePrestamo} disabled={loading}>
        <AiFillBoxPlot /> Obtener Detalle del Préstamo
      </Button>
      {loading && <p>Cargando detalle del préstamo...</p>}
      {prestamo && (
        <section className="bg-white p-4 border shadow rounded-md">
          <Title>Detalle del Préstamo</Title>
          <ul>
            <li>ID: {prestamo.id}</li>
            <li>Prestatario: {prestamo.prestatario}</li>
            <li>Monto: {prestamo.monto}</li>
            <li>Plazo: {prestamo.plazo}</li>
            <li>Tiempo de Solicitud: {prestamo.tiempoSolicitud}</li>
            <li>Tiempo Límite: {prestamo.tiempoLimite}</li>
            <li>Aprobado: {prestamo.aprobado ? 'Sí' : 'No'}</li>
            <li>Reembolsado: {prestamo.reembolsado ? 'Sí' : 'No'}</li>
            <li>Liquidado: {prestamo.liquidado ? 'Sí' : 'No'}</li>
          </ul>
        </section>
      )}
    </div>
  );
}

export default ObtenerDetalleDePrestamo;

import React, { useState, useEffect } from 'react';
import { Title } from './ui';
import { blockmakerTokenABI } from '../contracts/ABIs'; // Ajusta la ruta de importación según tu proyecto
import { useContractRead } from 'wagmi'; // Ajusta la ruta de importación según tu proyecto

function ObtenerPrestamosPorPrestatario({ prestatario }) {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerPrestamosPorPrestatarioCall = useContractRead({
    abi: blockmakerTokenABI,
    address: prestatario, // Dirección del prestatario
    method: 'obtenerPrestamosPorPrestatario',
    args: [prestatario],
  });

  useEffect(() => {
    if (Array.isArray(obtenerPrestamosPorPrestatarioCall)) {
      setPrestamos(obtenerPrestamosPorPrestatarioCall);
      setLoading(false);
    }
  }, [obtenerPrestamosPorPrestatarioCall]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Prestamos de {prestatario}</Title>
      {loading ? (
        <p>Cargando préstamos...</p>
      ) : (
        <ul>
          {prestamos.map((prestamo, index) => (
            <li key={index}>{prestamo}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ObtenerPrestamosPorPrestatario;

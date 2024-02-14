import React, { useState } from 'react';
import { Button, Title } from './ui';
import { useContractCall } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

function ObtenerPrestamosPorPrestatario({ prestatario }) {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState('');

  const obtenerPrestamos = async () => {
    try {
      const prestamosIds = await contract.methods.obtenerPrestamosPorPrestatario(prestatario).call();
      setPrestamos(prestamosIds);
      setError('');
    } catch (err) {
      setError('Error al obtener los préstamos del prestatario');
    }
  };

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Prestamos del Prestatario</Title>
      <div>
        <Button onClick={obtenerPrestamos}>Obtener Prestamos</Button>
      </div>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {prestamos.map((id, index) => (
            <li key={index}>{id}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ObtenerPrestamosPorPrestatario;

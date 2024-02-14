import React, { useState, useEffect } from 'react';
import { Button, TextInput, Title } from './ui';
import { useContractRead } from 'wagmi'; // Asegúrate de importar correctamente la función useContractCall
import { blockmakerTokenABI } from '../contracts/ABIs';

function ObtenerPrestamosPorPrestatario({ prestatario }) {
  const [prestamosIds, setPrestamosIds] = useState([]);
  const [error, setError] = useState('');

  const obtenerPrestamos = useContractRead({
    abi: blockmakerTokenABI,
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    method: 'obtenerPrestamosPorPrestatario',
    args: [prestatario]
  });

  useEffect(() => {
    if (obtenerPrestamos.error) {
      setError(obtenerPrestamos.error.message);
    } else {
      setPrestamosIds(obtenerPrestamos.result || []);
    }
  }, [obtenerPrestamos]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Obtener Préstamos por Prestatario</Title>

      <form className="grid gap-4">
        <TextInput type="text" placeholder="Prestatario" value={prestatario} disabled />
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {prestamosIds.map((id, index) => (
            <li key={index}>ID: {id}</li>
          ))}
        </ul>
      </form>
    </section>
  );
}

export default ObtenerPrestamosPorPrestatario;

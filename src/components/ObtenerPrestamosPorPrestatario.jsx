import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ObtenerPrestamosPorPrestatario({ prestatario }) {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerPrestamos = async () => {
      try {
        const response = await axios.post('URL_DEL_ENDPOINT_JSON_RPC', {
          jsonrpc: '2.0',
          method: 'obtenerPrestamosPorPrestatario',
          params: [prestatario],
          id: 1,
        });

        if (response.data.error) {
          setError(response.data.error.message);
        } else {
          setPrestamos(response.data.result);
        }
      } catch (error) {
        setError('Error al obtener los préstamos');
        console.error('Error:', error);
      }
    };

    obtenerPrestamos();
  }, [prestatario]);

  return (
    <div>
      <h2>Prestamos de {prestatario}</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {prestamos.map((prestamo, index) => (
          <li key={index}>{prestamo}</li>
        ))}
      </ul>
    </div>
  );
}

export default ObtenerPrestamosPorPrestatario;


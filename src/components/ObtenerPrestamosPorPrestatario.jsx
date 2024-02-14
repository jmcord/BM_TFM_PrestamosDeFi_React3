

import React, { useState, useEffect } from 'react';

function ObtenerPrestamosPorPrestatario({ prestatario }) {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerPrestamos = async () => {
      try {
        const response = await fetch('URL_DEL_ENDPOINT_JSON_RPC', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'obtenerPrestamosPorPrestatario',
            params: [prestatario],
            id: 1,
          }),
        });

        const responseData = await response.json();

        if (responseData.error) {
          setError(responseData.error.message);
        } else {
          setPrestamos(responseData.result);
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
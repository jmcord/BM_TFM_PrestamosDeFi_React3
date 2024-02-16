import React, { useState, useEffect } from 'react';
import { Title } from './ui';
import { blockmakerTokenABI } from '../contracts/ABIs';
import { useContractRead } from 'wagmi';
import { AiFillBoxPlot } from 'react-icons/ai';

function ObtenerPrestamosPorPrestatario() {
  const [prestatario, setPrestatario] = useState('');
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerPrestamosPorPrestatarioCall = useContractRead({
    abi: blockmakerTokenABI,
    address: prestatario,
    method: 'obtenerPrestamosPorPrestatario',
    args: [prestatario],
  });

  useEffect(() => {
    if (Array.isArray(obtenerPrestamosPorPrestatarioCall)) {
      setPrestamos(obtenerPrestamosPorPrestatarioCall);
      setLoading(false);
    }
  }, [obtenerPrestamosPorPrestatarioCall]);

  const handleInputChange = (event) => {
    setPrestatario(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <div>
      <h2><AiFillBoxPlot /> Prestamos por Prestatario</h2>
      <section className="bg-white p-4 border shadow rounded-md">
        <Title>Ingrese el prestatario:</Title>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input 
            type="text" 
            placeholder="Dirección del prestatario" 
            value={prestatario} 
            onChange={handleInputChange} 
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Buscar</button>
        </form>
        {loading ? (
          <p>Cargando préstamos...</p>
        ) : (
          <div>
            <Title>Prestamos de {prestatario}</Title>
            <ul>
              {prestamos.map((prestamo, index) => (
                <li key={index}>{prestamo}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default ObtenerPrestamosPorPrestatario;

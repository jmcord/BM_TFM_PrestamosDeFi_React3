import React, { useState, useEffect } from 'react';
import { Button, Title } from './ui';
import { useContractRead } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contratoAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS;
const functionName = 'obtenerPrestamosPorPrestatario';

function ObtenerPrestamosPorPrestatario() {
  const [prestatario, setPrestatario] = useState('');
  const [loading, setLoading] = useState(false);
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState(null);

  const notify = () => toast("Wow so easy!");

  const { data: prestamosData, loading: prestamosLoading, error: prestamosError } = useContractRead({
    address: contratoAddress,
    abi: blockmakerTokenABI,
    functionName: functionName,
    args: [prestatario]
  });

  useEffect(() => {
    if (prestatario !== '') {
      setLoading(true);
      setError(null);
    }
  }, [prestatario]);

  useEffect(() => {
    if (prestamosData !== undefined) {
      setPrestamos(prestamosData);
      setLoading(false);
    }
    if (prestamosError) {
      console.error('Error al obtener préstamos:', prestamosError);
      setError('Error al obtener préstamos. Verifica la dirección del prestatario y vuelve a intentarlo.');
      setLoading(false);
    }
  }, [prestamosData, prestamosError]);

  const handlePrestatarioChange = (event) => {
    setPrestatario(event.target.value);
  };

  const handleButtonClick = () => {
    notify(); // Llama a la función de notificación al hacer clic en el botón "Obtener Préstamos"
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Obtener Préstamos</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="bg-white p-4 border shadow rounded-md">
        <Title>Obtener Préstamos por Prestatario</Title>

        <div>
          <input
            type="text"
            placeholder="Dirección del Prestatario"
            value={prestatario}
            onChange={handlePrestatarioChange}
          />
          <Button disabled={loading} onClick={handleButtonClick} isLoading={loading}>
            {loading ? 'Cargando...' : 'Obtener Préstamos'}
          </Button>
        </div>
        {error && <p>Error: {error}</p>}
        {prestamos.length > 0 && (
          <div>
            <h3>Préstamos del Prestatario:</h3>
            <ul>
              {prestamos.map((id, index) => (
                <li key={index}>ID del préstamo: {id}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default ObtenerPrestamosPorPrestatario;

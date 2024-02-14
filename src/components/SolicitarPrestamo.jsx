import React, { useState, useEffect } from 'react';
import { Button, TextInput, Title } from './ui';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

function SolicitarPrestamo() {
  const [monto, setMonto] = useState('');
  const [plazo, setPlazo] = useState('');
  const [error, setError] = useState('');

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'solicitarPrestamos',
    args: [monto, plazo]
  });

  const { data: writeData, write } = useContractWrite(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  });

  const handleSolicitudPrestamo = () => {
    if (!monto || !plazo) {
      setError('Por favor, introduce el monto y el plazo');
      return;
    }
    setError('');
    write();
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      setMonto('');
      setPlazo('');
      console.log('Solicitud de préstamo completada con éxito!');
    }
    if (isTransactionError) {
      console.log('Error al solicitar el préstamo');
    }
  }, [isTransactionSuccess, isTransactionError]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Solicitud de Préstamo</Title>

      <form className="grid gap-4">
        <TextInput type="text" placeholder="Monto" value={monto} onChange={(e) => setMonto(e.target.value)} />
        <TextInput type="text" placeholder="Plazo" value={plazo} onChange={(e) => setPlazo(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <Button disabled={!write || isTransactionLoading} onClick={handleSolicitudPrestamo} isLoading={isTransactionLoading}>
          {isTransactionLoading ? 'Enviando solicitud...' : 'Solicitar Préstamo'}
        </Button>
      </form>
    </section>
  );
}

export default SolicitarPrestamo;

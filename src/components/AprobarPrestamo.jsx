import React, { useState, useEffect } from 'react';
import { Button, TextInput, Title } from './ui';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

function AprobarPrestamo() {
  const [prestatario, setPrestatario] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'aprobarPrestamo',
    args: [prestatario, id]
  });

  const { data: writeData, write } = useContractWrite(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  });

  const handleAprobarPrestamo = () => {
    if (!prestatario || !id) {
      setError('Por favor, introduce el prestatario y el ID del préstamo');
      return;
    }
    setError('');
    write();
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      setPrestatario('');
      setId('');
      console.log('Prestamo aprobado con éxito!');
    }
    if (isTransactionError) {
      console.log('Error al aprobar el préstamo');
    }
  }, [isTransactionSuccess, isTransactionError]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Aprobar Préstamo</Title>

      <form className="grid gap-4">
        <TextInput type="text" placeholder="Prestatario" value={prestatario} onChange={(e) => setPrestatario(e.target.value)} />
        <TextInput type="text" placeholder="ID del Préstamo" value={id} onChange={(e) => setId(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <Button disabled={!write || isTransactionLoading} onClick={handleAprobarPrestamo} isLoading={isTransactionLoading}>
          {isTransactionLoading ? 'Aprobando préstamo...' : 'Aprobar Préstamo'}
        </Button>
      </form>
    </section>
  );
}

export default AprobarPrestamo;

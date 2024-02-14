import React, { useState, useEffect } from 'react';
import { Button, Title } from './ui';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

function ReembolsarPrestamo() {
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'reembolsarPrestamo',
    args: [id]
  });

  const { data: writeData, write } = useContractWrite(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  });

  const handleReembolsoPrestamo = () => {
    if (!id) {
      setError('Por favor, introduce el ID del préstamo');
      return;
    }
    setError('');
    write();
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      setId('');
      console.log('Reembolso del préstamo completado con éxito!');
    }
    if (isTransactionError) {
      console.log('Error al reembolsar el préstamo');
    }
  }, [isTransactionSuccess, isTransactionError]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Reembolso de Préstamo</Title>

      <form className="grid gap-4">
        <input type="text" placeholder="ID del Préstamo" value={id} onChange={(e) => setId(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <Button disabled={!write || isTransactionLoading} onClick={handleReembolsoPrestamo} isLoading={isTransactionLoading}>
          {isTransactionLoading ? 'Enviando reembolso...' : 'Reembolsar Préstamo'}
        </Button>
      </form>
    </section>
  );
}

export default ReembolsarPrestamo;

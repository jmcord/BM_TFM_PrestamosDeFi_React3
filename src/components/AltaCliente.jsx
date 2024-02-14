import React, { useState, useEffect } from 'react';
import { Button, TextInput, Title } from './ui';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

export default function AltaCliente({ empleadoPrestamista }) {
  const [nuevoCliente, setNuevoCliente] = useState('');
  const [error, setError] = useState('');

  const { config } = useContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'altaCliente',
    args: [nuevoCliente],
    signer: empleadoPrestamista
  });

  const { data: writeData, write } = useContractWrite(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  });

  const handleAltaCliente = () => {
    if (!nuevoCliente) {
      setError('Por favor, introduce una dirección válida');
      return;
    }
    setError('');
    write();
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      setNuevoCliente('');
      console.log('Transacción completada con éxito!');
    }
    if (isTransactionError) {
      console.log('Transacción fallida');
    }
  }, [isTransactionSuccess, isTransactionError]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Alta de Cliente</Title>

      <form className="grid gap-4">
        <TextInput type="text" placeholder="Dirección del nuevo cliente" value={nuevoCliente} onChange={(e) => setNuevoCliente(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <Button disabled={!write || isTransactionLoading} onClick={handleAltaCliente} isLoading={isTransactionLoading}>
          {isTransactionLoading ? 'Dando de alta cliente...' : 'Dar de alta cliente'}
        </Button>
      </form>
    </section>
  );
}

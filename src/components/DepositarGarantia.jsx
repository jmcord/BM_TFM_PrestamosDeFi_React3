import React, { useState } from 'react';
import { Button, TextInput, Title } from './ui';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

export default function DepositarGarantia({ cliente }) {
  const [depositAmount, setDepositAmount] = useState('');
  const [error, setError] = useState('');

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'depositarGarantia',
    signer: cliente,
    value: depositAmount
  });

  const { data: writeData, write } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: writeData?.hash
  });

  const handleDepositarGarantia = () => {
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError('Por favor, introduce un monto de depósito válido');
      return;
    }
    setError('');
    write();
  };

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Depósito de Garantía</Title>

      <form className="grid gap-4">
        <TextInput type="number" placeholder="Monto a depositar" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <Button disabled={!write || isLoading} onClick={handleDepositarGarantia} isLoading={isLoading}>
          {isLoading ? 'Depositando garantía...' : 'Depositar garantía'}
        </Button>
      </form>
    </section>
  );
}

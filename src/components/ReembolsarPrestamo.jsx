import React, { useState, useEffect } from 'react';
import { Button, Title } from './ui';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReembolsarPrestamo() {
  const [id, setId] = useState('');

  const notify = () => toast("Wow so easy!");

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

  useEffect(() => {
    if (isTransactionSuccess) {
      toast.success('¡Reembolso del préstamo completado con éxito!');
      setId('');
    }
    if (isTransactionError) {
      toast.error('Error al reembolsar el préstamo');
    }
  }, [isTransactionSuccess, isTransactionError]);

  const handleReembolsoPrestamo = () => {
    if (!id) {
      toast.error('Por favor, introduce el ID del préstamo');
      return;
    }
    write();
  };

  return (
    <div>
      <button onClick={notify}>Reembolsar!</button>
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
        <Title>Reembolso de Préstamo</Title>

        <form className="grid gap-4">
          <input type="text" placeholder="ID del Préstamo" value={id} onChange={(e) => setId(e.target.value)} />
          <Button disabled={!write || isTransactionLoading} onClick={handleReembolsoPrestamo} isLoading={isTransactionLoading}>
            {isTransactionLoading ? 'Enviando reembolso...' : 'Reembolsar Préstamo'}
          </Button>
        </form>
      </section>
    </div>
  );
}

export default ReembolsarPrestamo;

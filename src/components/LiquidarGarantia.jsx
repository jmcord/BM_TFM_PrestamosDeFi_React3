import React, { useState } from 'react';
import { Button, Title } from './ui';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillCode } from "react-icons/ai";

function LiquidarGarantia() {
  const [prestatario, setPrestatario] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const notify = () => toast("Wow so easy!");

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'liquidarGarantia',
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

  const handleLiquidarGarantia = () => {
    if (!prestatario || !id) {
      setError('Por favor, introduce el prestatario y el ID del préstamo');
      return;
    }
    setError('');
    write();
  };

  return (
    <div>
      <section className="bg-white p-4 border shadow rounded-md">
        <Title>Liquidar Garantía</Title>

        <form className="grid gap-4">
          <div className="border rounded-md p-2">
            <input type="text" placeholder="Prestatario" value={prestatario} onChange={(e) => setPrestatario(e.target.value)} className="border rounded-md p-2" />
          </div>
          <div className="border rounded-md p-2">
            <input type="text" placeholder="ID del Préstamo" value={id} onChange={(e) => setId(e.target.value)} className="border rounded-md p-2" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button onClick={handleLiquidarGarantia} disabled={!write || isTransactionLoading} isLoading={isTransactionLoading} style={{ marginTop: '8px' }}>
            <AiFillCode style={{ marginRight: '8px' }} />
            {isTransactionLoading ? 'Enviando liquidación...' : 'Liquidar Garantía'}
          </Button>
        </form>
      </section>

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
    </div>
  );
}

export default LiquidarGarantia;


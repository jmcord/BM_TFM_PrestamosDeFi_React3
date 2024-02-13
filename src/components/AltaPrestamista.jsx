import React, { useState, useEffect } from 'react';
import { Button, TextInput, Title } from './ui';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

function AltaPrestamista({ socioPrincipal }) {
  const [nuevoPrestamista, setNuevoPrestamista] = useState('');
  const [error, setError] = useState('');

  // Función para validar la dirección Ethereum
  const isValidAddress = (address) => {
    return /^(0x)?[0-9a-f]{40}$/i.test(address);
  };

  // Configuración para escribir en el contrato
  const { config } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS, // Dirección del contrato
    abi: blockmakerTokenABI, // ABI del contrato
    functionName: 'altaPrestamista', // Función a llamar
    args: [nuevoPrestamista], // Argumentos de la función
    signer: socioPrincipal // El socio principal firma la transacción
  });

  // Datos de la escritura del contrato
  const { data: writeData, write } = useContractWrite(config);

  // Estado de la transacción
  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  });

  // Manejador para el cambio en el campo de la nueva dirección
  const handleNuevoPrestamistaChange = (event) => {
    setNuevoPrestamista(event.target.value);
  };

  // Manejador para el click en el botón de alta prestamista
  const handleAltaPrestamistaClick = () => {
    if (!isValidAddress(nuevoPrestamista)) {
      setError('Por favor, introduce una dirección Ethereum válida');
      return;
    }
    setError('');
    write();
  };

  // Efecto para limpiar el campo y mostrar mensajes en la consola
  useEffect(() => {
    if (isTransactionSuccess) {
      setNuevoPrestamista('');
      console.log('¡Transacción completada con éxito!');
    }
    if (isTransactionError) {
      console.log('¡Transacción fallida!');
    }
  }, [isTransactionSuccess, isTransactionError]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Alta de Prestamista</Title>

      <form className="grid gap-4">
        <TextInput
          type="text"
          placeholder="Dirección del nuevo prestamista"
          value={nuevoPrestamista}
          onChange={handleNuevoPrestamistaChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          disabled={!write || isTransactionLoading}
          onClick={handleAltaPrestamistaClick}
          isLoading={isTransactionLoading}
        >
          {isTransactionLoading ? 'Dando de alta prestamista...' : 'Dar de alta prestamista'}
        </Button>
      </form>
    </section>
  );
}

export default AltaPrestamista;

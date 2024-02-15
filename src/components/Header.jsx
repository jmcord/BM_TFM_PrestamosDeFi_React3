import React from 'react';
import { ConnectKitButton } from 'connectkit';

export default function Header() {
  return (
    <header className="py-2 px-3 sm:py-4 sm:px-8 flex justify-between items-center bg-white border-b shadow-xs" style={{ backgroundImage: 'url(/public/bc.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Logo para versión móvil */}
      <img src="/bm.png" alt="blockmaker-logo" width={47} className="sm:hidden" />
      {/* Logo para versión de escritorio */}
      <img src="/logo-blockmaker.png" alt="blockmaker-logo" width={300} className="hidden sm:flex" />
      {/* Botón de conexión de billetera con la propiedad showBalance para mostrar el saldo de la cuenta */}
      <ConnectKitButton showBalance />
    </header>
  )
}

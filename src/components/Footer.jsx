import React from 'react';

export default function Footer() {
  return (
    <footer className="py-4 px-3 sm:p-8 flex justify-center bg-white border-t shadow-xs" style={{ backgroundImage: 'url(/public/bc2.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <p style={{ color: 'white' }}>Derechos de autor &copy; {new Date().getFullYear()} Blockmaker Academy</p>
    </footer>
  )
}

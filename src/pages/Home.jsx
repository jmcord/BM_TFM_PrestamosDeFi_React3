export default function Home() {
  return (
    <section className="flex flex-col place-items-center gap-4 py-20 px-20" style={{ backgroundImage: 'url("/ruta/de/imagen.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <h1>Prestamos DeFi</h1>

      <Owner />
      <AltaPrestamista />
      <AltaCliente />
      <DepositarGarantia />
      <SolicitarPrestamo />
      <AprobarPrestamo />
      <ReembolsarPrestamo />
      <ObtenerPrestamosPorPrestatario />
    </section>
  )
}

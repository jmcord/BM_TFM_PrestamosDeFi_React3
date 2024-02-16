import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { config } from './config/wagmi';
import { AppLayout } from './components/ui/layouts';
import Home from './pages/Home';
import About from './pages/About';
import NavBar from './pages/NavBar';

function App() {
  return (
    <Router>
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="light">
          <AppLayout>
            <NavBar />
            <Routes>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              {/* Asegúrate de tener una ruta definida para cualquier otra dirección */}
              {/* Por ejemplo, puedes redirigir a la página de inicio si la ruta no se encuentra */}
              <Route path="*" component={Home} />
            </Routes>
          </AppLayout>
        </ConnectKitProvider>
      </WagmiConfig>
    </Router>
  );
}

export default App;
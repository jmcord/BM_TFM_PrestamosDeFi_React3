import { WagmiConfig } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { config } from './config/wagmi'
import { AppLayout } from './components/ui/layouts'
import { Home, Home2 } from './pages'

function App() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider mode="light">
        <AppLayout>
          <Home />
        </AppLayout>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
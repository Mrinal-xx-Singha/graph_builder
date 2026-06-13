import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import { ReactFlowProvider } from 'reactflow'

import App from './App.tsx'


const queryClient = new QueryClient()


async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mocks/browser.ts')
  // worker.start returns a promise that resolves once the service worker is up and ready to intercept requests

  return worker.start()
}


enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      </QueryClientProvider>
    </StrictMode>,
  )

})


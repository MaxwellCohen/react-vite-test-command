import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  captureConsoleHydration,
  captureRecoverableError,
} from './hydrationReport.js'

const origError = console.error
console.error = (...args) => {
  captureConsoleHydration(args)
  origError.apply(console, args)
}

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App />
  </StrictMode>,
  {
    onRecoverableError(error, errorInfo) {
      captureRecoverableError(error, errorInfo)
    },
  },
)

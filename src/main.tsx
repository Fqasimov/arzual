import '@fontsource-variable/jost'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LangProvider } from './i18n/lang'
import './styles.css'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)

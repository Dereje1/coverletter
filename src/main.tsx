import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  /* Because of StrictMode CDM is running twice and so making API calls twice in generate cover letter - removed, */
  <App />
)

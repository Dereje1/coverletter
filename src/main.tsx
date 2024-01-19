import ReactDOM from 'react-dom/client'
import App from './App.tsx'

/* Because of StrictMode CDM is running twice and so making API calls twice in generate cover letter - removed, */
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

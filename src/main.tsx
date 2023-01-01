import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // ２回レンダリングされるとページングの管理ができないためStrictModeをOffにする
  //  <React.StrictMode>
  <App />
  //  </React.StrictMode>
)

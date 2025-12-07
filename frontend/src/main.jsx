import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'

//Insertar el resto de componentes aqui
const router = createBrowserRouter([
  {
    path: "/", element: <App />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App router = {router}/>
  </StrictMode>,
)

//NO TOCAR EL CODIGO DE ABAJO

// Registrar el Service Worker para hacer la app instalable como PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado:', registration.scope);
      })
      .catch(error => {
        console.log('Error al registrar Service Worker:', error);
      });
  });
}

// Detectar cuando el usuario puede instalar la PWA
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA lista para instalar');

});

window.addEventListener('appinstalled', () => {
  console.log('PWA instalada correctamente');
});





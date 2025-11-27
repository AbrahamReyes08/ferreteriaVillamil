import { useState } from 'react';
import { startLocationTracking, stopLocationTracking } from './location-tracking/location';

const SERVER_URL = 'http://localhost:3000';
const TRACKING_INFO = {
  role: 'repartidor',
  pedido: 'PEDIDO_DEMO'
};

function App() {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [sentCount, setSentCount] = useState(0);

  const handleStart = () => {
    startLocationTracking(SERVER_URL,  TRACKING_INFO, (locationData) => {
      setLocation(locationData);
      setSentCount(prev => prev + 1);
    });
    setIsTracking(true);
  };

  const handleStop = () => {
    stopLocationTracking();
    setIsTracking(false);
    setLocation(null);
    setSentCount(0);
  };

  const displayLocation = location ? {
    latitude: location.latitude,
    longitude: location.longitude,
    accuracy: `${location.accuracy} m`,
    lastUpdate: new Date(location.timestamp).toLocaleTimeString('es-HN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } : {
    latitude: '--',
    longitude: '--',
    accuracy: '-- m',
    lastUpdate: '--'
  };

  return (
    <div className="container">
      <h1>Rastreador de Ubicación</h1>
      
      <div className={`status-box ${isTracking ? 'tracking' : 'disconnected'}`}>
        {isTracking ? 'Rastreando ubicación...' : 'Detenido'}
      </div>
      
      <div className="location-info">
        <div className="location-item">
          <span className="location-label">Latitud:</span>
          <span className="location-value">{displayLocation.latitude}</span>
        </div>
        <div className="location-item">
          <span className="location-label">Longitud:</span>
          <span className="location-value">{displayLocation.longitude}</span>
        </div>
        <div className="location-item">
          <span className="location-label">Precisión:</span>
          <span className="location-value">{displayLocation.accuracy}</span>
        </div>
        <div className="location-item">
          <span className="location-label">Última actualización:</span>
          <span className="location-value">{displayLocation.lastUpdate}</span>
        </div>
      </div>

      <div className="stats">
        <div className="stat-box">
          <div className="stat-label">Ubicaciones enviadas</div>
          <div className="stat-value">{sentCount}</div>
        </div>
      </div>
      
      <div className="button-group">
        <button 
          onClick={handleStart}
          disabled={isTracking}
          className="start-btn"
        >
          Iniciar
        </button>
        <button 
          onClick={handleStop}
          disabled={!isTracking}
          className="stop-btn"
        >
          Detener
        </button>
      </div>
    </div>
  );
}

export default App;
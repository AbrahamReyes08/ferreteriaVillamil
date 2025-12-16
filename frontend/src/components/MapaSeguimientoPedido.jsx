import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Circle, MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { io } from 'socket.io-client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DetallePedidoCliente from './DetallePedidoCliente';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordenadas de Honduras
const HONDURAS_BOUNDS = [
  [12.98, -89.36], // Suroeste
  [16.51, -83.13]  // Noreste
];

// Centro por defecto (Tegucigalpa)
const DEFAULT_MAP_CENTER = [14.0818, -87.2068];

function MapaSeguimientoPedido({ pedidoId: pedidoIdProp }) {
  const { pedidoId: pedidoIdParam } = useParams();
  const pedidoId = pedidoIdProp || pedidoIdParam;
  const [pedidoData, setPedidoData] = useState(null);
  const [repartidorLocation, setRepartidorLocation] = useState(null);
  const [destinoLocation, setDestinoLocation] = useState(null);
  const [clienteLocation, setClienteLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_MAP_CENTER);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const socketRef = useRef(null);
  const mapRef = useRef(null);
  const hasCenteredOnRepartidorRef = useRef(false);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsTracking(false);
    setRepartidorLocation(null);
  }, []);

  const fetchPedidoData = useCallback(async ({ silent = false } = {}) => {
    if (!pedidoId) {
      setError('Pedido inválido');
      setLoading(false);
      return;
    }

    try {
      if (!silent) {
        setLoading(true);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/pedidos/cliente/tracking/${pedidoId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        setPedidoData(data.data);
        setMapReady(true);
        setError('');
      } else {
        setError('No se pudo cargar la información del pedido');
      }
    } catch (err) {
      console.error('Error al cargar datos del pedido:', err);
      setError('Error al cargar datos del pedido');
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [pedidoId]);

  const connectSocket = useCallback(() => {
    if (!pedidoId) return;
    if (socketRef.current) return;

    try {
      const serverUrl = import.meta.env.VITE_SOCKET_URL || window.location.origin;
      socketRef.current = io(serverUrl, {
        transports: ['websocket', 'polling'],
        timeout: 5000,
        autoConnect: true
      });

      socketRef.current.on('connect', () => {
        socketRef.current.emit('order:join', { role: 'cliente', pedido: pedidoId });
      });

      socketRef.current.on('location:update', (locationData) => {
        setRepartidorLocation({
          lat: locationData.lat,
          lng: locationData.lng,
          accuracy: locationData.accuracy,
          timestamp: locationData.timestamp
        });
      });

      socketRef.current.on('connect_error', (socketError) => {
        console.error('Error de conexión al socket:', socketError);
      });

      socketRef.current.on('disconnect', () => {
        setIsTracking(false);
      });
    } catch (err) {
      console.error('Error al inicializar socket:', err);
    }
  }, [pedidoId]);

  useEffect(() => {
    fetchPedidoData();

    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket, fetchPedidoData]);

  useEffect(() => {
    if (!pedidoData) return;

    if (pedidoData.estado === 'En transcurso') {
      connectSocket();
      setIsTracking(true);
    } else {
      disconnectSocket();
    }
  }, [connectSocket, disconnectSocket, pedidoData]);

  useEffect(() => {
    if (!pedidoData) return;

    if (pedidoData.estado === 'Entregado' || pedidoData.estado === 'Cancelado') {
      return;
    }

    const intervalId = setInterval(() => {
      fetchPedidoData({ silent: true });
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchPedidoData, pedidoData]);

  useEffect(() => {
    if (!pedidoData?.direccion_entrega) {
      setDestinoLocation(null);
      return;
    }

    const controller = new AbortController();
    const direccion = `${pedidoData.direccion_entrega}, Honduras`;

    const run = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}&limit=1&countrycodes=hn`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;

        const first = data[0];
        const lat = Number(first.lat);
        const lng = Number(first.lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
        setDestinoLocation({ lat, lng });
      } catch (e) {
        return;
      }
    };

    run();

    return () => controller.abort();
  }, [pedidoData?.direccion_entrega]);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocationError('La geolocalización no es compatible con tu navegador');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log('Ubicación del cliente obtenida:', { latitude, longitude, accuracy });
        const newLocation = {
          lat: latitude,
          lng: longitude,
          accuracy: accuracy
        };
        setClienteLocation(newLocation);
        
        // Actualizar el centro del mapa si es la primera vez que obtenemos la ubicación
        setMapCenter([latitude, longitude]);
        setLocationError(null);
      },
      (err) => {
        console.error('Error de geolocalización:', err);
        setLocationError('No se pudo obtener tu ubicación. Verifica los permisos.');
      },
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!isMapInitialized) return;
    if (!mapRef.current) return;
    if (!repartidorLocation?.lat || !repartidorLocation?.lng) return;

    // Si tenemos ubicación del cliente, mostrar vista que incluya ambos
    if (clienteLocation?.lat && clienteLocation?.lng) {
      try {
        const bounds = L.latLngBounds([
          [repartidorLocation.lat, repartidorLocation.lng],
          [clienteLocation.lat, clienteLocation.lng]
        ]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      } catch (e) {
        return;
      }
    } else {
      // Si no hay ubicación del cliente, centrar en repartidor
      if (!hasCenteredOnRepartidorRef.current) {
        hasCenteredOnRepartidorRef.current = true;
        try {
          mapRef.current.setView([repartidorLocation.lat, repartidorLocation.lng], 15, { animate: true });
        } catch (e) {
          return;
        }
      }
    }
  }, [isMapInitialized, repartidorLocation, clienteLocation]);

  const startTracking = () => {
    if (!isTracking && socketRef.current && socketRef.current.connected) {
      setIsTracking(true);
    }
  };

  const requestClientLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('Ubicación del cliente obtenida manualmente:', pos.coords);
        const newLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        };
        setClienteLocation(newLocation);
        // Actualizar el centro del mapa al obtener la ubicación manualmente
        setMapCenter([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        console.warn('Error obteniendo ubicación del cliente:', error.message);
        alert('No se pudo obtener tu ubicación. Asegúrate de haber dado permiso de geolocalización.');
      },
      options
    );
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Asignado':
        return '#BC7D3B'; // Naranja
      case 'En transcurso':
        return '#5E9C08'; // Verde
      case 'Entregado':
        return '#5E9C08'; // Verde
      case 'Cancelado':
        return '#DC2626'; // Rojo
      default:
        return '#6B7280'; // Gris
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa de seguimiento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!pedidoData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No se encontró información del pedido</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Seguimiento del Pedido</h1>
              <span 
                className="ml-3 px-3 py-1 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: getEstadoColor(pedidoData.estado) }}
              >
                {pedidoData.estado}
              </span>
            </div>
            <div className="flex gap-2">
              {!clienteLocation && (
                <button
                  onClick={requestClientLocation}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Obtener mi ubicación
                </button>
              )}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showDetails ? 'Ocultar' : 'Ver'} Detalles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa y detalles */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Mapa */}
        <div className="flex-1 relative">
          {mapReady ? (
            <MapContainer 
              center={mapCenter}
              zoom={13}
              minZoom={6}
              maxZoom={16}
              maxBounds={HONDURAS_BOUNDS}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
              attributionControl={false}
              whenReady={(map) => {
                mapRef.current = map.target;
                setIsMapInitialized(true);
                if (!repartidorLocation?.lat || !repartidorLocation?.lng) {
                  map.target.fitBounds(HONDURAS_BOUNDS);
                }
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                bounds={HONDURAS_BOUNDS}
                minZoom={6}
                maxZoom={16}
                maxNativeZoom={18}
                noWrap={true}
                updateWhenIdle={false}
                updateWhenZooming={false}
              />

              {/* Mensaje de error de geolocalización */}
              {locationError && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-50 border border-red-200 px-4 py-2 rounded-lg shadow max-w-sm">
                  <span className="text-sm text-red-700">{locationError}</span>
                </div>
              )}

              {/* Mensaje de espera de repartidor */}
              {pedidoData.estado === 'En transcurso' && !repartidorLocation && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 border border-gray-200 px-4 py-2 rounded-lg shadow">
                  <span className="text-sm text-gray-700">Esperando ubicación del repartidor...</span>
                </div>
              )}

              {/* Marcador del repartidor si está en transcurso */}
              {pedidoData.estado === 'En transcurso' && repartidorLocation && (
                <>
                  {typeof repartidorLocation.accuracy === 'number' && (
                    <Circle
                      center={[repartidorLocation.lat, repartidorLocation.lng]}
                      radius={repartidorLocation.accuracy}
                      pathOptions={{ color: '#5E9C08', fillOpacity: 0.15 }}
                    />
                  )}
                  <Marker position={[repartidorLocation.lat, repartidorLocation.lng]}>
                    <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent>
                      Repartidor
                    </Tooltip>
                    <Popup>
                      <div className="text-center">
                        <p className="font-semibold">Repartidor en camino</p>
                        {repartidorLocation.timestamp && (
                          <p className="text-sm text-gray-600">Actualizado: {new Date(repartidorLocation.timestamp).toLocaleTimeString()}</p>
                        )}
                        {typeof repartidorLocation.accuracy === 'number' && (
                          <p className="text-sm text-gray-600">Precisión: {Math.round(repartidorLocation.accuracy)} m</p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                </>
              )}

              {/* Marcador de destino */}
              {destinoLocation && (
                <Marker position={[destinoLocation.lat, destinoLocation.lng]}>
                  <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent>
                    Destino
                  </Tooltip>
                  <Popup>
                    <div className="text-center">
                      <p className="font-semibold">Dirección de entrega</p>
                      <p className="text-sm text-gray-600">{pedidoData.direccion_entrega || 'Dirección no especificada'}</p>
                    </div>
                  </Popup>
                </Marker>
              )}

              {clienteLocation && (
                <>
                  {typeof clienteLocation.accuracy === 'number' && (
                    <Circle
                      center={[clienteLocation.lat, clienteLocation.lng]}
                      radius={clienteLocation.accuracy}
                      pathOptions={{ color: '#163269', fillOpacity: 0.10 }}
                    />
                  )}
                  <Marker position={[clienteLocation.lat, clienteLocation.lng]}>
                    <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent>
                      Tú
                    </Tooltip>
                    <Popup>
                      <div className="text-center">
                        <p className="font-semibold">Tu ubicación (GPS)</p>
                        {typeof clienteLocation.accuracy === 'number' && (
                          <p className="text-sm text-gray-600">Precisión: {Math.round(clienteLocation.accuracy)} m</p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                </>
              )}
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando mapa...</p>
              </div>
            </div>
          )}
        </div>

        {/* Panel de Detalles */}
        {showDetails && (
          <div className="w-full lg:w-96 bg-white shadow-lg p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Detalles del Pedido</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <DetallePedidoCliente pedidoId={pedidoId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MapaSeguimientoPedido;

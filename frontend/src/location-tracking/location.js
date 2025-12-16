import { io } from 'socket.io-client';

let socket = null;
let watchId = null;

export function connectSocket(serverUrl) {
  if (socket && socket.connected) 
    return socket;

  const url = serverUrl || window.location.origin;
  socket = io(url, {
    transports: ['websocket', 'polling'],
    timeout: 5000
  });

  socket.on('connect', () => {
    console.log('Conectado al servidor de ubicación:', serverUrl);
  });

  return socket;
}

export function startLocationTracking(serverUrl,  trackingInfo = {}, onLocationUpdate) {
  if (!('geolocation' in navigator)) {
    console.error('Geolocalización no soportada');
    return null;
  }

  connectSocket(serverUrl);

  const role = trackingInfo.role || 'repartidor';
  const pedido = trackingInfo.pedido;

  if (!pedido) {
    console.warn('No se proporcionó un identificador de pedido, no se unirá a ninguna sala.');
  } else {
    socket.emit('order:join', { role, pedido });
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  // Obtener ubicación
  watchId = navigator.geolocation.watchPosition(
  //param inyectado (coords, success)
    (position) => {
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date(position.timestamp).toISOString()
      };

      // Enviar al servidor
      if (socket && socket.connected) {
        const payload = pedido
          ? { 
            pedido, 
            lat: locationData.latitude, 
            lng: locationData.longitude,
            accuracy: locationData.accuracy,
            timestamp: locationData.timestamp }
          : { 
            lat: locationData.latitude, 
            lng: locationData.longitude,
            accuracy: locationData.accuracy,
            timestamp: locationData.timestamp };

        socket.emit('location:update', payload);
      }

      if (onLocationUpdate) {
        onLocationUpdate(locationData);
      }
    },
    (error) => {
      console.error('Error de geolocalización:', error);
    },
    options
  );

  return watchId;
}


export function stopLocationTracking() {
  if (watchId!== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }
}


const { Server } = require('socket.io');
const { Pedido } = require('../../models');


/*
##eventos###

 - order:join -> repartidor/cliente envían { role, pedido } para unirse a la sala del pedido.
 - order:leave -> (a implementar) permitiría salir de la sala.
 - location:update -> el repartidor comparte su lat/lng y se reenvía a todos los sockets en la sala.
*/
const attachSocket = (server) =>{
    const lastLocations = new Map();
    const io = new Server(server, {
        cors: {
            origin: [
                "https://localhost:5173", 
                "http://localhost:5173", 
                "http://localhost:3000",
                "https://grab-remarkable-clips-virgin.trycloudflare.com",
                "https://paradise-corp-version-inch.trycloudflare.com",
                /^https?:\/\/(?:localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+):[0-9]+$/
            ],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        let role = null;

        socket.on('order:join', (data) => {
            const {role: localRole, pedido} = data;
            role = localRole;
            console.log(`usuario ${role} se ha conectado`);
             //Mete al cliente o repartidor a la sala del pedido
            socket.join(pedido);
            console.log(`El ${role} se ha unido a la sala del pedido: ${pedido}`);    
            //Confirma que se une
            socket.emit('order:joined', {response: true});

            if(role === 'cliente'){
                const last = lastLocations.get(String(pedido));
                if (last) {
                    socket.emit('location:update', last);
                }
            }

            if(role === 'repartidor'){
                //Escucha las actualizaciones de ubicacion del repartidor
                socket.on('location:update', async (locationData) => {
                    const {pedido, lat, lng, accuracy, timestamp} = locationData;
                    try {
                        const pedidoDb = await Pedido.findOne({
                            where: { id_pedido: pedido },
                            attributes: ['estado']
                        });

                        if (!pedidoDb || pedidoDb.estado !== 'En transcurso') {
                            return;
                        }

                        const payload = { lat, lng, accuracy, timestamp };
                        lastLocations.set(String(pedido), payload);
                        console.log(`Ubicacion del repartidor para el pedido ${pedido}: Latitud ${lat}, Longitud ${lng}`);
                        //Transmite la ubicacion a todos los clientes en la sala del pedido
                        io.to(pedido).emit('location:update', payload);
                    } catch (err) {
                        console.error('Error validando estado del pedido para tracking:', err);
                    }
                });
            }

        });


        socket.on('disconnect', () => {
            console.log(`usuario ${role} desconectado`);
        });

        socket.on('order:leave', (data) => {
        console.log(`Cliente ${socket.id} ha dejado la sala del pedido: ${data.orderId}`);
  });

    });

    return io;

};

module.exports = { attachSocket };
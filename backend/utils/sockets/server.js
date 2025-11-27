const { Server } = require('socket.io');


/*
##eventos###

 - order:join -> repartidor/cliente envían { role, pedido } para unirse a la sala del pedido.
 - order:leave -> (a implementar) permitiría salir de la sala.
 - location:update -> el repartidor comparte su lat/lng y se reenvía a todos los sockets en la sala.
*/
const attachSocket = (server) =>{
    const io = new Server(server, {
        cors: {
            origin: "*",
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

            if(role === 'repartidor'){
                //Escucha las actualizaciones de ubicacion del repartidor
                socket.on('location:update', (locationData) => {
                    const {pedido, lat, lng} = locationData;
                    console.log(`Ubicacion del repartidor para el pedido ${pedido}: Latitud ${lat}, Longitud ${lng}`);
                    //Transmite la ubicacion a todos los clientes en la sala del pedido
                    io.to(pedido).emit('location:update', {lat, lng});
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
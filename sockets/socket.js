const { io } = require('../index');


//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    // client.on('mensaje', (data) => {
    //     console.log('Mensaje', data);
    //     io.emit('mensaje', { admin: 'nuevo mensaje' });
    // });

});
const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected, createMessage } = require('../controllers/sockets');

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    const [valido, uid] = validateJWT(client.handshake.headers['x-token']);

    //verifica autenticación
    if (!valido) { return client.disconnect(); }

    //Cliente autenticado
    userConnected(uid);

    //Ingresar al usuario a una sala en particular
    client.join(uid);

    client.on('send-message', async(data) => {
        //TODO: Grabar mensajes
        await createMessage(data);
        io.to(data.to).emit('send-message', data);
    });

    client.on('disconnect', () => {
        userDisconnected(uid);
    });

});
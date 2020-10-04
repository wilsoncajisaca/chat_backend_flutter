const express = require('express');
const path = require('path');
require('dotenv').config();

//app de express
const app = express();

//lectura y parseo del body
app.use(express.json());

//dbconfig
const { dbConnection } = require('./database/config');
dbConnection();

//NodeServer
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

//Mis rutas
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (error) => {

    if (error) throw new Error(error);

    console.log('Servidor corriendo', process.env.PORT);

});
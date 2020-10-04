const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
    } catch (err) {
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}
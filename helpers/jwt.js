const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const data = { uid };
        jwt.sign(data, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('No se puedo generar el token');
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generateJWT
}
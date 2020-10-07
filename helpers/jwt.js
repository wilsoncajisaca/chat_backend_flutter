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

const validateJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];

        next();
    } catch (error) {
        console.log(error);
        return [false, null];
    }
}

module.exports = {
    generateJWT,
    validateJWT
}
const e = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    //leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No se encontro un token"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        });
    }

}

module.exports = {
    validateJWT
}
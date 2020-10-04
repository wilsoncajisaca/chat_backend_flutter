const { response, json } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });
        if (userDB) {
            return res.status(400).json({
                ok: false,
                msg: "Email incorrecto"
            });
        }

        const user = new User(req.body);

        //encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            data: user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comunicate con el administrador"
        });
    }


}

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email No encontrado"
            });
        }
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña Incorrecta"
            });
        }

        //generar el JWT
        const token = await generateJWT(userDB.id);
        res.json({
            ok: true,
            data: userDB,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comunicate con el administrador"
        });
    }
};

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    //generar el JWT
    const token = await generateJWT(uid);
    const userDB = await User.findById(uid);

    res.json({
        ok: true,
        userDB,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}
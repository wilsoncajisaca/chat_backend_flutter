const { response } = require('express');
const Users = require('../models/user');

const getUsers = async(req, res = response) => {
    const users = await Users
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .limit(20);

    res.json({
        ok: true,
        data: users
    });

}

module.exports = {
    getUsers
}
const { response } = require('express');
const Message = require('../models/message');

const getMessages = async(req, res = response) => {
    const myId = req.uid;
    const messageFrom = req.params.from;

    const last30 = await Message.find({
        $or: [{ from: myId, to: messageFrom }, { from: messageFrom, to: myId }]
    }).sort({
        createdAt: 'desc'
    }).limit(30);

    res.json({
        ok: true,
        messages: last30
    });
}
module.exports = {
    getMessages
}
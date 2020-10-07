const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

MessageSchema.method('toJSON', function() {
    const { __v, _id, ...data } = this.toObject();
    return data;
});

module.exports = model('Message', MessageSchema);
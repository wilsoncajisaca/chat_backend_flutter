const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    online: {
        type: Boolean,
        default: false,
    }
});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...data } = this.toObject();
    data.uid = _id;
    return data;
});

module.exports = model('User', UserSchema);
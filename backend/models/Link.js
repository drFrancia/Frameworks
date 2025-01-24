const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'El URL es obligatorio'],
        validate: {
        validator: function (v) {
            return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: 'El URL no es válido',
        },
    },
    tags: {
        type: [String],
        required: true,
    },
    comments: {
        type: [String],
        default: [],
    },
    votes: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Link', LinkSchema);
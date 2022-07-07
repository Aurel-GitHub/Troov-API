const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    where: { type: String, required: true },
    isLost: { type: Boolean },
    when: { type: Date, default: Date.now },
    category: { type: String, required: true },
    brandName: { type: String, required: false },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    status: { type: String, required: false },
    description: { type: String, required: false },
    photo: { type: String, required: true },
});

module.exports = mongoose.model('Item', itemSchema);

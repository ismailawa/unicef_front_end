const mongoose = require('mongoose');

const StateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    code: String
});


module.exports = mongoose.model("State", StateSchema);
const mongoose = require('mongoose');

const LocalAreaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    code: String,
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
});


module.exports = mongoose.model("LGA", LocalAreaSchema);
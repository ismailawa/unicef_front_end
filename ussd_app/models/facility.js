const mongoose = require('mongoose');

const FacilitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    code: String,
    lga: { type: mongoose.Schema.Types.ObjectId, ref: "LGA" },
});


module.exports = mongoose.model("Facility", FacilitySchema);
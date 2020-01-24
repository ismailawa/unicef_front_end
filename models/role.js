const mongoose = require('mongoose');
const bcrytp = require('bcrypt-nodejs');

const RoleSchema = mongoose.Schema({
    title:{
        type:String
    },
    role_id:{
        type: String
    }
});

module.exports = mongoose.model("Role", RoleSchema,'roles');

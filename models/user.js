const mongoose = require('mongoose');
const bcrytp = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
      type:String
    },
    email:{
        type:String,
        required:true
    },
    username: {
      type:String,
      required:true
    },
    phone:{
      type:String
    },
    role:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("User", UserSchema,'users');

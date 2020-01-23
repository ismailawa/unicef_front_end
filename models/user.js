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
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String
    }
});

module.exports = mongoose.model("User", UserSchema,'users');

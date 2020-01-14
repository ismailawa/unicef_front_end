const mongoose = require('mongoose');
const bcrytp = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    fullname:{
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
    } 
});

UserSchema.methods.hashPassword = (password)=>{
    return bcrytp.hashSync(password,bcrytp.genSalt(10))
}

UserSchema.methods.comparePassword = (password, hash)=>{
    return bcrytp.compareSync(password,hash);
}

module.exports = mongoose.model("User", UserSchema,'users');
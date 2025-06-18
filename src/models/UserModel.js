const mongoose = require("mongoose")
const v = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!v.isEmail(value)) throw new Error("Invalid email")
        }
    }, 
    password: {
        type: String,
        required: true,
        validate(value){
            if(!v.isStrongPassword(value)) throw new Error("type a strong password")
        }
    },
    age: Number,
    gender: String,
    photoUrl: String,
    about: String,
    skills: [String],

    
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function(){
    const token = await jwt.sign({_id: this._id}, "jwt-secret-key-for-server-from-.env", 
                    {expiresIn: "7d"})
    return token;
}

userSchema.methods.validatePassword = async function (reqPassword){
    const isPasswordValid = await bcrypt.compare(reqPassword, this.password)
    return isPasswordValid
}

const UserModel = new mongoose.model("user", userSchema)

module.exports = {UserModel}

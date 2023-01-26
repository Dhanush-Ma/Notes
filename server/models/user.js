const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            min: 2,
            required: true,
        },
        email:{
            type: String,
            unique: true,
            required: true,
        },
        password:{
            type: String,
            required: true
        },
        accountCreatedAt:{
            type: Date,
            default: Date.now
        }
    }
)

userSchema.methods.generateJWT = function(){
    const token = jwt.sign({_id:this._id},"privateKey")
    return token
}

const Users = mongoose.model("Users",userSchema)

//JOI Validatio

function validate(user){
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    return schema.validate(user)
}

module.exports = {Users, validate}
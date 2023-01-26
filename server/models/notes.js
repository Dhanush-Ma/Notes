const mongoose = require("mongoose")
const Joi = require("joi")

const notesSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        body:{
            type: String,
            required: true,
        },
        user:{
            _id:{
                type: mongoose.Types.ObjectId,
                required: true,
            }
        },
        noteCreatedAt:{
            type: Date,
            default: Date.now
        }
    }
)


const Notes = mongoose.model("Notes",notesSchema)

//JOI Validation
function validate(user){
    const schema = Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        userId: Joi.string().required()
    })

    return schema.validate(user)
}

module.exports = {Notes, validate}
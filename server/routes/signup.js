const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {Users, validate} = require('../models/user')

router.post('/', async(req, res) => {
    const {error} = validate(req.body)

    if(error){
        return res.status(400).send(error.details[0].message)
    }

    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        const checkUser = await Users.findOne({email:user.email})
        if(checkUser){
            return res.status(400).send("Email already exists.")
        }

        user = await new Users(user)
        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(user.password, salt)
        user.password = hashed
        await user.save()

        // SET JWT TOKEN
        const token = user.generateJWT()
        res.status(200).header('x-auth-token', token).send(token)

    } catch (error) {
        console.log(error.message)
        
    }
})

module.exports = router
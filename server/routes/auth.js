const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {Users, validate} = require('../models/user')

router.post('/', async(req, res) => {
 
    try {
        const checkUser = await Users.findOne({email:req.body.email})
        if(!checkUser){
            return res.status(400).send("Email not registered. Try Signing in.")
        }

        const validPassword = await bcrypt.compare(req.body.password, checkUser.password)
        if(!validPassword){
            return res.status(400).send("Invalid Password")
        }

        // SET JWT TOKEN
        const token = checkUser.generateJWT()
        res.header('x-auth-token', token).send(token)

    } catch (error) {
        console.log(error.message)   
    }
})

module.exports = router
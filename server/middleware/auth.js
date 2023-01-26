const jwt = require("jsonwebtoken")
const {Users} = require('../models/user')

async function auth(req, res, next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send("Access Denied")

    try{
        const loggedInUser = jwt.verify(token, "privateKey")
        const user = await Users.findById(loggedInUser._id)
        const {_id, name} = user
        req.user = {_id, name}
        next()
    }catch(err){
        res.status(400).send("Invalid Token")
    }


}

module.exports = auth
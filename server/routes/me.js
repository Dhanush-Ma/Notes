const express = require('express')
const router = express.Router()
const {Notes, validate} = require('../models/notes')
const auth = require('../middleware/auth')

router.get('/', auth, async(req, res) => {
    res.send(req.user)
})

router.post('/', async(req,res) => {
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let note = {
        title: req.body.title,
        body: req.body.body,
        user:{
            _id: req.body.userId
        }
    }

    try {
        
        note = await new Notes(note)
        note.save()
        res.status(200).send("Note Added Sucessfully")
        
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router


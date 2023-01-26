const express = require('express')
const router = express.Router()
const {Notes} = require('../models/notes')

router.post('/', async(req,res) => {
    try {
        let notes = await Notes
                            .find({"user._id": req.body.userId})
                            .sort({noteCreatedAt: -1})
        res.status(200).send(notes)     
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async(req,res) => {
    try {
        let updatedNote = await Notes.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                body: req.body.body,
                noteCreatedAt: Date.now()
            }
        })
        if(!updatedNote) return res.status(500)

        res.status(200).send("Note updated Sucessfully")

    } catch (error) {
        console.log(error)
    }
})



router.delete('/:id', async(req,res) => {
    try {
        let deletedNote = await Notes.findByIdAndDelete(req.params.id)

        if(!deletedNote) return res.status(400).send("Note not found!")

        res.status(200).send("Note deleted")

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async(req,res) => {
    try {
        let note = await Notes.findById(req.params.id)

        if(!note) return res.status(400).send("Note not found!")

        res.status(400).send(note)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router





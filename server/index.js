const express = require("express")
const mongoose = require("mongoose")
const app = express()
const signup = require("./routes/signup")
const auth = require('./routes/auth')
const me = require("./routes/me")
const notes = require("./routes/notes")
const cors = require('cors')

//init
app.use(express.json())
app.use(cors())
app.use('/signup', signup)
app.use('/auth', auth)
app.use('/me', me)
app.use('/me/notes', notes)

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/Notes",{
    family: 4,
    useNewUrlParser: true
})
    .then(() => console.log("Connect to MongoDB"))
    .catch((err) => console.log(err) )

const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

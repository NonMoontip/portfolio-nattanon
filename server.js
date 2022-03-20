const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const https = require('https')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post('/', (req, res) => {
    var name = req.body.name;
    var comment = req.body.comment;
    const Person = mongoose.model('Person ', personSchema);
    async function createPerson() {
        const person = Person({
            name: name,
            comment: comment
        })
        const data = await person.save();
        console.log(data);
    }
    createPerson();
    res.send("success")
})

const config = {
    autoIndex: true,
    useNewUrlParser: true,
}

const connectionString = 'mongodb+srv://dbComment:opor25432543@cluster0.djp1h.mongodb.net/Comment?retryWrites=true&w=majority';
mongoose.connect(connectionString, config)
    .then(() => console.log('connected to mongoDB.....'))
    .catch(() => console.log('Cannot connect to MongoDB'))

app.listen('3000', () => {
    console.log('server is started')
})

const personSchema = new mongoose.Schema({
    name: String,
    comment: String,
})

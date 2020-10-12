const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
require('dotenv').config()

// MongoDB Setup
const MongoClient = require('mongodb').MongoClient
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mx72a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})
client.connect(err => {
const appoinmentCollection = client.db(process.env.DB_NAME).collection('appoinments')

app.post('/addAppoinment', (req,res)=>{
    appoinmentCollection.insertOne(req.body)
    .then(result=>{
        res.send(result.insertedCount>0)
    })
})

})






app.get('/',(req,res)=> res.send("Welcome Node developer Nazmul Huda"))

app.listen(port)
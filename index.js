const express = require('express')
require('dotenv').config()
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const port = 5000

app.get('/', (req, res) => {
  res.send('hello!')
})


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5rt5l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection("toyInfo");
  console.log('connected to database');
});


app.listen(process.env.PORT || port)
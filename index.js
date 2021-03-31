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
const { ObjectId } = require('bson')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5rt5l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection("toyInfo");
  const purchaseCollection = client.db(`${process.env.DB_NAME}`).collection("purchaseInfo");

  app.post('/addProduct', (req, res) => {
    collection.insertOne(req.body)
    .then(result => console.log(result)) 
    .catch(err => console.log(err))
  })

  app.post('/setcart', (req, res) => {
    purchaseCollection.insertOne(req.body)
    .then(result => console.log(result)) 
    .catch(err => console.log(err))
  })

  app.get('/toys', (req, res) => {
    collection.find({})
    .toArray((err, items) => {
        res.send(items)
    })
  })

  app.get('/toys/:id', (req, res) => {
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })

  app.get('/orders/:email', (req, res) => {
    purchaseCollection.find({email: req.params.email})
    .toArray((err, items) => {
        res.send(items)
    })
  })

  console.log('connected to database');
});


app.listen(process.env.PORT || port)
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const express = require('express')

const app = express()

app.use(express.json())

const mongoose = require('mongoose')

const Item = require('./models/Item')

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.b8sem.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Successful connection to MongoDB!'))
    .catch(() => console.log('Connection to MongoDB failed!'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    )
    next()
})

app.post('/api/item', (req, res) => {
    delete req.body._id
    const item = new Item({
        ...req.body,
    })
    item.save(item)
        .then(() => res.status(201).json({ message: 'Object recorded !' }))
        .catch((error) => res.status(400).json({ error }))
})

app.get('/api/item', (req, res) => {
    Item.find()
        .then((items) => res.status(200).json(items))
        .catch((error) => res.status(401).json({ error }))
})

module.exports = app

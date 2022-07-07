const express = require('express');

const app = express();

app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.b8sem.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Successful connection to MongoDB!'))
  .catch(() => console.log('Connection to MongoDB failed!'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/item', (req, res) => {
  res.status(200).json({ message: 'Your item was created !' });
});

app.get('/api/item', (req, res) => {
  const item = [{
    _id: 'sdf65sdf65',
    where: 'aeroport',
    isLost: true,
    when: '2022-06-25',
    category: 'portefeuille',
    brandName: 'toto',
    firstname: 'doe',
    lastname: 'john',
    status: 'sdfsdfsdf',
    description: 'fdsf',
    photo: 'sfsd',
    userId: 'sd6f45d4fsd4f',
  }];

  res.status(200).json(item);
});

module.exports = app;

const express = require('express');
const mongodb = require('mongodb').MongoClient;

const app = express();

const PORT = process.env.PORT || 3000;
const url =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/learning-mongodb';

app.get('/', async (req, res) => {
  try {
    const client = await mongodb.connect(url, { useUnifiedTopology: true });
    const db = client.db('learning-mongodb');
    const collection = db.collection('pets');
    const pets = await collection.find({}).toArray();
    res.send(pets);
  } catch (err) {
    console.log(err.toString());
    res.json({ err: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

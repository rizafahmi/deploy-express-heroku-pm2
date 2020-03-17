const express = require('express');
const mongodb = require('mongodb').MongoClient;
const faker = require('faker');

const app = express();

const PORT = process.env.PORT || 3000;
const url =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/learning-mongodb';

// mongodb+srv://riza:riza@cluster0-ooomx.mongodb.net/test

app.get('/', async (req, res) => {
  try {
    const client = await mongodb.connect(url, { useUnifiedTopology: true });
    const db = client.db('learning-mongodb');
    const collection = db.collection('pets');
    const pets = await collection.find({}).toArray();
    if (pets.length > 0) {
      res.json(pets);
    } else {
      for (let i = 0; i < 100; i++) {
        collection.insertOne({
          name: faker.name.findName(),
          species: faker.company.companyName()
        });
        console.log('Insert');
        res.json({ message: 'Data insert finish.' });
      }
    }
  } catch (err) {
    console.log(err.toString());
    res.json({ err: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const journalSchema = new mongoose.Schema({
  date: String,
  info: String,
});

// create a virtual paramter that turns the default _id field into id
journalSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
journalSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Entry = mongoose.model('Entry', journalSchema);

app.get('/api/entries', async (req, res) => {
  try {
    let entries = await Entry.find();
    res.send({
      entries: entries
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/entries', async (req, res) => {
  const entry = new Entry({
    name: req.body.name,
    info: req.body.info
  });
  try {
    await entry.save();
    res.send({
      entry: entry
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/entries/:id', async (req, res) => {
  try {
    await Entry.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
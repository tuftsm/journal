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
  highlight: String
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
    date: req.body.date,
    info: req.body.info,
    highlight: req.body.highlight
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

const plannerSchema = new mongoose.Schema({
  exercise: String,
  sets: String,
  reps: String,
  date: String,
  time: String
});

// create a virtual paramter that turns the default _id field into id
plannerSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
plannerSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Plan = mongoose.model('Plan', plannerSchema);

app.get('/api/planner', async (req, res) => {
  try {
    let planner = await Plan.find();
    res.send({
      planner: planner
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/planner', async (req, res) => {
  const plan = new Plan({
    exercise: req.body.exercise,
    sets: req.body.sets,
    reps: req.body.sets,
    date: req.body.date,
    time: req.body.time
  });
  try {
    await plan.save();
    res.send({
      plan: plan
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/planner/:id', async (req, res) => {
  try {
    await Plan.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


const calendarSchema = new mongoose.Schema({
  course: String,
  assignment: String,
  due: String,
  updated: String,
  completion: String
});

// create a virtual paramter that turns the default _id field into id
calendarSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
calendarSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Assignment = mongoose.model('Assignment', calendarSchema);

app.get('/api/calendar', async (req, res) => {
  try {
    let calendar = await Assignment.find();
    res.send({
      calendar: calendar
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/calendar', async (req, res) => {
  const assignment = new Assignment({
    course: req.body.course,
    assignment: req.body.assignment,
    due: req.body.due,
    completion: req.body.completion
  });
  try {
    await assignment.save();
    res.send({
      assignment: assignment
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/calendar/:id', async (req, res) => {
  console.log("In put");
  let id = (req.params.id);
  let updatedValue = parseInt(req.body.completion);
  try {
    if (updatedValue >= 100) {
      await Assignment.deleteOne({
        _id: id
      });
      res.sendStatus(200);
    }
  else {
    let planner = await Assignment.update({_id: id}, { $set: {completion: updatedValue}})
      console.log('in else: ');
        res.send({
          planner
          });
    }
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/calendar/:id', async (req, res) => {
  try {
    await Assignment.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
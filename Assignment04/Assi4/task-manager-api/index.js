const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://vaishnavisobale:Sobale@129cluster0.mrw2b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
const Task = require('./models/task');
mongoose.connect('mongodb://localhost:27017/taskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  

// Create Task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All Tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Task by ID
app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Task
app.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

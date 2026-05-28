const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://database:27017/tasksdb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();

  if (tasks.length === 0) {
    const sampleTask = await Task.create({
      title: 'Learn Docker Compose',
      completed: false
    });

    return res.json([sampleTask]);
  }

  res.json(tasks);
});

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});

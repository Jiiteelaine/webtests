const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// MongoDB model
const timerSchema = new mongoose.Schema({
  id: String,
  startTime: Number,
  duration: Number
});
const Timer = mongoose.model('Timer', timerSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/timers', { useNewUrlParser: true, useUnifiedTopology: true });

// Save or update timer state
app.post('/api/timer/start', async (req, res) => {
  const { id, startTime, duration } = req.body;
  await Timer.findOneAndUpdate({ id }, { startTime, duration }, { upsert: true });
  res.send({ status: 'Timer updated' });
});

// Get timer state
app.get('/api/timer/state', async (req, res) => {
  const timers = await Timer.find({});
  res.send(timers);
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

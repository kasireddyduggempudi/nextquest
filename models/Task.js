const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['completed', 'not completed'], default: 'not completed' },
});

const Task = mongoose.model('Task', taskSchema, 'Task');

module.exports = Task;

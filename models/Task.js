const mongoose = require('mongoose');
const { TaskStatusEnum } = require('../utils/enums');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: Object.keys(TaskStatusEnum), default: TaskStatusEnum.NOT_COMPLETED },
});

taskSchema.pre('save', function (next) {
    if (!Object.values(TaskStatusEnum).includes(this.status)) {
      next(new Error('Invalid status value'));
    } else {
      next();
    }
});

taskSchema.pre('findOneAndUpdate', function (next) {
    const updatedFields = this.getUpdate();
    const updatedStatus = updatedFields && updatedFields.status;
  
    if (updatedStatus && !Object.values(TaskStatusEnum).includes(updatedStatus)) {
      next(new Error('Invalid status value'));
    } else {
      next();
    }
});

const Task = mongoose.model('Task', taskSchema, 'Task');

module.exports = Task;

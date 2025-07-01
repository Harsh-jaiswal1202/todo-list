import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = ({ editTask, setEditTask }) => {
  const { addTask, updateTask } = useContext(TaskContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('Medium');
  const [tags, setTags] = useState('');

  // Pre-fill form if editing
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || '');
      setDueDate(editTask.dueDate ? new Date(editTask.dueDate) : null);
      setPriority(editTask.priority || 'Medium');
      setTags(editTask.tags || '');
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString() : null,
      priority,
      tags,
    };

    if (editTask) {
      updateTask(editTask.id, taskData);
      setEditTask(null);
    } else {
      addTask(taskData);
    }

    // Clear form
    setTitle('');
    setDescription('');
    setDueDate(null);
    setPriority('Medium');
    setTags('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editTask ? 'Edit Task' : 'Add New Task'}</h2>

      <input
        type="text"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        placeholderText="Select due date"
        className="datepicker"
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;

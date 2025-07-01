import React, { useState, useEffect, useContext } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import KanbanView from './components/KanbanView';
import { TaskContext } from './context/TaskContext';
import { isToday, isPast, parseISO } from 'date-fns';
import './App.css';

const App = () => {
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { tasks } = useContext(TaskContext);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task) => {
        if (!task.dueDate || task.completed) return;

        const due = parseISO(task.dueDate);

        if (isToday(due)) {
          showReminder(`🕒 Task Due Today: ${task.title}`);
        } else if (isPast(due)) {
          showReminder(`⚠️ Overdue Task: ${task.title}`);
        }
      });
    }, 60000); // every 1 min

    return () => clearInterval(interval);
  }, [tasks]);

  const showReminder = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('🔔 Reminder', { body: message });
    }
  };

  return (
    <div className="app-container">
      <h1>📝 To-Do List</h1>
      <TaskForm editTask={editTask} setEditTask={setEditTask} />
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <TaskList onEdit={setEditTask} filter={filter} search={search} />
      <CalendarView />
      <KanbanView />
    </div>
  );
};

export default App;

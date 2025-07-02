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
  const [darkMode, setDarkMode] = useState(() => {
    // Persist dark mode preference in localStorage
    return localStorage.getItem('darkMode') === 'true';
  });

  const { tasks } = useContext(TaskContext);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode); // store preference
  }, [darkMode]);

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📝 To-Do List</h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: darkMode ? '#333' : '#eee',
            color: darkMode ? '#fff' : '#222',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <TaskForm editTask={editTask} setEditTask={setEditTask} />
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <TaskList onEdit={setEditTask} filter={filter} search={search} />
      <CalendarView tasks={tasks} />
      <KanbanView />
    </div>
  );
};

export default App;

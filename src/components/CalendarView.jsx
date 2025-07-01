import React, { useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskContext } from '../context/TaskContext';
import { parseISO } from 'date-fns';
import './CalendarView.css';

const CalendarView = () => {
  const { tasks } = useContext(TaskContext);

  const events = tasks
    .filter((task) => task.dueDate)
    .map((task) => ({
      id: task.id,
      title: task.title,
      date: parseISO(task.dueDate),
      backgroundColor: task.completed ? '#2ecc71' : '#007bff',
    }));

  return (
    <div className="calendar-container">
      <h2>📅 Calendar View</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
};

export default CalendarView;

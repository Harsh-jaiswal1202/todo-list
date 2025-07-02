import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const CalendarView = ({ tasks }) => {
  const [date, setDate] = React.useState(new Date());

  // Find tasks for the selected date
  const tasksForDate = tasks.filter(
    (task) =>
      task.dueDate &&
      isSameDay(new Date(task.dueDate), date)
  );

  return (
    <div className="calendar-view">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date: tileDate }) => {
          // Highlight days with tasks
          const hasTask = tasks.some(
            (task) =>
              task.dueDate &&
              isSameDay(new Date(task.dueDate), tileDate)
          );
          if (hasTask) return 'calendar-has-task';
          if (isSameDay(new Date(), tileDate)) return 'react-calendar__tile--now';
          return null;
        }}
      />
      <div style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
        Selected: {date.toLocaleDateString()}
      </div>
      <ul style={{ marginTop: '1rem', padding: 0, listStyle: 'none' }}>
        {tasksForDate.length > 0 ? (
          tasksForDate.map((task) => (
            <li key={task.id} style={{
              background: '#f5f5f5',
              margin: '0.5rem 0',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#333'
            }}>
              {task.title}
            </li>
          ))
        ) : (
          <li style={{ color: '#888' }}>No tasks for this date.</li>
        )}
      </ul>
    </div>
  );
};

export default CalendarView;
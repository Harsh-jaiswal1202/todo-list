import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { isToday, parseISO } from 'date-fns';

const TaskList = ({ onEdit, filter, search }) => {
  const { tasks } = useContext(TaskContext);

  const filterTasks = () => {
    let filtered = tasks;

    if (filter === 'completed') {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter === 'today') {
      filtered = filtered.filter((task) =>
        task.dueDate ? isToday(parseISO(task.dueDate)) : false
      );
    } else if (filter === 'high') {
      filtered = filtered.filter((task) => task.priority === 'High');
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.tags.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const filteredTasks = filterTasks();

  if (filteredTasks.length === 0)
    return <p className="no-tasks">No matching tasks found.</p>;

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;

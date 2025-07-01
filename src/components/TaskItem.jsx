import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const TaskItem = ({ task, onEdit }) => {
  const { deleteTask, toggleComplete } = useContext(TaskContext);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#e74c3c';
      case 'Medium': return '#f39c12';
      case 'Low': return '#2ecc71';
      default: return '#ccc';
    }
  };

  return (
    <div className="task-item">
      <div className="task-main">
        <span
          className="icon"
          onClick={() => toggleComplete(task.id)}
          title="Toggle complete"
        >
          {task.completed ? <FaCheckCircle color="#2ecc71" /> : <FaRegCircle />}
        </span>

        <div className="task-details">
          <h3 className={task.completed ? 'completed' : ''}>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <div className="task-meta">
            {task.dueDate && (
              <span className="due">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            <span
              className="priority"
              style={{ color: getPriorityColor(task.priority) }}
            >
              {task.priority}
            </span>
            {task.tags && (
              <span className="tags">
                {task.tags.split(',').map((tag, i) => (
                  <span key={i} className="tag">
                    #{tag.trim()}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <FaEdit onClick={() => onEdit(task)} title="Edit" />
        <FaTrash onClick={() => deleteTask(task.id)} title="Delete" />
      </div>
    </div>
  );
};

export default TaskItem;

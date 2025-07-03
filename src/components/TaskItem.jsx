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
        {/* Complete/Incomplete Toggle */}
        <button
          className="icon-btn"
          onClick={() => toggleComplete(task.id)}
          title={task.completed ? "Mark as incomplete" : "Mark as complete"}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          tabIndex={0}
        >
          {task.completed ? <FaCheckCircle color="#2ecc71" /> : <FaRegCircle />}
        </button>

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
        <button
          className="icon-btn"
          onClick={() => onEdit(task)}
          title="Edit"
          aria-label="Edit"
          tabIndex={0}
        >
          <FaEdit />
        </button>
        <button
          className="icon-btn"
          onClick={() => deleteTask(task.id)}
          title="Delete"
          aria-label="Delete"
          tabIndex={0}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

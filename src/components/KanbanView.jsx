import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './KanbanView.css';

const columns = {
  todo: { title: '📝 To Do' },
  'in-progress': { title: '🛠️ In Progress' },
  done: { title: '✅ Done' },
};

const KanbanView = () => {
  const { tasks, updateTask } = useContext(TaskContext);

  const grouped = {
    todo: [],
    'in-progress': [],
    done: [],
  };

  tasks.forEach((task) => {
    grouped[task.status || 'todo'].push(task);
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    updateTask(draggableId, { status: destination.droppableId });
  };

  return (
    <div className="kanban-container">
      <h2>📦 Kanban View</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-columns">
          {Object.entries(columns).map(([status, { title }]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{title}</h3>
                  {grouped[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          className="kanban-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span className="task-title">{task.title}</span>
                          {task.dueDate && (
                            <div className="due-date">
                              📅 {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanView;

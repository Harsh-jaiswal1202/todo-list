import React from 'react';

const TaskFilter = ({ filter, setFilter, search, setSearch }) => {
  return (
    <div className="task-filter">
      <input
        type="text"
        placeholder="🔍 Search by title or tag..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="today">Due Today</option>
        <option value="high">High Priority</option>
      </select>
    </div>
  );
};

export default TaskFilter;

import React from 'react';
import SearchBar from './components/SearchBar';
import DraggableTaskList from './components/DraggableTaskList';
import TaskAddForm from './components/TaskAddForm';

export default function FilterableTasksPanel({
  handleDragEnd,
  taskViews,
  filterCriteria,
  handleFilterChange,
  addTask,
}) {
  console.log(taskViews);
  return (
    <div className="card h-100 ">
      <div className=" card-body h-100 d-flex flex-column">
        <h5 className="text-center flex-shrink-0">Tasks</h5>
        <SearchBar className="flex-shrink-0" filterCriteria={filterCriteria} onFilterChange={handleFilterChange} />
        <DraggableTaskList className="flex-grow-1" handleDragEnd={handleDragEnd} taskViews={taskViews} />
        <TaskAddForm className="flex-shrink-0" addTask={addTask} />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

const Filtering = ({ onFilterChange, filterCriteria, taskModel }) => {
  const [showCompleted, setShowCompleted] = useState(filterCriteria.showCompleted);
  const [selectedProject, setSelectedProject] = useState(filterCriteria.selectedProject);
  const [searchText, setSearchText] = useState(filterCriteria.searchText);
  const [projects, setProjects] = useState([]);
  

  useEffect(() => {
    const activeProjects = [...new Set(taskModel.tasks.filter(task => task.completionDate === null).map(task => task.project))];
    setProjects(activeProjects);
  }, [taskModel]);

  const handleShowCompletedChange = (e) => {
    const checked = e.target.checked;
    setShowCompleted(checked);
    onFilterChange({ showCompleted: checked, selectedProject, searchText });
  };

  const handleProjectChange = (e) => {
    const value = e.target.value;
    setSelectedProject(value);
    onFilterChange({ showCompleted, selectedProject: value, searchText });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onFilterChange({ showCompleted, selectedProject, searchText: value });
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showCompleted}
            onChange={handleShowCompletedChange}
            id="showCompleted"
          />
          <label className="form-check-label" htmlFor="showCompleted">
            Show completed tasks
          </label>
        </div>
        <div className="form-group flex-grow-1 ms-3 me-3">
          <label htmlFor="projectFilter">Filter by project:</label>
          <select
            className="form-select"
            id="projectFilter"
            value={selectedProject}
            onChange={handleProjectChange}
          >
            <option value="">All</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group flex-grow-1">
          <label htmlFor="summaryFilter">Filter by summary:</label>
          <input
            type="text"
            className="form-control"
            id="summaryFilter"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Filtering;

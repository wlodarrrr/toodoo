import React, { useState, useEffect } from 'react';
import TagsPanel from './tags/TagsPanel';
import ProjectsPanel from './projects/ProjectsPanel';
import FilterableTasksPanel from './tasks/FilterableTasksPanel';
import { load, persist } from '../utils/Persistence';
import { convertStringToTask } from '../utils/TaskConverter';
import { getAllTags, getFilteredTasks, getAllProjects } from '../utils/TaskListUtils';
import Task from './tasks/components/Task';

export default function App() {
  const [tasks, setTasks] = useState(() => load());
  const [filterCriteria, setFilterCriteria] = useState({
    showCompleted: false,
    selectedProject: '',
    selectedTags: [],
    searchText: '',
  });

  useEffect(() => persist(tasks), [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, draggedTask);
    setTasks(updatedTasks);
  };

  const completeTask = (taskId, completed) => {
    tasks.filter((task) => task.id === taskId)[0].completionDate = completed ? new Date() : null;
    setTasks([...tasks]);
  };

  const addTask = (message) => {
    const task = convertStringToTask(message);
    setTasks([...tasks, task]);
  };

  const editTask = (editedTask) => {
    const index = tasks.findIndex((task) => task.id === editedTask.id);
    tasks[index] = editedTask;
    setTasks([...tasks]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleFilterChange = (updatedCriteria) => {
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      ...updatedCriteria,
    }));
  };

  const handleTagClick = (tag) => {
    setFilterCriteria((prevCriteria) => {
      let prevTags = prevCriteria.selectedTags;
      return {
        ...prevCriteria,
        selectedTags: prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag],
      };
    });
  };

  const handleProjectClick = (project) => {
    setFilterCriteria((prevCriteria) => {
      let prevProject = prevCriteria.selectedProject;
      return {
        ...prevCriteria,
        selectedProject: project === prevProject ? '' : project,
      };
    });
  };

  const getTaskViews = () => {
    return getFilteredTasks(tasks, filterCriteria).flatMap((task, index) => (
      <Task
        key={index}
        task={task}
        completeTask={completeTask}
        removeTask={removeTask}
        onTagClick={handleTagClick}
        onProjectClick={handleProjectClick}
        onEdit={editTask}
      />
    ));
  };
  return (
    <div className="container h-100">
      <div className="row h-100 ">
        <div className="col-2 h-100 ">
          <TagsPanel
            tags={getAllTags(tasks)}
            selectedTags={filterCriteria.selectedTags}
            handleTagClick={handleTagClick}
          />
        </div>
        <div className="col-2 h-100 ">
          <ProjectsPanel
            projects={getAllProjects(tasks)}
            selectedProject={filterCriteria.selectedProject}
            handleProjectClick={handleProjectClick}
          />
        </div>
        <div className=" col-8 h-100 ">
          <FilterableTasksPanel
            handleDragEnd={handleDragEnd}
            taskViews={getTaskViews()}
            filterCriteria={filterCriteria}
            handleFilterChange={handleFilterChange}
            addTask={addTask}
          />
        </div>
      </div>
    </div>
  );
}

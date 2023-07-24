import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import Filtering from './Filtering';
import TaskAdder from './TaskAdder';
import { convertStringToTask } from '../utils/TaskConverter';
import { load, persist } from '../utils/Persistence';
import { getAllProjects, getAllTags, getFilteredTasks } from '../utils/TaskListUtils';

const TodoListApp = () => {
  const [tasks, setTasks] = useState(() => load());
  const [filterCriteria, setFilterCriteria] = useState({
    showCompleted: false,
    selectedProject: '',
    selectedTags: [],
    searchText: '',
  });

  useEffect(() => persist(tasks), [tasks]);

  const handleDragEnd = (result) => {
    console.log(result);
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

  return (
    <div className="d-flex flex-row h-100 w-100 gap-2">
      {/* Left Column - Tags */}
      <div className="card mb-3 flex-shrink-0">
        <div className="card-body">
          <h5>Tags</h5>
          <ul className=" list-group gap-2">
            {getAllTags(tasks).map((tag, index) => (
              <li
                key={index}
                className={
                  'badge btn bg-primary' +
                  (filterCriteria.selectedTags.includes(tag) ? ' border border-light border-2' : '')
                }
                onClick={() => handleTagClick(tag)}
              >
                {'@' + tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Middle Column - Projects */}
      <div className="card mb-3 flex-shrink-0">
        <div className="card-body">
          <h5>Projects</h5>
          <ul className="list-group gap-2">
            {getAllProjects(tasks).map((project, index) => (
              <li
                key={index}
                className={
                  'badge btn bg-success ' +
                  (filterCriteria.selectedProject === project ? ' border border-light border-2' : '')
                }
                onClick={() => handleProjectClick(project)}
              >
                {'#' + project}
              </li>
            ))}
          </ul>
        </div>
      </div>
      

      {/* Right column - Tasks */}
      <div className="flex-column card mb-3 flex-grow-1 overflow-y-scroll">
        <div className="card-body d-flex flex-column overflow-y-scroll">
          <h5>Tasks</h5>
          <div className="flex-shrink-0 m-2">
            <Filtering
              filterCriteria={filterCriteria}
              onFilterChange={handleFilterChange}
              onTagClick={handleTagClick}
              onProjectClick={handleProjectClick}
            />
          </div>
          <div className="d-flex flex-column flex-grow-1 m-2 overflow-y-scroll">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="list-group list-group-flush gap-1"
                  >
                    {getFilteredTasks(tasks, filterCriteria).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <Task
                            task={task}
                            provided={provided}
                            completeTask={completeTask}
                            removeTask={removeTask}
                            onTagClick={handleTagClick}
                            onProjectClick={handleProjectClick}
                            onEdit={(task) => editTask(task)}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="m-2 flex-shrink-0">
            <TaskAdder onAddTask={addTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListApp;

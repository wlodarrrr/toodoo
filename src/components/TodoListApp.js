import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import TaskModel from '../model/TaskModel';
import Filtering from './Filtering';
import TaskAdder from './TaskAdder';

const TodoListApp = () => {
  const [taskModel, setTaskModel] = useState(new TaskModel());
  const [filterCriteria, setFilterCriteria] = useState({
    showCompleted: false,
    selectedProject: '',
    selectedTags: [],
    searchText: '',
  });

  useEffect(() => {
    localStorage.setItem('filterCriteria', JSON.stringify(filterCriteria));
  }, [filterCriteria]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    taskModel.reorderTasks(source.index, destination.index);
    setTaskModel(new TaskModel(taskModel.tasks));
  };

  const completeTask = (taskId, completionDate) => {
    taskModel.updateCompletion(taskId, completionDate);
    setTaskModel(new TaskModel(taskModel.tasks));
  };

  const addTask = (message) => {
    let project = '';
    let tags = [];
    let summary = message;

    let hashIndex = summary.indexOf('#');
    if (hashIndex > -1) {
      let spaceIndex = summary.indexOf(' ', hashIndex);
      if (spaceIndex < 0) spaceIndex = summary.length;
      project = summary.slice(hashIndex + 1, spaceIndex);
      summary = summary.slice(0, hashIndex) + summary.slice(spaceIndex, summary.length);
    }

    while (summary.indexOf('@') > -1) {
      let atIndex = summary.indexOf('@');
      let spaceIndex = summary.indexOf(' ', atIndex);
      if (spaceIndex < 0) spaceIndex = summary.length;
      tags.push(summary.slice(atIndex + 1, spaceIndex));
      summary = summary.slice(0, atIndex) + summary.slice(spaceIndex, summary.length);
    }

    summary = summary.trim();
    taskModel.addTask(summary, project, tags);
    setTaskModel(new TaskModel(taskModel.tasks));
  }



  const handleFilterChange = (updatedCriteria) => {
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, ...updatedCriteria }));
  };


  const handleTagClick = (tag) => {
    setFilterCriteria(prevCriteria => {
      let prevTags = prevCriteria.selectedTags;
      return { ...prevCriteria, selectedTags: prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag] };
    });
  }

  const handleProjectClick = (project) => {
    setFilterCriteria(prevCriteria => {
      let prevProject = prevCriteria.selectedProject;
      return { ...prevCriteria, selectedProject: project === prevProject ? '' : project };
    })
  }

  const removeTask = (taskId) => {
    const updatedTasks = taskModel.tasks.filter((task) => task.id !== taskId);
    setTaskModel(new TaskModel(updatedTasks));
  };


  const getFilteredTasks = () => {
    const { showCompleted, selectedProject, searchText, selectedTags } = filterCriteria;

    const filteredTasks = taskModel.tasks.filter((task) => {
      const isCompletionMatch = showCompleted || task.completionDate === null;
      const isProjectMatch = selectedProject === '' || selectedProject === task.project;
      const isSummaryMatch = task.summary.toLowerCase().includes(searchText.toLowerCase());
      const isTagsMatch = selectedTags.every((tag) => task.tags.includes(tag));

      return isCompletionMatch && isProjectMatch && isSummaryMatch && isTagsMatch;
    });

    return filteredTasks;
  };

  useEffect(() => {
    document.title = 'TooDoo'; // Change page title
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100 overflow-scroll">

      <div className="card mb-3 flex-shrink-1 ">
        <div className="card-body">
          <Filtering
            filterCriteria={filterCriteria}
            onFilterChange={handleFilterChange}
            onTagClick={handleTagClick}
            onProjectClick={handleProjectClick}
          />
        </div>
      </div>
      <div className='card mb-3 overflow-y-scroll'>
        <div className='d-flex flex-column card-body '>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list-group list-group-flush"
                >
                  {getFilteredTasks().map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <Task
                          task={task}
                          provided={provided}
                          completeTask={completeTask}
                          removeTask={removeTask}
                          onTagClick={handleTagClick}
                          onProjectClick={handleProjectClick}
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
      </div>
      <div className="card mb-3 flex-shrink-1">
        <div className="card-body">
          <TaskAdder onAddTask={addTask} />
        </div>
      </div>
    </div>
  );
};

export default TodoListApp;
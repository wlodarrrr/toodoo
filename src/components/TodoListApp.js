import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import Filtering from "./Filtering";
import TaskAdder from "./TaskAdder";
import convertStringToTask from "../StringToTaskConverter";

const TodoListApp = () => {
  const [tasks, setTasks] = useState(() => {
    const retrieved = localStorage.getItem("tasks");
    return retrieved ? JSON.parse(retrieved, dateRetriever) : [];
  });
  const [filterCriteria, setFilterCriteria] = useState({
    showCompleted: false,
    selectedProject: "",
    selectedTags: [],
    searchText: "",
  });

  function dateRetriever(key, value) {
    if (typeof value === "string" && key.includes("Date")) {
      return new Date(value);
    }
    return value;
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedTasks = [...this.tasks];
    const [draggedTask] = updatedTasks.splice(source.ndex, 1);
    updatedTasks.splice(destination.index, 0, draggedTask);
    setTasks(updatedTasks);
  };

  const completeTask = (taskId, completionDate) => {
    tasks.filter((task) => task.id === taskId).completionDate = completionDate;
    setTasks([...tasks]);
  };

  const addTask = (message) => {
    const task = convertStringToTask(message);
    console.log(task);
    setTasks([...tasks, task]);
  };

  const editTask = (editedTask) => {
    const updatedTasks = tasks.filter((task) => task.id !== editedTask.id);
    updatedTasks.push(editedTask);
    setTasks(updatedTasks);
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
        selectedTags: prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag)
          : [...prevTags, tag],
      };
    });
  };

  const handleProjectClick = (project) => {
    setFilterCriteria((prevCriteria) => {
      let prevProject = prevCriteria.selectedProject;
      return {
        ...prevCriteria,
        selectedProject: project === prevProject ? "" : project,
      };
    });
  };

  const getFilteredTasks = () => {
    const { showCompleted, selectedProject, searchText, selectedTags } =
      filterCriteria;

    const filteredTasks = tasks.filter((task) => {
      const isCompletionMatch = showCompleted || task.completionDate === null;
      const isProjectMatch =
        selectedProject === "" || selectedProject === task.project;
      const isSummaryMatch = task.summary
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const isTagsMatch = selectedTags.every((tag) => task.tags.includes(tag));

      return (
        isCompletionMatch && isProjectMatch && isSummaryMatch && isTagsMatch
      );
    });

    return filteredTasks;
  };

  const allTags = Array.from(
    new Set(tasks.flatMap((task) => task.tags).sort())
  );

  const allProjects = Array.from(
    new Set(
      tasks
        .filter((task) => task.project !== "")
        .flatMap((task) => task.project)
        .sort()
    )
  );

  return (
    <div className="d-flex flex-row h-100 w-100 gap-2">
      {/* Left Column - Tags */}
      <div className="card mb-3 flex-shrink-0">
        <div className="card-body">
          <h5>Tags</h5>
          <ul className=" list-group gap-2">
            {allTags.map((tag, index) => (
              <li
                key={index}
                className={
                  "badge btn bg-primary" +
                  (filterCriteria.selectedTags.includes(tag)
                    ? " border border-light border-2"
                    : "")
                }
                onClick={() => handleTagClick(tag)}
              >
                {"@" + tag}
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
            {allProjects.map((project, index) => (
              <li
                key={index}
                className={
                  "badge btn bg-success " +
                  (filterCriteria.selectedProject === project
                    ? " border border-light border-2"
                    : "")
                }
                onClick={() => handleProjectClick(project)}
              >
                {"#" + project}
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
                    {getFilteredTasks().map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
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

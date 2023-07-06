import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import TaskModel from '../model/TaskModel';
import Filtering from './Filtering';

const TodoListApp = () => {
  // Sample task summaries and authors
  const sampleTaskSummaries = [
    'The Hobbit', 'The Chronicles of Narnia', 'Alice\'s Adventures in Wonderland', 'The Lion, the Witch and the Wardrobe',
    'The Wizard of Oz', 'A Wrinkle in Time', 'The Golden Compass', 'The Neverending Story', 'Harry Potter and the Chamber of Secrets',
    'The Name of the Wind', 'Eragon', 'The Silmarillion', 'The Princess Bride', 'American Gods', 'The Dark Tower',
    'Good Omens', 'Stardust', 'Jonathan Strange & Mr Norrell', 'Assassin\'s Apprentice', 'The Once and Future King',
    'The Black Company', 'The Wheel of Time', 'The Stormlight Archive', 'The Malazan Book of the Fallen',
    'The Sword of Shannara', 'The Earthsea Cycle', 'The Kingkiller Chronicle', 'The First Law Trilogy', 'The Mistborn Trilogy',
    'The Farseer Trilogy'
  ];  

  const sampleTaskAuthors = [
    'J.R.R. Tolkien', 'C.S. Lewis', 'Lewis Carroll', 'C.S. Lewis',
    'L. Frank Baum', 'Madeleine L\'Engle', 'Philip Pullman', 'Michael Ende', 'J.K. Rowling',
    'Patrick Rothfuss', 'Christopher Paolini', 'J.R.R. Tolkien', 'William Goldman', 'Neil Gaiman', 'Stephen King',
    'Terry Pratchett & Neil Gaiman', 'Neil Gaiman', 'Susanna Clarke', 'Robin Hobb', 'T.H. White',
    'Glen Cook', 'Robert Jordan', 'Brandon Sanderson', 'Steven Erikson',
    'Terry Brooks', 'Ursula K. Le Guin', 'Patrick Rothfuss', 'Joe Abercrombie', 'Brandon Sanderson',
    'Robin Hobb'
  ];

  // Generate sample tasks
  const generateSampleTasks = () => {
    const tasks = sampleTaskSummaries.map((summary, index) => {
      const author = sampleTaskAuthors[index];
      return {
        id: index + 1,
        summary: summary,
        tags: [author],
        project: `project${index % 5 + 1}`,
        creationDate: new Date(),
        completionDate: null
      };
    });
    return tasks;
  };

  const [taskModel, setTaskModel] = useState(new TaskModel(generateSampleTasks()));
  const [filterCriteria, setFilterCriteria] = useState({
    showCompleted: true,
    selectedProject: '',
    selectedTag: '',
    searchText: '',
  });

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

  useEffect(() => {
    localStorage.setItem('filterCriteria', JSON.stringify(filterCriteria));
  }, [filterCriteria]);

  const handleFilterChange = (updatedCriteria) => {
    localStorage.setItem('filterCriteria', JSON.stringify({...filterCriteria, ...updatedCriteria}));
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, ...updatedCriteria }));
  };
  

  const handleTagClick = (tag) => {
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      selectedTag: prevCriteria.selectedTag === tag ? '' : tag,
    }));
  };
  

  const getFilteredTasks = () => {
    const { showCompleted, selectedProject, searchText, selectedTag } = filterCriteria;

    const filteredTasks = taskModel.tasks.filter((task) => {
      const isCompletionMatch = showCompleted || task.completionDate === null;
      const isProjectMatch = selectedProject === '' || selectedProject === task.project;
      const isSummaryMatch = task.summary.toLowerCase().includes(searchText.toLowerCase());
      const isTagMatch = selectedTag === '' || task.tags.includes(selectedTag);

      return isCompletionMatch && isProjectMatch && isSummaryMatch && isTagMatch;
    });

    return filteredTasks;
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Todo List</h2>
        <Filtering
          filterCriteria={filterCriteria}
          taskModel={taskModel}
          onFilterChange={handleFilterChange}
        />
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
                        onTagClick={handleTagClick}
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
  );
};

export default TodoListApp;
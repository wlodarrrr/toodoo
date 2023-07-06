import React from 'react';
import Checkbox from './Checkbox';
import Summary from './Summary';
import DateBadge from './DateBadge';
import CompletionDateBadge from './CompletionDateBadge';
import TagsContainer from './TagsContainer';
import './Task.css';

const Task = ({ task, provided, completeTask, onTagClick }) => {
  const handleCheckboxChange = (isChecked) => {
    const completionDate = isChecked ? new Date() : null;
    completeTask(task.id, completionDate);
  };

  const handleTagClick = (tag) => {
    onTagClick(tag);
  };

  return (
    <li
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className="list-group-item d-flex flex-column align-items-start"
    >
      <div className="task-container">
        <div className="form-check d-flex" style={{ width: '100%' }}>
          <Checkbox
            checked={task.completionDate !== null}
            onChange={handleCheckboxChange}
          />
          <div className="summary">
            <Summary summary={task.summary} />
          </div>
          {task.completionDate && (
            <div className="completion-date-badge">
              <CompletionDateBadge completionDate={task.completionDate} />
            </div>
          )}
          <div className="date-badge">
            <DateBadge date={task.creationDate} />
          </div>
        </div>
      </div>
      <TagsContainer tags={task.tags} project={task.project} onTagClick={handleTagClick} />
    </li>
  );
};

export default Task;

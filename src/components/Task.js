import React from 'react';

function formatDate(date) {
  if (date instanceof Date && !isNaN(date)) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  return '';
};

const Task = ({ task, provided, completeTask, removeTask, onTagClick, onProjectClick }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <li className="list-group-item">

        <div className='d-flex flex-row flex-fill gap-2 justify-content-between align-items-center'>

          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={task.completionDate !== null}
            onChange={e => completeTask(task.id, e.target.checked ? new Date() : null)}>
          </input>

          <span className="badge bg-success date-badge">{formatDate(task.completionDate)}</span>

          <label className="form-check-label flex-grow-1">{task.summary}</label>

          {task.tags.map(tag => {
            return <span
              key={tag}
              tag={tag}
              role ="button"
              className="badge bg-info  "
              onClick={() => onTagClick(tag)}>
              {'@' + tag}
            </span>
          })}

          <span
            className="badge bg-secondary"
            role ="button"
            onClick={() => onProjectClick(task.project)}>
            {(task.project? '#' : '') + task.project}
          </span>

          <button className="btn text-danger btn-sm" onClick={() => removeTask(task.id)}>X</button>

        </div>
      </li >
    </div >
  );
};

export default Task;

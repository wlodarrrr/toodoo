import React from 'react';
import Checkbox from './Checkbox';
import DateBadge from './DateBadge';
import CompletionDateBadge from './CompletionDateBadge';
import TagBadge from './TagBadge.js'
import ProjectBadge from './ProjectBadge.js'

const Task = ({ task, provided, completeTask, removeTask, onTagClick }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <li className="list-group-item">

        <div className='d-flex flex-row flex-fill gap-2'>
          <div className='d-flex flex-column justify-content-around'>

            <Checkbox checked={task.completionDate !== null} onChange={isChecked => completeTask(task.id, isChecked ? new Date() : null)} />

          </div>

          <div className='d-flex flex-column flex-grow-1 gap-2'>
            <div className='d-flex flex-row gap-2'>

              <label className="form-check-label flex-grow-1">{task.summary}</label>

              <CompletionDateBadge completionDate={task.completionDate} />

              <DateBadge date={task.creationDate} />

            </div>

            <div className='d-flex flex-row gap-2'>
              <div className='d-flex flex-row flex-grow-1'>

                {task.tags.map(tag => {
                  return <TagBadge key={tag} tag={tag} onClick={() => onTagClick(tag)} />
                })}
              </div>

              <ProjectBadge project={task.project} />

            </div>
          </div>

          <div className='d-flex flex-column p-2 justify-content-around'>

            <button className="btn btn-outline-danger btn-sm" onClick={() => removeTask(task.id)}>
              X
            </button>

          </div>
        </div>
      </li>
    </div>
  );
};

export default Task;

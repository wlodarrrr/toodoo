import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./hovering.css";
import EditTaskModal from "./EditTaskModal";

const Task = ({
  task,
  provided,
  completeTask,
  removeTask,
  onTagClick,
  onProjectClick,
  onEdit
}) => {

  function formatDate(date) {
    if (date instanceof Date && !isNaN(date)) {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
    return "";
  }

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <li className="border-1 border border-light-subtle rounded px-2 ">
        <div className="d-flex flex-row flex-fill gap-2 justify-content-between align-items-center">
          <input
            className="form-check-inline bg-primary"
            type="checkbox"
            defaultChecked={task.completionDate !== null}
            onChange={(e) => completeTask(task.id, e.target.checked)}
          ></input>

          <span className="badge bg-success">
            {formatDate(task.completionDate)}
          </span>

          <label className="form-check-label flex-grow-1">{task.summary}</label>

          {task.tags.map((tag) => {
            return (
              <span
                key={tag}
                tag={tag}
                role="button"
                className="badge bg-primary rounded-pill btn"
                onClick={() => onTagClick(tag)}
              >
                {"@" + tag}
              </span>
            );
          })}

          <span
            className="badge bg-success rounded-pill btn"
            role="button"
            onClick={() => onProjectClick(task.project)}
          >
            {(task.project ? "#" : "") + task.project}
          </span>

          <EditTaskModal task={task} onSave={onEdit} />

          <i
            className="delete-icon bi bi-x-square"
            style={{ fontSize: 20 }}
            onClick={() => removeTask(task.id)}
          ></i>
        </div>
      </li>
    </div>
  );
};

export default Task;

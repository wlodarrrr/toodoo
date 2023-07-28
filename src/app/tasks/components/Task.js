import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./../../styles.css";
import EditTaskModal from "./EditTaskModal";

function formatDate(date) {
  if (date instanceof Date && !isNaN(date)) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  return "";
}

export default function Task({ task, completeTask, removeTask, onTagClick, onProjectClick, onEdit, visible }) {
  return (
    <li className={"border-1 border border-light-subtle rounded px-2 " + (visible ? "" : "d-none")}>
      <div className="d-flex flex-row flex-fill gap-2 justify-content-between align-items-center">
        <input
          className="form-check-inline bg-primary"
          type="checkbox"
          defaultChecked={task.completionDate !== null}
          onChange={(e) => completeTask(task.id, e.target.checked)}
        ></input>

        <span className="badge bg-success">{formatDate(task.completionDate)}</span>

        <label className="form-check-label">{task.summary}</label>

        {task.link && (
          <a className="bi bi-box-arrow-up-right link" href={task.link} target="_blank" rel="noreferrer"> </a>
        )}
        <div className="flex-grow-1"></div>

        {task.tags.map((tag) => {
          return (
            <span
              key={tag}
              tag={tag}
              role="button"
              className="badge btn bg-primary rounded-pill"
              onClick={() => onTagClick(tag)}
            >
              {"@" + tag}
            </span>
          );
        })}
        {task.project && (
          <span
            className="badge btn bg-success rounded-pill"
            role="button"
            onClick={() => onProjectClick(task.project)}
          >
            {task.project}
          </span>
        )}

        <EditTaskModal task={task} onSave={onEdit} />

        <i
          className="delete-icon bi bi-x-square"
          role="button"
          style={{ fontSize: 20 }}
          onClick={() => removeTask(task.id)}
        ></i>
      </div>
    </li>
  );
}

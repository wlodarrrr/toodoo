import React, { useState, useRef } from "react";
import './hovering.css'

const TaskAdder = ({ onAddTask }) => {
  const [taskSummary, setTaskSummary] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setTaskSummary(event.target.value);
  };

  const handleAddTask = () => {
    if (taskSummary.trim() !== "") {
      onAddTask(taskSummary);
      setTaskSummary("");
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="d-flex flex-row gap-2 align-items-center">
      <input
        type="text"
        className="form-control flex-grow-1 me-2"
        placeholder="Add task..."
        value={taskSummary}
        onChange={handleInputChange}
        onKeyUp={handleKeyPress}
        ref={inputRef}
      />

      <i
        className="bi bi-plus-circle-fill add-icon flex-shrink-1"
        style={{ fontSize: 40 }}
        onClick={handleAddTask}
      ></i>
    </div>
  );
};

export default TaskAdder;

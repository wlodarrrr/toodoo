import React, { useState, useRef } from "react";

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
    <div className="d-flex flex-row gap-2">
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
        className="bi bi-plus-circle-fill text-primary"
        style={{ fontSize: 30 }}
        onClick={handleAddTask}
      ></i>
    </div>
  );
};

export default TaskAdder;

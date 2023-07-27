import React, { useState, useRef } from 'react';
import './../../styles.css';

export default function TaskAddForm({ addTask }) {
  const [taskSummary, setTaskSummary] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setTaskSummary(event.target.value);
  };

  const handleAddTask = () => {
    if (taskSummary.trim() !== '') {
      addTask(taskSummary);
      setTaskSummary('');
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="d-flex gap-2 align-items-center ">
      <input
        type="text"
        className="col h-auto"
        placeholder="Add task..."
        value={taskSummary}
        onChange={handleInputChange}
        onKeyUp={handleKeyPress}
        ref={inputRef}
      />
      <i className="bi bi-plus-circle-fill add-icon col-auto" style={{ fontSize: 40 }} onClick={handleAddTask}></i>
    </div>
  );
}

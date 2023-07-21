import React, { useState } from 'react';

const TaskAdder = ({ onAddTask }) => {
    const [taskSummary, setTaskSummary] = useState('');

    const handleInputChange = (event) => {
        setTaskSummary(event.target.value);
    };

    const handleAddTask = () => {
        if (taskSummary.trim() !== '') {
            onAddTask(taskSummary);
            setTaskSummary('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
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
            />
            <button className="btn btn-primary" onClick={handleAddTask}>
                Add
            </button>
        </div>
    );
};

export default TaskAdder;

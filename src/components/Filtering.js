import React, { useState } from "react";

const Filtering = (props) => {
  const { onFilterChange, filterCriteria } = props;

  const [showCompleted, setShowCompleted] = useState(
    filterCriteria.showCompleted
  );
  const [searchText, setSearchText] = useState(filterCriteria.searchText);

  const handleShowCompletedChange = (e) => {
    const checked = e.target.checked;
    setShowCompleted(checked);
    onFilterChange({ showCompleted: checked });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onFilterChange({ searchText: value });
  };

  return (
    <div className="d-flex flex-column align-items- gap-2">
      <div className="flex-row">
        <input
          className=" form-check-inline "
          type="checkbox"
          checked={showCompleted}
          onChange={handleShowCompletedChange}
          id="showCompleted"
        />
        <label className="form-check-label" htmlFor="showCompleted">
          Show completed tasks
        </label>
      </div>
      <div className="d-flex flex-row flex-grow-1">
        <input
          placeholder="Type to search..."
          type="text"
          className="form-control"
          id="summaryFilter"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Filtering;

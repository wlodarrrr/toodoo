import { useState } from "react";

export default function SearchBar({ onFilterChange, filterCriteria }) {
  const [showCompleted, setShowCompleted] = useState(filterCriteria.showCompleted);
  const [searchText, setSearchText] = useState(filterCriteria.searchText);

  const handleShowCompletedChange = (e) => {
    const checked = e.target.checked;
    setShowCompleted(checked);
    onFilterChange({ showCompleted: checked, searchText });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onFilterChange({ showCompleted, searchText: value });
  };

  return (
    <>
      <div className="form-check flex-grow-1">
        <input
          className="form-check-input"
          type="checkbox"
          checked={showCompleted}
          onChange={handleShowCompletedChange}
          id="showCompleted"
        />
        <label className="form-check-label" htmlFor="showCompleted">
          Show completed tasks
        </label>
      </div>
      <div className="form-group flex-grow-1">
        <input
          placeholder="Type to search..."
          type="text"
          className="form-control"
          id="summaryFilter"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
    </>
  );
}

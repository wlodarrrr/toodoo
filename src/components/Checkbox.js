import React, { useRef } from 'react';

const Checkbox = ({ checked, onChange }) => {
  const checkboxRef = useRef(null);

  const handleCheckboxChange = (event) => {
    onChange(event.target.checked);
    checkboxRef.current.blur(); // Unfocus the checkbox
  };

  return (
    <input
      className="form-check-input"
      type="checkbox"
      checked={checked}
      onChange={handleCheckboxChange}
      ref={checkboxRef} // Reference to the checkbox element
    />
  );
};

export default Checkbox;

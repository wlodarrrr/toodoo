import React, { useState, useRef,useEffect } from "react";

const EditTaskModal = ({ task, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const innerRef = useRef();
  useEffect(() => innerRef.current && innerRef.current.focus());

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(value);
    const targetValue = name === "tags" ? value.split(" ") : value;

    setEditedTask({ ...editedTask, [name]: targetValue });
  };

  const handleSave = () => {
    onSave(editedTask);
    setIsOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      toggleModal();
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <span
        className=" edit-icon bi bi-pencil-square"
        style={{ fontSize: 20 }}
        onClick={toggleModal}
      ></span>

      {/* Modal */}
      {isOpen && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <i
                  className=" delete-icon bi bi-x-square"
                  style={{ fontSize: 20 }}
                  onClick={toggleModal}
                ></i>
              </div>
              <div className="modal-body">
                {/* Form to edit the task */}
                <form>
                  <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <input
                      type="text"
                      className="form-control"
                      id="summary"
                      name="summary"
                      value={editedTask.summary}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyPress}
                      ref={innerRef}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="project">Project</label>
                    <input
                      type="text"
                      className="form-control"
                      id="project"
                      name="project"
                      value={editedTask.project}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyPress}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tags"
                      name="tags"
                      value={editedTask.tags.join(" ")}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyPress}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTaskModal;

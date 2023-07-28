import React, { useState } from 'react';
import { convertStringToTags } from './../../../utils/TagsConverter';

const EditTaskModal = ({ task, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditedTask({ ...editedTask, [name]: name === 'tags' ? convertStringToTags(value) : value });
  };

  const handleSave = () => {
    onSave(editedTask);
    setIsOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      toggleModal();
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <span className=" edit-icon bi bi-pencil-square link" style={{ fontSize: 20 }} onClick={toggleModal}></span>

      {/* Modal */}
      {isOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', marginTop: '20vh' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {/* Form to edit the task */}
                <form>
                  <div className="form-floating m-2">
                    <input
                      type="text"
                      className="form-control"
                      id="summary"
                      name="summary"
                      value={editedTask.summary}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyPress}
                      autoFocus={true}
                    />
                    <label htmlFor="summary">Summary</label>
                  </div>
                  <div className="form-floating m-2">
                    <input
                      type="text"
                      className="form-control"
                      id="project"
                      name="project"
                      value={editedTask.project}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyPress}
                    />
                    <label htmlFor="project">Project</label>
                  </div>
                  <div className="form-floating m-2">
                    <input
                      type="text"
                      className="form-control"
                      id="tags"
                      name="tags"
                      value={editedTask.tags.length ? editedTask.tags.join(' ') : ''}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyPress}
                    />
                    <label htmlFor="tags">Tags</label>
                  </div>
                  <div className="form-floating m-2">
                    <input
                      type="text"
                      className="form-control"
                      id="link"
                      name="link"
                      value={editedTask.link}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyPress}
                    />
                    <label htmlFor="link">Link</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
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

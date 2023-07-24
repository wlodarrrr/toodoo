import React from 'react';

const TagsPanel = (props) => {
  const { tasks, filterCriteria } = props;
  return (
    <div className="card mb-3 flex-shrink-0">
      <div className="card-body">
        <h5>Tags</h5>
        <ul className=" list-group gap-2">
          {getAllTags(tasks).map((tag, index) => (
            <li
              key={index}
              className={
                'badge btn bg-primary' +
                (filterCriteria.selectedTags.includes(tag) ? ' border border-light border-2' : '')
              }
              onClick={() => handleTagClick(tag)}
            >
              {'@' + tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

import React from 'react';
import TagBadge from './TagBadge';
import ProjectBadge from './ProjectBadge';

const TagsContainer = ({ tags, project, onTagClick }) => {
  const handleTagClick = (tag) => {
    onTagClick(tag);
  };

  return (
    <div className="tags-container">
      <div className="d-flex align-items-center">
        {tags.map((tag) => (
          <TagBadge key={tag} tag={tag} onClick={() => handleTagClick(tag)} />
        ))}
      </div>
      <ProjectBadge project={project} />
    </div>
  );
};

export default TagsContainer;

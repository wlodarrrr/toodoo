import React from 'react';

const TagBadge = ({ tag, onClick }) => {
  return (
    <span className="badge bg-info tag-badge" onClick={onClick}>
      {tag}
    </span>
  );
};

export default TagBadge;

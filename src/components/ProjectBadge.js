import React from 'react';

const ProjectBadge = ({ project }) => {
  return <div className="badge bg-secondary project-badge">{'#' + project}</div>;
};

export default ProjectBadge;

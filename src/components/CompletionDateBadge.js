import React from 'react';

const CompletionDateBadge = ({ completionDate }) => {
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
    return '';
  };

  return (
    <span className="badge bg-success date-badge">
      {formatDate(completionDate)}
    </span>
  );
};

export default CompletionDateBadge;

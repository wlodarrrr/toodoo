import React from 'react';

const DateBadge = ({ date }) => {
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
    return '';
  };

  return <span className="badge bg-primary date-badge">{formatDate(date)}</span>;
};

export default DateBadge;

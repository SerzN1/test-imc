import React from 'react';
import './Filter.css';

interface FilterProps {
  filters: string[];
  selectedFilter: string;
  onFilterSelected(selected: any): void;
}

export const Filter: React.FC<FilterProps> = ({
  filters,
  selectedFilter,
  onFilterSelected,
}) => (
  <ul className="filter">
    {filters.map((filter) => (
      <li
        key={filter}
        className={[
          'filter-item',
          selectedFilter === filter ? 'filter-item--selected' : '',
        ].join(' ')}
        onClick={() => onFilterSelected(filter)}>
        {filter}
      </li>
    ))}
  </ul>
);

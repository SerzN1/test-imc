import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filter } from './Filter';

describe('Filter', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const FILTERS = ['week', 'month'];
  const cb = jest.fn();

  it('should render filter elements', () => {
    render(
      <Filter
        filters={FILTERS}
        selectedFilter={FILTERS[0]}
        onFilterSelected={cb}
      />
    );
    const weekOption = screen.getByText(/week/i);
    const monthOption = screen.getByText(/month/i);
    expect(weekOption).toBeInTheDocument();
    expect(monthOption).toBeInTheDocument();
  });

  it('should highlight selected value', () => {
    render(
      <Filter
        filters={FILTERS}
        selectedFilter={FILTERS[0]}
        onFilterSelected={cb}
      />
    );
    const weekOption = screen.getByText(/week/i);
    expect(weekOption.className).toContain('selected');
  });

  it('should pass selected value to the callback', () => {
    render(
      <Filter
        filters={FILTERS}
        selectedFilter={FILTERS[0]}
        onFilterSelected={cb}
      />
    );
    const monthOption = screen.getByText(/month/i);
    userEvent.click(monthOption);
    expect(cb).toBeCalledWith(FILTERS[1]);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {Table} from './Table';

describe('Table', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render table', () => {
    render(<Table data={[]} />);
  });
});

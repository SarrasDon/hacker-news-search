import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { List } from './List';

describe('List Component', () => {
  it('Should render the List', () => {
    act(() => {
      render(
        <List>
          <li>item 1</li>
          <li>item 2</li>
        </List>,
      );
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(/item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/item 2/i)).toBeInTheDocument();
  });
});

import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hint } from './Hint';

describe('Hint Component', () => {
  it('Should render the heading text', async () => {
    act(() => {
      render(<Hint>Some Hint</Hint>);
    });

    expect(screen.getByText(/some hint/i)).toBeInTheDocument();
  });
});

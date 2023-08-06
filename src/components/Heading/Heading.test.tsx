import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading Component', () => {
  it('Should render the heading text', async () => {
    act(() => {
      render(<Heading>Some Heading</Heading>);
    });

    expect(screen.getByText(/some heading/i)).toBeInTheDocument();
  });
});

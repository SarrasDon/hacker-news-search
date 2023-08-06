import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Status } from './Status';

describe('Status Component', () => {
  it('Should render the heading text', async () => {
    act(() => {
      render(<Status>Some Status</Status>);
    });

    expect(screen.getByText(/some status/i)).toBeInTheDocument();
  });
});

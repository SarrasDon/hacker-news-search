import { act, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from './test/utils';

import { Store } from '@reduxjs/toolkit';
import App from './App';
import { RootState, setupStore, storiesApi } from './store';

describe('App', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    //clear store before each test
    storiesApi.util.resetApiState();
    store = setupStore();
  });

  const getAutocomplete = () =>
    screen.getByTestId('autocomplete') as HTMLInputElement;

  it('Renders headings and autocomplete', () => {
    act(() => {
      renderWithProviders({ ui: <App />, store });
    });

    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(2);
    expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent(
      /hacker news search/i,
    );
    expect(screen.getAllByRole('heading', { level: 2 })[1]).toHaveTextContent(
      /read later/i,
    );

    expect(getAutocomplete()).toBeInTheDocument();
  });
});

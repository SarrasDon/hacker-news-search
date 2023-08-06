import { act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../test/utils';

import { Store } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { Autocomplete } from '..';
import { getResultId } from '../../helpers';
import { server } from '../../setupTests';
import { RootState, isStoryValid, setupStore, storiesApi } from '../../store';
import { mockApiResponse } from '../../test/mocks/apiResponse';

describe('Autocomplete', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    vi.useFakeTimers();

    //clear store before each test
    storiesApi.util.resetApiState();
    store = setupStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const getAutocomplete = () =>
    screen.getByTestId('autocomplete') as HTMLInputElement;

  it('Renders Loading Message', async () => {
    act(() => {
      renderWithProviders({ ui: <Autocomplete />, store });
    });

    const autoCompleteInput = getAutocomplete();
    expect(autoCompleteInput.value).toBe('');

    fireEvent.change(autoCompleteInput, { target: { value: 'Javascript' } });
    expect(autoCompleteInput.value).toBe('Javascript');

    // advance the debounce timer
    await act(async () => {
      await vi.advanceTimersToNextTimerAsync();
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('Renders error message', async () => {
    // force msw to return error response
    server.use(
      rest.get('https://hn.algolia.com/api/v1/search', (_req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    act(() => {
      renderWithProviders({ ui: <Autocomplete />, store });
    });

    const autoCompleteInput = getAutocomplete();
    expect(autoCompleteInput.value).toBe('');

    fireEvent.change(autoCompleteInput, { target: { value: 'Javascript' } });
    expect(autoCompleteInput.value).toBe('Javascript');

    await act(async () => {
      await vi.advanceTimersToNextTimerAsync();
    });

    expect(screen.queryByText('Loading stories...')).toBeNull();

    expect(
      screen.getByText('Error while fetching stories'),
    ).toBeInTheDocument();
  });

  it('Renders results list', async () => {
    act(() => {
      renderWithProviders({ ui: <Autocomplete />, store });
    });

    expect(getAutocomplete()).toBeTruthy();

    const autoCompleteInput = getAutocomplete();
    expect(autoCompleteInput.value).toBe('');

    fireEvent.change(autoCompleteInput, { target: { value: 'Javascript' } });

    expect(autoCompleteInput.value).toBe('Javascript');

    await act(async () => {
      await vi.advanceTimersToNextTimerAsync();
    });

    // rtk use some kind of timer in the background
    // without this block, the request is stuck at pending and items are not rendered
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    const validStories = mockApiResponse.hits.filter((s) => isStoryValid(s));
    // due to Highlighter (text include mark) I couldn't use getByText fn so I went with testIds
    const ids = validStories.map(({ objectID }) => getResultId(objectID));
    for (const id of ids) {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    }

    // just checking for false positives
    expect(() => screen.getByTestId('random')).toThrow();

    const totalResults = validStories.length;
    expect(screen.getByText(`${totalResults} results`)).toBeInTheDocument();
  });

  it('Renders hints correctly', async () => {
    act(() => {
      renderWithProviders({ ui: <Autocomplete />, store });
    });

    expect(getAutocomplete()).toBeTruthy();

    const autoCompleteInput = getAutocomplete();
    expect(autoCompleteInput.value).toBe('');

    expect(
      screen.getByText(/Please enter at least 3 characters/i),
    ).toBeInTheDocument();

    fireEvent.change(autoCompleteInput, { target: { value: 'Ja' } });

    expect(
      screen.getByText(/Please enter at least 3 characters/i),
    ).toBeInTheDocument();

    fireEvent.change(autoCompleteInput, { target: { value: 'Jav' } });
    await act(async () => {
      await vi.advanceTimersToNextTimerAsync();
    });

    expect(() => screen.getByText(/at least 3 characters/i)).toThrow();

    expect(
      screen.getByText(/click a story to save it for later/i),
    ).toBeInTheDocument();
  });
});

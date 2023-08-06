import { act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../utils';

import { Store } from '@reduxjs/toolkit';
import App from '../../App';
import { getDeleteId, getResultId, getSavedId } from '../../helpers';
import { RootState, isStoryValid, setupStore, storiesApi } from '../../store';
import { mockApiResponse } from '../mocks/apiResponse';

describe('App', () => {
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

  it('Saves and deletes results', async () => {
    act(() => {
      renderWithProviders({ ui: <App />, store });
    });

    expect(screen.getByText(/you have no saved stories/i)).toBeTruthy();

    const autoCompleteInput = getAutocomplete();
    fireEvent.change(autoCompleteInput, { target: { value: 'Javascript' } });

    await act(async () => {
      await vi.advanceTimersToNextTimerAsync();
    });

    // redux toolkit must use some kind of timer in the background
    // without this block, the request is stuck at pending and items are not rendered
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    const validStories = mockApiResponse.hits.filter((s) => isStoryValid(s));

    // pick 5 random items
    const randomStoryIds = validStories
      .map((s) => s.objectID)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    // clicked all random stories
    for (const id of randomStoryIds) {
      const element = screen.getByTestId(getResultId(id));
      fireEvent.click(element);
    }

    // assert they appear as saved
    for (const id of randomStoryIds) {
      expect(screen.getByTestId(getSavedId(id))).toBeInTheDocument();
    }

    // pick 2 random stories to delete
    const idsToDelete = randomStoryIds
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    for (const id of idsToDelete) {
      const element = screen.getByTestId(getDeleteId(id));
      fireEvent.click(element);
    }

    // assert they were deleted
    for (const id of idsToDelete) {
      expect(() => screen.getByTestId(getSavedId(id))).toThrow();
    }

    // assert the other saved stories are still present
    for (const id of randomStoryIds.filter(
      (sId) => idsToDelete.indexOf(sId) === -1,
    )) {
      expect(screen.getByTestId(getSavedId(id))).toBeInTheDocument();
    }
  });
});

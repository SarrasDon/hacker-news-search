import { Store } from '@reduxjs/toolkit';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  RootState,
  savedStoriesSlice,
  setupStore,
  storiesApi,
} from '../../store';
import { mockStory } from '../../test/mocks/mockStory';
import { renderWithProviders } from '../../test/utils';
import { SavedStories } from './SavedStories';

describe('SavedStories Component', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    //clear store before each test
    store = setupStore();
    cleanup();
  });

  afterEach(() => {
    // reset api after each test
    storiesApi.util.resetApiState();
  });

  it('Should render the heading', () => {
    act(() => {
      renderWithProviders({
        ui: <SavedStories />,
        store,
      });
    });

    expect(screen.getByText(/read later/i)).toBeInTheDocument();
  });

  it('Should render the saved story', () => {
    store = setupStore({
      [savedStoriesSlice.name]: {
        entities: { [mockStory.objectID]: mockStory },
        ids: [mockStory.objectID],
      },
    });

    act(() => {
      renderWithProviders({
        ui: <SavedStories />,
        store,
      });
    });

    expect(
      screen.getByText(mockStory.title, { selector: 'a' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/delete/i, { selector: 'button' }),
    ).toBeInTheDocument();
  });

  it('Should delete the story', () => {
    store = setupStore({
      [savedStoriesSlice.name]: {
        entities: { [mockStory.objectID]: mockStory },
        ids: [mockStory.objectID],
      },
    });

    act(() => {
      renderWithProviders({
        ui: <SavedStories />,
        store,
      });
    });
    expect(
      screen.getByText(mockStory.title, { selector: 'a' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/delete/i, { selector: 'button' }));

    expect(() =>
      screen.getByText(mockStory.title, { selector: 'a' }),
    ).toThrow();

    expect(screen.getByText(/you have no saved stories/i)).toBeInTheDocument();
  });
});

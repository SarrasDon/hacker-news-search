import { Store, configureStore } from '@reduxjs/toolkit';
import { describe, it } from 'vitest';
import {
  SavedStories,
  removeStory,
  saveStory,
  savedStoriesSlice,
  selectSavedStories,
  selectSavedStoryById,
} from './savedStories.slice';

import { mockStory } from '../test/mocks/mockStory';

describe('Saved-stories slice', () => {
  let store: Store<{ savedStories: SavedStories }>;

  beforeEach(() => {
    //clear store before each test
    store = configureStore({
      reducer: { [savedStoriesSlice.name]: savedStoriesSlice.reducer },
    });
  });

  it('Should have no saved stories', () => {
    const savedStories = selectSavedStories(store.getState());
    expect(savedStories).toHaveLength(0);
  });

  it('Should add a story correctly', () => {
    expect(
      selectSavedStoryById(store.getState(), mockStory.objectID),
    ).toBeUndefined();
    store.dispatch(saveStory({ story: mockStory }));

    const newStories = selectSavedStories(store.getState());
    expect(newStories).toHaveLength(1);
    expect(
      selectSavedStoryById(store.getState(), mockStory.objectID),
    ).toStrictEqual(mockStory);
  });

  it('Should remove a story correctly', () => {
    store = configureStore({
      reducer: { [savedStoriesSlice.name]: savedStoriesSlice.reducer },
      preloadedState: {
        [savedStoriesSlice.name]: {
          entities: { [mockStory.objectID]: mockStory },
          ids: [mockStory.objectID],
        },
      },
    });

    expect(
      selectSavedStoryById(store.getState(), mockStory.objectID),
    ).not.toBeUndefined();

    store.dispatch(removeStory({ id: mockStory.objectID }));

    expect(selectSavedStories(store.getState())).toHaveLength(0);
    expect(
      selectSavedStoryById(store.getState(), mockStory.objectID),
    ).toBeUndefined();
  });
});

import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Story } from '../types/Story';

export type SavedStories = EntityState<Story>;

const savedStoriesAdapter = createEntityAdapter<Story>({
  selectId: (story) => story.objectID,
});

export const savedStoriesSlice = createSlice({
  name: 'savedStories',
  initialState: savedStoriesAdapter.getInitialState() as SavedStories,
  reducers: {
    saveStory: (state, { payload }: PayloadAction<{ story: Story }>) =>
      savedStoriesAdapter.upsertOne(state, payload.story),
    removeStory: (
      state,
      { payload }: PayloadAction<{ id: Story['objectID'] }>,
    ) => savedStoriesAdapter.removeOne(state, payload.id),
  },
});

export const { saveStory, removeStory } = savedStoriesSlice.actions;

export const {
  selectAll: selectSavedStories,
  selectById: selectSavedStoryById,
  selectIds: selectSavedStoryIds,
} = savedStoriesAdapter.getSelectors(
  (state: { [savedStoriesSlice.name]: SavedStories }) =>
    state[savedStoriesSlice.name],
);

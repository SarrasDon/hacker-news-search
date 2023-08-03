import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Story } from '../types/Story';

type SaveStories = EntityState<Story>;

const saveStoriesAdapter = createEntityAdapter<Story>({
  selectId: (story) => story.objectID,
});

export const savedStoriesSlice = createSlice({
  name: 'savedStories',
  initialState: saveStoriesAdapter.getInitialState() as SaveStories,
  reducers: {
    saveStory: (state, { payload }: PayloadAction<{ story: Story }>) =>
      saveStoriesAdapter.upsertOne(state, payload.story),
    removeStory: (
      state,
      { payload }: PayloadAction<{ id: Story['objectID'] }>,
    ) => saveStoriesAdapter.removeOne(state, payload.id),
  },
});

export const { saveStory, removeStory } = savedStoriesSlice.actions;

export const {
  selectAll: selectSavedStories,
  selectById: selectSavedStoryById,
} = saveStoriesAdapter.getSelectors();

import { Store } from '@reduxjs/toolkit';
import { describe, it } from 'vitest';
import {
  RootState,
  removeStory,
  saveStory,
  savedStoriesSlice,
  selectSavedStories,
  selectSavedStoryById,
  setupStore,
  storiesApi,
} from '../store';

describe('Saved-stories slice', () => {
  let store: Store<RootState>;

  const getSavedStoriesState = () => store.getState().savedStories;

  beforeEach(() => {
    //clear store before each test
    storiesApi.util.resetApiState();
    store = setupStore();
  });

  it('Should have no saved stories', () => {
    const savedStories = selectSavedStories(getSavedStoriesState());
    expect(savedStories).toHaveLength(0);
  });

  it('Should add a story correctly', () => {
    // arrange
    const story = {
      created_at: '',
      title: '',
      url: '',
      author: '',
      points: 0,
      story_text: '',
      comment_text: '',
      num_comments: 0,
      story_id: '',
      story_title: '',
      story_url: '',
      parent_id: '',
      created_at_i: 0,
      relevancy_score: 0,
      _tags: [],
      objectID: 'dsad-hdfhmlh',
    };

    // act
    store.dispatch(saveStory({ story }));

    // expect
    const newStories = selectSavedStories(getSavedStoriesState());
    expect(newStories).toHaveLength(1);
    expect(
      selectSavedStoryById(getSavedStoriesState(), story.objectID),
    ).toStrictEqual(story);
  });

  it('Should remove a story correctly', () => {
    // arrange

    const story = {
      created_at: '',
      title: '',
      url: '',
      author: '',
      points: 0,
      story_text: '',
      comment_text: '',
      num_comments: 0,
      story_id: '',
      story_title: '',
      story_url: '',
      parent_id: '',
      created_at_i: 0,
      relevancy_score: 0,
      _tags: [],
      objectID: 'dsad-hdfhmlh',
    };
    store = setupStore({
      [savedStoriesSlice.name]: {
        entities: { [story.objectID]: story },
        ids: [story.objectID],
      },
    });

    // act
    store.dispatch(removeStory({ id: story.objectID }));

    // expect
    expect(selectSavedStories(getSavedStoriesState())).toHaveLength(0);
    expect(
      selectSavedStoryById(getSavedStoriesState(), story.objectID),
    ).toBeUndefined();
  });
});

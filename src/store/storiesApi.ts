import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Story } from '../types';

type StoriesSearchResult = {
  hits: Story[];
};

const BASE_URL = `https://hn.algolia.com/api`;

export const isStoryValid = (story: Story) =>
  Boolean(story.title || story.story_title) &&
  Boolean(story.url || story.story_url);

export const storiesApi = createApi({
  reducerPath: 'storiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchStories: builder.query<StoriesSearchResult['hits'], string>({
      query: (term) => `/v1/search?query=${encodeURIComponent(term)}`,
      transformResponse: (res: StoriesSearchResult) => {
        return (res?.hits ?? []).filter(isStoryValid);
      },
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { useSearchStoriesQuery } = storiesApi;

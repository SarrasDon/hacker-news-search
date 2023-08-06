import { ChangeEvent, useState } from 'react';

import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useDebounce } from 'usehooks-ts';
import { useSearchStoriesQuery } from '../../store';
import { Heading } from '../Heading';
import { Hint } from '../Hint';
import { Results } from '../Results';
import './style.css';

export const DEBOUNCE_TIME_MS = 500;

export const Autocomplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_TIME_MS);

  const updateSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.currentTarget.value;
    setSearchTerm(searchText);
  };

  const { data, error, isLoading, isFetching, isSuccess } =
    useSearchStoriesQuery(
      debouncedSearchTerm && debouncedSearchTerm.length >= 3
        ? debouncedSearchTerm
        : skipToken,
    );

  const total =
    data && data.length > 0 ? (
      <Hint>
        <b>
          {data.length} result{data.length > 1 && 's'}
        </b>
      </Hint>
    ) : (
      <></>
    );

  const hintText =
    searchTerm && searchTerm.length > 2
      ? 'Click a story to save it for later'
      : '*Please enter at least 3 characters';

  return (
    <section className="search-section">
      <Heading>Hacker News Search</Heading>
      <div className="autocomplete-wrapper">
        <div className="info-area">
          <Hint>{hintText}</Hint>
          {total}
        </div>
        <input
          data-testid="autocomplete"
          type="text"
          onChange={updateSearchText}
          value={searchTerm}
          className="autocomplete-input"
        />
        {searchTerm && searchTerm.length >= 3 && (
          <Results
            debouncedSearchTerm={debouncedSearchTerm}
            stories={data}
            hasError={Boolean(error)}
            isLoading={isLoading}
            isFetching={isFetching}
            isSuccess={isSuccess}
          />
        )}
      </div>
    </section>
  );
};

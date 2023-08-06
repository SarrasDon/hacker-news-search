import { Story } from '../../types/Story';
import { List } from '../List';
import { Status } from '../Status';
import { Result } from './Result';

interface ResultsProps {
  debouncedSearchTerm: string;
  stories?: Story[];
  hasError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
}

export const Results = ({
  debouncedSearchTerm,
  stories = [],
  isFetching,
  isLoading,
  isSuccess,
  hasError,
}: ResultsProps) => {
  if (isLoading || isFetching) {
    return (
      <div className="autocomplete-results">
        <Status>Loading stories...</Status>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="autocomplete-results">
        <Status>Error while fetching stories</Status>
      </div>
    );
  }

  if (isSuccess && stories.length === 0) {
    return (
      <div className="autocomplete-results">
        <Status>No stories found</Status>
      </div>
    );
  }

  const style = {
    '--results-height': Math.min(stories.length, 8) * 75,
  } as React.CSSProperties;

  return (
    <div className="autocomplete-results" style={style}>
      {stories && stories.length > 0 && (
        <List>
          {stories.map((story) => (
            <Result
              searchWords={[debouncedSearchTerm]}
              key={story.objectID}
              story={story}
            />
          ))}
        </List>
      )}
    </div>
  );
};

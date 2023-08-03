import Highlighter from 'react-highlight-words';
import '../List/style.css';
import './style.css';
import { Story } from '../../types/Story';
import { Subtext } from '../List/Subtext';
import { getResultId } from '../../helpers';

interface ResultProps {
  story: Story;
  onClick: () => void;
  searchWords: string[];
}

export const Result = ({ story, onClick, searchWords }: ResultProps) => {
  const { title, story_title, objectID } = story;

  return (
    <li
      className="result-item list-item hoverable"
      key={objectID}
      onClick={onClick}
      data-testid={getResultId(objectID)}
    >
      <Highlighter
        highlightClassName="hightlight"
        searchWords={searchWords}
        autoEscape={true}
        textToHighlight={title || story_title || ''}
      />
      <Subtext story={story} />
    </li>
  );
};

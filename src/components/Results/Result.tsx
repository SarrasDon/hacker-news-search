import Highlighter from 'react-highlight-words';
import { getResultId } from '../../helpers';
import { saveStory, useAppDispatch } from '../../store';
import { Story } from '../../types/Story';
import '../List/style.css';
import { Subtext } from './Subtext';
import './style.css';

interface ResultProps {
  story: Story;
  searchWords: string[];
}

export const Result = ({ story, searchWords }: ResultProps) => {
  const dispatch = useAppDispatch();

  const { title, story_title, objectID } = story;

  const onClick = () => {
    dispatch(saveStory({ story }));
  };

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

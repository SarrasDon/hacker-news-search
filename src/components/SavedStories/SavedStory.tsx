import { getDeleteId, getSavedId } from '../../helpers';
import { Story } from '../../types/Story';
import { Subtext } from '../List/Subtext';
import '../List/style.css';

interface ListItemProps {
  story: Story;
  onClick: () => void;
}

export const SavedStory = ({ story, onClick }: ListItemProps) => {
  const { title, story_title, url, story_url, objectID } = story;

  const validUrl = url || story_url;

  if (!validUrl) {
    return <></>;
  }

  return (
    <div className="list-item" data-testid={getSavedId(objectID)}>
      <div className="content">
        <a className="title" href={validUrl} target="_">
          {story_title || title}
        </a>
        <Subtext story={story} />
      </div>
      <button
        className="delete"
        onClick={onClick}
        data-testid={getDeleteId(objectID)}
      >
        Delete
      </button>
    </div>
  );
};

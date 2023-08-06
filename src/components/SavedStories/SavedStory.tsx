import { getDeleteId, getSavedId } from '../../helpers';
import {
  removeStory,
  selectSavedStoryById,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { Story } from '../../types/Story';
import '../List/style.css';
import { Subtext } from '../Results/Subtext';

interface SavedStoryProps {
  id: Story['objectID'];
}

export const SavedStory = ({ id }: SavedStoryProps) => {
  const dispatch = useAppDispatch();

  const story = useAppSelector((state) => selectSavedStoryById(state, id));

  const onClick = () => {
    story && dispatch(removeStory({ id: story.objectID }));
  };

  if (!story) {
    return <></>;
  }

  const { title, story_title, url, story_url, objectID } = story;

  const validUrl = url || story_url;

  if (!validUrl) {
    return <></>;
  }

  return (
    <li className="list-item" data-testid={getSavedId(objectID)}>
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
    </li>
  );
};

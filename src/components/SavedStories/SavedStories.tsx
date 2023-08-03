import {
  removeStory,
  selectSavedStories,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { Heading } from '../Heading';
import { List } from '../List';
import { SavedStory } from './SavedStory';
import './style.css';

export const SavedStories = () => {
  const dispatch = useAppDispatch();
  const stories = useAppSelector((state) =>
    selectSavedStories(state.savedStories),
  );

  const onClick = (id: string) => () => {
    dispatch(removeStory({ id }));
  };

  return (
    <section className="saved-stories-wrapper">
      <Heading>Read later</Heading>
      {stories.length === 0 && <p>You have no saved stories.</p>}
      <List>
        {stories.map((story) => (
          <SavedStory
            onClick={onClick(story.objectID)}
            key={story.objectID}
            story={story}
          />
        ))}
      </List>
    </section>
  );
};

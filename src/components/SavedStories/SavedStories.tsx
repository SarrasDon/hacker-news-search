import { selectSavedStoryIds, useAppSelector } from '../../store';
import { Story } from '../../types';
import { Heading } from '../Heading';
import { List } from '../List';
import { SavedStory } from './SavedStory';
import './style.css';

export const SavedStories = () => {
  const storyIds = useAppSelector(selectSavedStoryIds) as Array<
    Story['objectID']
  >;

  return (
    <section className="saved-stories-wrapper">
      <Heading>Read later</Heading>
      {storyIds.length === 0 && <p>You have no saved stories.</p>}
      <List>
        {storyIds.map((id) => (
          <SavedStory key={id} id={id} />
        ))}
      </List>
    </section>
  );
};

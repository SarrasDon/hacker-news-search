import { Story } from '../../types/Story';
import './style.css';

export const Subtext = ({ story }: { story: Story }) => {
  const { points, author, num_comments } = story;

  return (
    <div className="subtext">
      {points > 0 && <span>{points} points</span>}
      {author && <span>by {author}</span>}
      {num_comments > 0 && <span>{num_comments} comments</span>}
    </div>
  );
};

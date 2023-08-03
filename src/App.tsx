import { Autocomplete, SavedStories } from './components';
import './style.css';

export const App = () => {
  return (
    <div className="wrapper">
      <Autocomplete />
      <SavedStories />
    </div>
  );
};

export default App;

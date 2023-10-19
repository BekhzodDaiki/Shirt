import ShirtColorPicker from './ShirtColorPicker';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ShirtColorPicker />
      <div>
        add photo or words
      </div>
    </div>
  );
};

export default Sidebar;
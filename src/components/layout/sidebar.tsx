import './sidebar.css';

const Sidebar = ({ classStatus, position }: { classStatus: string, position: string }) => {
  return (
    <aside className={`sidebar ${classStatus}`} style={{left: position}}>
      <p>Home</p>
      <p>Pinned Folders</p>
      <p>Archive</p>
    </aside>
  );
};
export default Sidebar;

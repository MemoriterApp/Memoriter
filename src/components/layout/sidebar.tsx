import './sidebar.css';

const Sidebar = ({ position }: { position: string }) => {
  return (
    <aside className='sidebar' style={{left: position}}>
      <p>Home</p>
      <p>Pinned Folders</p>
      <p>Archive</p>
    </aside>
  );
};
export default Sidebar;

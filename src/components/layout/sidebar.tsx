import './sidebar.css';

const Sidebar = ({
  classStatus,
  position,
  onSidebarHoverEnter,
  onSidebarHoverLeave,
}: {
  classStatus: string;
  position: string;
  onSidebarHoverEnter: () => void;
  onSidebarHoverLeave: () => void;
}) => {
  return (
    <aside
      className={`sidebar ${classStatus}`}
      style={{ left: position }}
      onMouseEnter={() => onSidebarHoverEnter()}
      onMouseLeave={() => onSidebarHoverLeave()}
    >
      <p>Home</p>
      <p>Pinned Folders</p>
      <p>Archive</p>
    </aside>
  );
};
export default Sidebar;

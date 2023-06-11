import * as Type from '../../types';
import SidebarFolder from './sidebar-folder';
import './archive.css';

const Archive = ({
  folders
}: {
  folders: any;
}) => {
  return (
    <div className='archive'>
      <h1>Archive</h1>
      {folders // render archived folders
        .filter((folder: Type.Folder) => folder.archived)
        .map((folder: Type.Folder) => (
          <SidebarFolder
            key={folder._id}
            folder={folder}
          />
        ))}
    </div>
  );
};
export default Archive;

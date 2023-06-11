import './archive.css';
import * as Type from '../../../types';
import ArchiveFolder from './archive-folder';

const Archive = ({ folders }: { folders: any }) => {
  return (
    <div className='archive'>
      <h1>Archive</h1>
      {folders // render archived folders
        .filter((folder: Type.Folder) => folder.archived)
        .map((folder: Type.Folder) => (
          <ArchiveFolder key={folder._id} folder={folder} />
        ))}
    </div>
  );
};
export default Archive;

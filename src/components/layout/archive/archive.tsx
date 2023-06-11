import './archive.css';
import * as Type from '../../../types';
import ArchiveFolder from './archive-folder';

const Archive = ({
  folders,
  onChangeFolderIcon,
  onUnarchiveFolder,
  onDeleteFolder,
}: {
  folders: [];
  onChangeFolderIcon: (arg0: string, arg1: string) => void;
  onUnarchiveFolder: (arg0: string) => void;
  onDeleteFolder: (arg0: Type.Folder) => Promise<void>;
}) => {
  return (
    <div className='archive'>
      <h1>Archive</h1>
      {folders // render archived folders
        .filter((folder: Type.Folder) => folder.archived)
        .map((folder: Type.Folder) => (
          <ArchiveFolder
            key={folder._id}
            folder={folder}
            onChangeFolderIcon={(id, emoji) => onChangeFolderIcon(id, emoji)}
            onUnarchiveFolder={(id) => onUnarchiveFolder(id)}
            onDeleteFolder={(folder) => onDeleteFolder(folder)}
          />
        ))}
    </div>
  );
};
export default Archive;

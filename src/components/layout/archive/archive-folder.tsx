import './archive-folder.css'
import { Link } from 'react-router-dom';
import * as Type from '../../../types';
import placeholderFolder from '../../../images/placeholder-folder.svg';

const ArchiveFolder = ({ folder }: { folder: Type.Folder }) => {
  return (
    <Link
      className='archive-folder'
      to='/topic'
      onClick={() => {
        localStorage.setItem('folderID', folder._id);
        localStorage.setItem('folderTitle', folder.title);
      }}
    >
      <p>
        {folder.icon === '' || folder.icon === undefined ? (
          <img
            className='archive-folder-icon'
            src={placeholderFolder}
            alt='placeholder icon'
            style={{ filter: 'var(--svg-invert-gray)' }}
          />
        ) : (
          <img
            className='archive-folder-icon'
            src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${folder.icon}.svg`}
            alt='folder icon'
          />
        )}
        {
          folder.title !== '' ? folder.title : 'New Folder' // checks if the title of the folder is not empty
        }
      </p>
    </Link>
  );
};
export default ArchiveFolder;

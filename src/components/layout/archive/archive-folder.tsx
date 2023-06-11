import './archive-folder.css';
import { Link } from 'react-router-dom';
import * as Type from '../../../types';
import placeholderFolder from '../../../images/placeholder-folder.svg';
import unarchiveIcon from '../../../images/icons/unarchive-icon.svg';
import deleteIcon from '../../../images/icons/delete-icon.svg';

const ArchiveFolder = ({ folder }: { folder: Type.Folder }) => {
  return (
    <div className='archive-folder'>
      <div className='archive-folder-icon'>
        {folder.icon === '' || folder.icon === undefined ? (
          <img
            src={placeholderFolder}
            alt='placeholder icon'
            style={{ filter: 'var(--svg-invert-gray)' }}
          />
        ) : (
          <img
            src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${folder.icon}.svg`}
            alt='folder icon'
          />
        )}
      </div>

      <Link
        className='archive-folder-link'
        to='/topic'
        onClick={() => {
          localStorage.setItem('folderID', folder._id);
          localStorage.setItem('folderTitle', folder.title);
        }}
      >
        <p>
          {
            folder.title !== '' ? folder.title : 'New Folder' // checks if the title of the folder is not empty
          }
        </p>
      </Link>

      <div className='archive-folder-icon archive-folder-button' style={{ right: '46px' }}>
        <img src={unarchiveIcon} alt='Unarchive folder' />
      </div>
      <div className='archive-folder-icon archive-folder-button' style={{ right: '12px' }}>
        <img src={deleteIcon} alt='Delete folder' />
      </div>
    </div>
  );
};
export default ArchiveFolder;

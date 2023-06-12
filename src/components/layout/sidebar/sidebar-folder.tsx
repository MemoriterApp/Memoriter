import './sidebar-folder.css';
import { Link } from 'react-router-dom';
import * as Type from '../../../types';
import placeholderFolder from '../../../images/placeholder-folder.svg';

const SidebarFolder = ({ folder }: { folder: Type.Folder }) => {
  return (
    <section className='sidebar-folder'>
      <Link
        to='/topic'
        onClick={() => {
          localStorage.setItem('folderID', folder._id);
          localStorage.setItem('folderTitle', folder.title);
          localStorage.setItem('folderFavorite', JSON.stringify(folder.favorite));
        }}
      >
        <p>
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
          {
            folder.title !== '' ? folder.title : 'New Folder' // checks if the title of the folder is not empty
          }
        </p>
      </Link>
    </section>
  );
};
export default SidebarFolder;

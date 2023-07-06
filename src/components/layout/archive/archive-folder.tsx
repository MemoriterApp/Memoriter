import './archive-folder.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Type from '../../../types';
import Picker from '@emoji-mart/react';
import placeholderFolder from '../../../images/placeholder-folder.svg';
import unarchiveIcon from '../../../images/icons/unarchive-icon.svg';
import deleteIcon from '../../../images/icons/delete-icon.svg';
import Confirm from '../../confirm/confirm';
import Backdrop from '../../backdrops/backdrop/backdrop';

const ArchiveFolder = ({
  folder,
  onChangeFolderIcon,
  onUnarchiveFolder,
  onDeleteFolder,
  onUpdateCurrentFolder,
  onCloseArchive,
}: {
  folder: Type.Folder;
  onChangeFolderIcon: (arg0: string, arg1: string) => void;
  onUnarchiveFolder: (arg0: string) => void;
  onDeleteFolder: (arg0: Type.Folder) => Promise<void>;
  onUpdateCurrentFolder: (arg0: { id: string; title: string; favorite: boolean }) => void;
  onCloseArchive: () => void;
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const addEmoji = (emoji: any) => {
    onChangeFolderIcon(folder._id, emoji.unified);
    setShowEmojiPicker(false);
  };

  return (
    <div className='archive-folder'>
      <div className='archive-folder-icon'>
        {folder.icon === '' || folder.icon === undefined ? (
          <img
            src={placeholderFolder}
            alt='placeholder icon'
            style={{ filter: 'var(--svg-invert-gray)' }}
            onClick={() => setShowEmojiPicker(true)}
          />
        ) : (
          <img
            src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${folder.icon}.svg`}
            alt='folder icon'
            onClick={() => setShowEmojiPicker(true)}
          />
        )}
      </div>

      <Link
        className='archive-folder-link'
        to={'/topic/' + folder._id}
        onClick={() => {
          window.location.pathname.split('/')[1] === 'topic' &&
            onUpdateCurrentFolder({
              id: folder._id,
              title: folder.title,
              favorite: folder.favorite,
            });
          onCloseArchive();
          localStorage.setItem('folderTitle', folder.title);
          localStorage.setItem('folderFavorite', JSON.stringify(folder.favorite));
        }}
      >
        <p>
          {
            folder.title !== '' ? folder.title : 'New Folder' // checks if the title of the folder is not empty
          }
        </p>
      </Link>

      <div className='archive-folder-icon archive-folder-button' style={{ right: '46px' }}>
        <img
          src={unarchiveIcon}
          alt='Unarchive folder'
          onClick={() => onUnarchiveFolder(folder._id)}
        />
      </div>
      <div className='archive-folder-icon archive-folder-button' style={{ right: '12px' }}>
        <img src={deleteIcon} alt='Delete folder' onClick={() => setShowDeleteConfirmation(true)} />
      </div>

      {showEmojiPicker && (
        <>
          <Backdrop onClick={() => setShowEmojiPicker(false)} />
          <div className='emoji-picker-container'>
            <Picker
              set='twitter'
              previewPosition='none'
              navPosition='none'
              onEmojiSelect={(emoji: any) => addEmoji(emoji)}
            />
          </div>
        </>
      )}

      {showDeleteConfirmation && (
        <Confirm
          title='Do you really want to delete this folder?'
          onConfirm={() => onDeleteFolder(folder) && setShowDeleteConfirmation(false)}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};
export default ArchiveFolder;

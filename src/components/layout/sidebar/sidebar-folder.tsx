import './sidebar-folder.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Type from '../../../types';
import Picker from '@emoji-mart/react';
import placeholderFolder from '../../../images/placeholder-folder.svg';
import folderSettingsIcon from '../../../images/icons/folder-settings-icon.svg';
import Backdrop from '../../backdrops/backdrop/backdrop';
import FolderSettings from '../../../pages/home-stuff/folder-stuff/settings-folder/folder-settings';
import FolderForm from '../../../pages/home-stuff/folder-stuff/form-folder/folder-form';
import Confirm from '../../confirm/confirm';

const SidebarFolder = ({
  folder,
  onChangeFolderIcon,
  onEditFolder,
  onDeleteFolder,
  onArchiveFolder,
  onUnfavoriteFolder,
}: {
  folder: Type.Folder;
  onChangeFolderIcon: (arg0: string, arg1: string) => void;
  onEditFolder: (arg0: string, arg1: string) => void;
  onDeleteFolder: (arg0: Type.Folder) => Promise<void>;
  onArchiveFolder: (arg0: string) => void;
  onUnfavoriteFolder: (arg0: string) => void;
}) => {
  const [showFolderSettings, setShowFolderSettings] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const addEmoji = (emoji: any) => {
    onChangeFolderIcon(folder._id, emoji.unified);
    setShowEmojiPicker(false);
  };
  return (
    <div className='sidebar-folder'>
      <div className='sidebar-folder-icon'>
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
        className='sidebar-folder-link'
        to='/topic'
        onClick={() => {
          localStorage.setItem('folderID', folder._id);
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
      <div className='sidebar-folder-icon sidebar-folder-settings'>
        <img
          src={folderSettingsIcon}
          alt='Folder settings'
          onClick={() => setShowFolderSettings(true)}
        />
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

      {showFolderSettings && (
        <div className='sidebar-folder-settings-modal'>
          <Backdrop onClick={() => setShowFolderSettings(false)} />
          <FolderSettings
            folder={folder}
            editFolderReq={() => {
              setShowEditFolder(true);
              setShowFolderSettings(false);
            }}
            deleteFolderReq={() => {
              setShowDeleteConfirmation(true);
              setShowFolderSettings(false);
            }}
            onArchive={(id: string) => onArchiveFolder(id)}
            onChangeIcon={(emoji: any) => addEmoji(emoji)}
            onUnfavoriteFolder={(id: string) => onUnfavoriteFolder(id)}
          />
        </div>
      )}

      {showEditFolder && (
        <FolderForm
          type='Edit'
          folder={folder}
          onCancel={() => setShowEditFolder(false)}
          onConfirm={(title: string) => {
            onEditFolder(folder._id, title);
            setShowFolderSettings(false);
            setShowEditFolder(false);
          }}
        />
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
export default SidebarFolder;

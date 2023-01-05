import React from 'react';
import edit from '../../../../images/edit.svg';
import archive from '../../../../images/icons/archive-icon.svg';
import deleteIcon from '../../../../images/delete.svg';
import './folder-settings.css';

function SettingsFolder({
    folder,
    editFolderReq,
    deleteFolderReq,
    onArchive,
    onDearchive
}) {

    return (
        <div className='folder-settings-overlay'>
            <div className='folder-settings-sub'>
                <p onClick={editFolderReq}>
                    <img
                        style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                        src={edit}
                        alt=''
                    />
          Rename
                </p>
                {!folder.archived && (
                    <p onClick={() => onArchive(folder.id)}>
                        <img
                            style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                            src={archive}
                            alt=''
                        />
            Archive
                    </p>
                )}
                {folder.archived && (
                    <p onClick={() => onDearchive(folder.id)}>
                        <img
                            style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                            src={archive}
                            alt=''
                        />
            De-archive
                    </p>
                )}
                <p onClick={deleteFolderReq} style={{ color: 'var(--current-red)', filter: 'none' }}>
                    <img
                        style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                        src={deleteIcon}
                        alt=''
                    />
          Delete
                </p>
            </div>
        </div>
    );
}
export default SettingsFolder;
import edit from '../../../../images/edit.svg';
import archive from '../../../../images/icons/archive-icon.svg';
import deleteIcon from '../../../../images/delete-red.svg';
import clearIcon from '../../../../images/clear-icon.svg';
import starIcon from '../../../../images/icons/star-icon.svg';
import starIconFilled from '../../../../images/icons/star-icon-filled.svg';
import './folder-settings.css';

function SettingsFolder({
    folder,
    editFolderReq,
    deleteFolderReq,
    onArchive,
    onChangeIcon,
    onFavoriteFolder,
    onUnfavoriteFolder,
}: {
    folder: any,
    editFolderReq: any,
    deleteFolderReq: any,
    onArchive: any,
    onChangeIcon: any,
    onFavoriteFolder: any,
    onUnfavoriteFolder: any,
}) {

    return (
        <div className='folder-settings-overlay'>
            <div className='folder-settings-sub'>
            {!folder.favorite? <p onClick={() => onFavoriteFolder(folder._id)}>
                    <img
                        style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                        src={starIcon}
                        alt=''
                    />
          Favorite
                </p> : <p onClick={() => onUnfavoriteFolder(folder._id)}>
                    <img
                        style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                        src={starIconFilled}
                        alt=''
                    />
          Unfavorite
                </p>}
                <p onClick={editFolderReq}>
                    <img
                        style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                        src={edit}
                        alt=''
                    />
          Rename
                </p>
                {!folder.archived && (
                    <p onClick={() => onArchive(folder._id)}>
                        <img
                            style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                            src={archive}
                            alt=''
                        />
            Archive
                    </p>
                )}
                <p onClick={onChangeIcon}>
                    <img
                        style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                        src={clearIcon}
                        alt=''
                    />
          Remove Icon
                </p>
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
import './share-folder.css';
import linkImage from '../../../../images/link.svg';

const ShareFolderPopUp = () => {

    const handleCopyLink = () => {
        const linkInput = document.querySelector<HTMLInputElement>('.link-input');
        linkInput.select();
        document.execCommand('copy');
        linkInput.setSelectionRange(0, linkInput.value.length);
        linkInput.blur();
        linkInput.classList.add('highlight');
        setTimeout(() => {
            linkInput.classList.remove('highlight');
        }, 1000);
    };



    return (
        <>
            <div className='share-box'>
                <div className='share-folder-header'>
                    <h2>Share Folder</h2>
                </div>
                <div className='share-seperator' />
                <p className='copy-link-text'>copy link</p>
                <div className="link-field">
                    <img className='link-image' src={linkImage}></img>
                    <input className='link-input' type='text' value='https://www.google.com' readOnly />
                    <button onClick={handleCopyLink} className='copy-button'>Copy</button>
                </div>
            </div>
        </>
    );
};

export default ShareFolderPopUp;


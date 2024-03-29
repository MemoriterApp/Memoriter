import { FormEvent, useState } from 'react';
import './folder-form.css';
import Backdrop from '../../../../components/backdrops/backdrop/backdrop';

const FolderForm = ({ type, folder, onConfirm, onCancel }: { type: any, folder: any, onConfirm: any, onCancel: any, }) => {

    // name of the folder
    const [title, setTitle] = useState<string>(folder.title);

    // function to apply the input value as folder name
    const onSubmitFolder = (event: FormEvent) => {
        event.preventDefault();
        onConfirm(title);
    };


    return (
        <>
            <form className='folder-form' onSubmit={onSubmitFolder}>
                <h2 className='folder-form-title'>{type} folder</h2>
                <label className='folder-form-input-label' htmlFor='folder-form-input'>
                    Folder name:
                </label>
                <input
                    className='folder-form-input'
                    id='folder-form-input'
                    value={title}
                    placeholder='New folder'
                    autoFocus
                    autoComplete='off'
                    maxLength={100}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <button className='folder-form-button' type='submit'>
                    Done
                </button>
            </form>
            <Backdrop onClick={onCancel} />
        </>
    );
};
export default FolderForm;
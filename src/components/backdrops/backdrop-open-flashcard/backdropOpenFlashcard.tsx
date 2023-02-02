import './backdrop-open-flashcard.css';


function BackdropOpenFlashcardSO({ onClick }: { onClick: VoidFunction }) {
    return (
        <div className='backdrop-open-flashcard' onClick={onClick} >
        </div>
    );
}

export default BackdropOpenFlashcardSO;
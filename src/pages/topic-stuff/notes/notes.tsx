import './notes.css'
function Notes() {
    //all of the cool frontend code goes here
  return (
    <>
    <div className="note-page">
        <h1 className='note-header'>Note Page</h1>
        <textarea className='note-textarea' placeholder='Write your notes here...'></textarea>
    </div>
    </>
  );
}

export default Notes;
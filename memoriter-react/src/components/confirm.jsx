import '../css/confirm.css';

// This modal is used to confirm something (most likely deleting) with either a yes or no botton.

const Confirm = ({ title, onYesClick, onNoClick}) => {
  return (
    <div className='confirm'>

      <p className='confirm-title'>{title}</p>
        
      {/* confirm and cancel buttons */}
      <div className='confirm-buttons'>
        <button
          className='confirm-button confirm-button-yes'
          onClick={() => onYesClick()}
        >Yes</button>
          
        <button
          className='confirm-button confirm-button-no'
          onClick={() => onNoClick()}
        >No</button>
      </div>
    </div>
  );
}

export default Confirm;
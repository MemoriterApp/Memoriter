import '../styles/confirm.css';
import Backdrop from './backdrop';

//This modal is used to confirm something (most likely deleting) with either a yes or no botton.

const Confirm = ({ title, onConfirm, onCancel }) => {
  return (
    <>
      <div className='confirm'>

        <p className='confirm-title'>{title}</p>
          
        {/* confirm and cancel buttons */}
        <div className='confirm-buttons'>
          <button
            className='confirm-button confirm-button-yes'
            onClick={() => onConfirm()}
          >Yes</button>
            
          <button
            className='confirm-button confirm-button-no'
            onClick={() => onCancel()}
          >No</button>
        </div>
      </div>
      <Backdrop onClick={() => onCancel()}/>
    </>
  );
};
export default Confirm;
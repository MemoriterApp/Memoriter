import { useNavigate, } from 'react-router-dom';

function ChooseMode() {

    const navigate = useNavigate();
    
    return (
        <div className='study-now' onClick={() => navigate('/study')}>
                    <p className='study-now-text'>study now</p>
                </div>
    )
}
export default ChooseMode;
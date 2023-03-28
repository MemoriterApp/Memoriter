import { useState, useEffect } from 'react';
import BackdropTransparent from '../../backdrops/backdrop-transparent/backdrop-transparent';
import FooterPage from '../footer-page/footer-page';
import './footer-button.css';

const FooterButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
        <button
            className='footer-button'
            title='Footer Button'
            onClick={() => setModalIsOpen(true)}
        >
            ?
        </button>

        <div>
            {modalIsOpen && (
                <>
                    <FooterPage />
                    <BackdropTransparent onClick={() => setModalIsOpen(false)} />
                </>
            )}
        </div>
        </>
    );
};
export default FooterButton;
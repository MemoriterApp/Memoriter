import '../../styles/download/download-main.css';
import DownloadDesktop from './download-desktop';
import DownloadMobile from './download-mobile';

const DownloadMain = () => {
    return (
        <div className='download-main'>

            <h1 className='download-main-heading'>Download Memoriter</h1>

            <p className='download-main-description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, eligendi vero?
            </p>

            <DownloadDesktop/>

            <DownloadMobile/>

        </div>
    );
}

export default DownloadMain;
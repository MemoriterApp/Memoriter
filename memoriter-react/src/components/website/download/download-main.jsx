import DownloadDesktop from './download-desktop';
import DownloadMobile from './download-mobile';

const DownloadMain = () => {
    return (
        <div className='download-main'>

            <h1 className='download-main-heading'>Download Memoriter</h1>

            <DownloadDesktop/>

            <div className='download-main-gap'/>

            <DownloadMobile/>

        </div>
    );
}

export default DownloadMain;
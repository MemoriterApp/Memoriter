import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';
import DownloadBanner from '../../components/website/download/download-banner';
import DownloadMain from '../../components/website/download/download-main';

const Download = () => {
    return (
        <WebsiteWrapper
            title='Download'
            description='Prefer a desktop or mobile application? Download the corresponding apps now!'
            currentPage='download'
        >
            {/*banner with download buttons*/}
            <DownloadBanner/>

            {/*main part*/}
            <DownloadMain/>

        </WebsiteWrapper>
    );
}

export default Download;
import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';
import DownloadMain from '../../components/website/download/download-main';

const Download = () => {
    return (
        <WebsiteWrapper
            title='Download'
            description='Prefer a desktop or mobile application? Download the corresponding apps now!'
            currentPage='download'
        >

            {/*main part*/}
            <DownloadMain/>

        </WebsiteWrapper>
    );
}

export default Download;
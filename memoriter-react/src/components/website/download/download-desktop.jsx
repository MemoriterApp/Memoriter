import notebook from '../../../images/website/download/notebook.png';
import notebookContent from '../../../images/website/download/notebook-content.jpeg';

const DownloadDesktop = () => {

    return (
        <section className='download-desktop' >

            {/*content text*/}
            <div className='download-desktop-content-text'>

                <h2 className='download-desktop-heading'>Desktop App</h2>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, eligendi vero?</p>

            </div>

            {/*notebook image with content*/}
            <div className='download-desktop-notebook-image'>
                <img className='download-desktop-notebook-image-outside' src={notebook} alt='notebook'/>
                <img className='download-desktop-notebook-image-content' src={notebookContent} alt='notebook-content'/>
            </div>

        </section>
    );
}

export default DownloadDesktop;